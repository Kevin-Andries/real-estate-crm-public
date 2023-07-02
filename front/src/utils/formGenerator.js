export const addNewEstateFormGenerator = (values, images) => {
	let form = new FormData();

	if (values.isOnline === "") values.isOnline = false;
	if (values.isPublic === "") values.isPublic = false;

	form.append("estateName", values.estateName);
	form.append("country", values.country);
	form.append("city", values.city);
	form.append("street", values.street);
	form.append("streetNumber", values.streetNumber);
	form.append("postcode", values.postcode);
	form.append("floorNumber", values.floorNumber);
	form.append("apartNumber", +values.apartNumber);
	form.append("squareMeters", values.squareMeters);
	form.append("price", +values.price);
	form.append("rooms", +values.rooms);
	form.append("bedrooms", +values.bedrooms);
	form.append("bathrooms", +values.bathrooms);
	form.append("rentOrSell", values.rentOrSell);
	form.append("isOnline", values.isOnline);
	form.append("isPublic", values.isPublic);
	form.append("description", values.description);

	images.forEach((image, index) => {
		form.append(`picture${index}`, image);
	});

	return form;
};

export const generateNewUserRegistrationForm = (values) => {
	let form = new FormData();

	form.append("email", values.email);
	form.append("password", values.password);
	form.append("firstname", values.firstname);
	form.append("lastname", values.lastname);

	return form;
};

export const generateEmailLoginForm = (values) => {
	let form = new FormData();

	form.append("email", values.email);
	form.append("password", values.password);

	return form;
};

export const updateEstateFormGenerator = (values) => {
	let form = new FormData();

	if (values.isOnline === "") values.isOnline = false;
	if (values.isPublic === "") values.isPublic = false;

	form.append("estateName", values.estateName);
	form.append("country", values.country);
	form.append("city", values.city);
	form.append("street", values.street);
	form.append("streetNumber", values.streetNumber);
	form.append("postcode", values.postcode);
	form.append("floorNumber", values.floorNumber);
	form.append("apartNumber", +values.apartNumber);
	form.append("squareMeters", values.squareMeters);
	form.append("price", +values.price);
	form.append("rooms", +values.rooms);
	form.append("bedrooms", +values.bedrooms);
	form.append("bathrooms", +values.bathrooms);
	form.append("rentOrSell", values.rentOrSell);
	form.append("isOnline", values.isOnline);
	form.append("isPublic", values.isPublic);
	form.append("description", values.description);
	form.append("estate_id", values.estate_id);

	return form;
};
