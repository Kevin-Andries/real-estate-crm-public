import { createClient } from "redis";
import { IEstate } from "../utils/interfaces";
import printRed from "../utils/print";

// TODO: see if transaction everywhere is better

const redis = createClient({
	url:
		process.env.DB_TYPE === "local"
			? "redis://redis"
			: process.env.REDIS_URI,
	socket: {
		tls: process.env.DB_TYPE !== "local",
	},
});

redis
	.connect()
	.then(() => console.log("Connected to cache"))
	.catch((err) => {
		printRed("Error connecting to cache. ENDING PROGRAM");
		console.log(err);
		process.exit(1);
	});

export async function isCacheInitialized() {
	// !! for dev purposes only
	//await redis.flushAll();
	// !!
	return await redis.get("isInitialized");
}

export async function initializeCache(data: any[]) {
	data.forEach(async (row: any, i) => {
		const { type } = row;
		delete row.type;
		const keys = Object.keys(row);

		if (type === "user") {
			keys.forEach((key) => {
				redis.hSet(`user/${row.user_id}`, key, row[key]);
			});
		} else if (type === "estate") {
			keys.forEach((key) => {
				redis.hSet(`estate/${row.estate_id}`, key, row[key]);
			});
		} else if (type === "estatePicture") {
			redis.hSet(
				`estate/${row.estate_id}`,
				`picture/${row.picture_id}`,
				row.id_on_disk
			);
		}
	});

	await redis.set("isInitialized", "true");
}

// Get methods
export async function getEstateFromCache(estateId: string) {
	let estate: any = await redis.hGetAll(`estate/${estateId}`);
	estate = JSON.parse(JSON.stringify(estate));
	const keys = Object.keys(estate);

	// if estate does not exist
	if (keys.length === 0) {
		return null;
	}

	// create array of pictures
	estate.pictures = [];
	keys.forEach((key) => {
		if (key.startsWith("picture/")) {
			estate.pictures.push({
				picture_id: key.split("/")[1],
				estate_id: estateId,
			});
			delete estate[key];
		}
	});

	// increment views count in cache
	redis.hIncrBy(`estate/${estateId}`, "views_count", 1);

	return estate;
}

export async function getUserFromCache(userId: string) {
	const user = await redis.hGetAll(`user/${userId}`);
	return user;
}

export async function getPictureEstateFromCache(
	estateId: string,
	pictureId: string
) {
	return await redis.hmGet(`estate/${estateId}`, [
		`is_public`,
		`is_online`,
		`picture/${pictureId}`,
	]);
}

// Set methods
export async function setEstateInCache(estate: any, estateId: string) {
	const keys = Object.keys(estate);
	const redisKey = `estate/${estateId}`;

	redis.hSet(redisKey, "estate_id", estateId);

	estate.pictures.forEach((picture: any) => {
		redis.hSet(redisKey, `picture/${picture.pictureId}`, picture.idOnDisk);
	});

	delete estate.pictures;

	keys.forEach((key) => {
		redis.hSet(redisKey, key, estate[key]);
	});
}

export async function setUserInCache(user: any) {
	const keys = Object.keys(user);
	const redisKey = `user/${user.user_id}`;

	redis.hSet(redisKey, "user_id", user.user_id);

	keys.forEach((key) => {
		redis.hSet(`user/${user.user_id}`, key, user[key]);
	});
}
