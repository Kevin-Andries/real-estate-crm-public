import IncomingForm from "formidable/Formidable";
import Joi from "joi";

const schema = Joi.object({
	isPublic: Joi.boolean(),
	isOnline: Joi.boolean(),
	rentOrSell: Joi.string(),
	price: Joi.number(),
	rooms: Joi.number(),
	bedrooms: Joi.number(),
	bathrooms: Joi.number(),
	estateName: Joi.string(),
	country: Joi.string(),
	city: Joi.string(),
	street: Joi.string(),
	streetNumber: Joi.string(),
	postcode: Joi.string(),
	floorNumber: Joi.string(),
	apartNumber: Joi.string(),
	squareMeters: Joi.number(),
	description: Joi.string(),
	pictures: Joi.any(),
}).options({ presence: "required" });

export function validateCreateEstateForm(form: IncomingForm) {
	const { error } = schema.validate(form);
	return error;
}
