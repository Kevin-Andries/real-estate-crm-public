import { number } from "joi";

export interface IUserData {
	userId: string;
	email: string;
	oAuthUserId?: string;
	firstname: string;
	lastname: string;
	username: string;
}

export interface IEstate {
	estateId?: string;
	ownerId: Number;
	isPublic: boolean;
	isOnline: boolean;
	rentOrSell: string;
	price: number;
	rooms: number;
	bedrooms: number;
	bathrooms: number;
	estateName: string;
	country: string;
	city: string;
	street: string;
	streetNumber: string;
	postcode: string;
	floorNumber: string;
	apartNumber: string;
	squareMeters: number;
	description: string;
}

export interface IEstatePictures {
	pictures: any[];
}

export interface IRegisterForm {
	fields: object;
}

export interface ILoginForm {
	email: string;
	password: string;
}

export interface UpdateEstate {
	estate_id: number;
	isPublic: boolean;
	isOnline: boolean;
	rentOrSell: string;
	price: number;
	rooms: number;
	bedrooms: number;
	bathrooms: number;
	estateName: string;
	country: string;
	city: string;
	street: string;
	streetNumber: string;
	postcode: string;
	floorNumber: string;
	apartNumber: string;
	squareMeters: number;
	description: string;}
