// This file is used to populate the dev database with mock data
// We can generate as many users and estates as we want and insert them into the database

const { faker } = require("@faker-js/faker");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../config.env` });
const pg = require("pg");
const { argv } = require("process");

// Change this variable depending on local/hosted db
const localDB = true;

// Database
const Pool = localDB
	? new pg.Pool()
	: new pg.Pool({ ssl: { rejectUnauthorized: false } });

function choose(a, b) {
	return Math.floor(Math.random() * 2 + 1) === 1 ? a : b;
}

function generateNumberBetween(a, b) {
	return Math.floor(Math.random() * b + a);
}

// Mock data functions
function generateEstate(nbUsersInDB) {
	const rentOrSell = choose("rent", "sell");
	const rooms = generateNumberBetween(5, 15);
	const availableRooms = rooms - 3;
	const bedrooms = Math.ceil(0.7 * availableRooms);
	const bathrooms = availableRooms - bedrooms;
	const floorNumber = choose(0, 1) ? generateNumberBetween(1, 50) : null;
	const apartNumber = floorNumber ? generateNumberBetween(1, 400) : null;
	const pictures = [];
	const nbPictures = generateNumberBetween(1, 15);

	for (let i = 0; i < nbPictures; i++) {
		pictures.push("M00ZQ39ADZO6R7MS2F0D");
	}

	return {
		ownerId: generateNumberBetween(1, nbUsersInDB),
		estateName: faker.company.companyName(),
		isPublic: true,
		isOnline: true,
		rentOrSell,
		price:
			rentOrSell === "rent"
				? faker.commerce.price(500, 10000)
				: faker.commerce.price(50000, 50000000),
		rooms,
		bedrooms,
		bathrooms,
		description: faker.lorem.paragraph(10),
		squareMeters: faker.commerce.price(40, 500),
		country: faker.address.countryCode(),
		city: faker.address.cityName(),
		street: faker.address.streetName(),
		streetNumber: generateNumberBetween(1, 10000),
		postcode: faker.address.zipCode(),
		floorNumber,
		apartNumber,
		pictures,
	};
}

function generateUser() {
	return {
		email: faker.internet.email(),
		firstname: faker.name.firstName(),
		lastname: faker.name.lastName(),
		username: "",
		pwd: faker.internet.password(),
	};
}

async function generateMultipleEstates(nb) {
	const estates = [];
	const nbUsersInDB = parseInt(
		(await Pool.query("SELECT COUNT(*) FROM usr")).rows[0].count
	);

	for (let i = 0; i < nb; i++) {
		estates.push(generateEstate(nbUsersInDB));
	}

	return estates;
}

function generateMultipleUsers(nb) {
	const users = [];

	for (let i = 0; i < nb; i++) {
		users.push(generateUser());
	}

	return users;
}

(async () => {
	const insertUsers = argv.includes("users");
	const insertEstates = argv.includes("estates");

	if (argv.length === 2 || (!insertUsers && !insertEstates)) {
		return console.log("ERROR: No or wrong arguments");
	}

	const nbUsers = parseInt(argv[argv.indexOf("users") + 1]);
	const nbEstates = parseInt(argv[argv.indexOf("estates") + 1]);

	if (insertUsers && isNaN(nbUsers)) {
		return console.log("ERROR: number should be provided for users");
	}

	if (insertEstates && isNaN(nbEstates)) {
		return console.log("ERROR: number should be provided for estates");
	}

	if (nbUsers) {
		console.log(`Creating ${nbUsers} users`);
		const promises = [];

		const users = generateMultipleUsers(nbUsers);
		// Insert users
		for (let i = 0; i < nbUsers; i++) {
			const user = users[i];
			promises.push(
				Pool.query(
					"INSERT INTO usr(email, firstname, lastname, username, pwd) VALUES($1, $2, $3, $4, $5)",
					[
						user.email,
						user.firstname,
						user.lastname,
						user.username,
						user.pwd,
					]
				)
			);
		}

		await Promise.all(promises);
	}

	if (nbEstates) {
		console.log(`Creating ${nbEstates} estates`);
		const promises = [];

		const estates = await generateMultipleEstates(nbEstates);

		// Insert users
		for (let i = 0; i < nbEstates; i++) {
			const estate = estates[i];
			promises.push(
				new Promise((resolve) => {
					Pool.query(
						"INSERT INTO estate VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING estate_id",
						[
							estate.ownerId,
							estate.estateName,
							estate.isPublic,
							estate.isOnline,
							estate.rentOrSell,
							estate.price,
							estate.rooms,
							estate.bedrooms,
							estate.bathrooms,
							estate.description,
							estate.squareMeters,
							estate.country,
							estate.city,
							estate.street,
							estate.streetNumber,
							estate.postcode,
							estate.floorNumber,
							estate.apartNumber,
						],
						async (_, res) => {
							const picturesPromises = [];

							estate.pictures.forEach((picture) => {
								picturesPromises.push(
									Pool.query(
										"INSERT INTO estate_picture VALUES(DEFAULT, $1, $2)",
										[res.rows[0].estate_id, picture]
									)
								);
							});

							await Promise.all(picturesPromises);
							resolve();
						}
					);
				})
			);
		}

		await Promise.all(promises);
	}

	console.log("---data inserted---");
	process.exit(1);
})();
