interface QueryObject {
	[key: string]: string
}

interface QueryValues {
	[key: string | number]: string | number
}


export const queryGenerator = (queries: QueryObject) => {
	let query = "";
	let queryFirstElementAdded = false;

	Object.entries(queries).forEach(([key, value]) => {
		// if the value is empty, we do not append a new param to the query
		if(value === '') return 

		// The first element must start with a "?", the next ones with a "&"
		if (queryFirstElementAdded === false) {
			query = query + `?${key}=${value}`;
			queryFirstElementAdded = true
		} else {
			query = query + `&${key}=${value}`;
		}
	});

	if(queryFirstElementAdded) {
		query = query + "&limit=100"
	} else {
		query = query + "?limit=100"
	}

	return query;
};


export const queryValidation = (values: QueryValues) => {
	let price = "";
	let priceMin: string | number = "";
	let priceMax : string | number= "";
	let rooms: string | number = "";
	let squareMeters: string | number = "";
	let estateType: string | number = "";
	let order: string | number = "";
	let city: string | number = "";
	let country: string | number = "";

	Object.entries(values).forEach(([key, value]) => {
		if(key === "priceMin") {
			if(value === "" || value === 0 || value === "0") {
				priceMin = "gte_0"
			} else {
				priceMin = `gte_${value}`
			}
		}

		if(key === "priceMax") {
			if(value === "" || value === 0 || value === "0") {
				return
			} else {
				priceMax = `lte_${value}`
			}
		}

		if(key === "rooms") {
			if(value === "" || value === 0 || value === "0") {
				return
			} else {
				rooms = `${value}`
			}
		}

		if(key === "squareMeters") {
			if(value === "" || value === 0 || value === "0") {
				return
			} else {
				squareMeters = `gt_${value}`
			}
		}

		if(key === "estateType") {
			if(value === "Pick a value") {
				return
			} else {
				estateType = `${value}`
			}
		}

		if(key === "order") {
			if(value === "Order") {
				return
			} else {
				order = `price,${value}`
			}
		}

		if(key === 'city') {
			if(value === "" || value === 0 || value === "0") return

			city = value
		}

		if(key === 'country') {
			if(value === "" || value === 0 || value === "0") return

			country = value
		}
	})

	if(priceMax !== ""){
		price = price + priceMin + ',' + priceMax
	} else {
		price = price + priceMin
	}

	let queryObject = {
		price: price,
		rooms: rooms,
		square_meters: squareMeters,
		rent_or_sell: estateType,
		order: order,
		city: city,
		country: country
	}

	return queryObject;
}