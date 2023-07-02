import { OAuth2Client } from "google-auth-library";
import { IUserData } from "../utils/interfaces";
import printRed from "../utils/print";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirect = "http://localhost:8000/auth/login/google-callback";
const scope = ["https://www.googleapis.com/auth/userinfo.profile"];
const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirect);

/**
 * Helper function to get the oAuth url from Google
 * @returns the url to which redirect the client
 */
export function getGoogleAuthUrl() {
	const url = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		prompt: "consent",
		scope,
	});
	return url;
}

/**
 * Function that takes the oAuth code from Google as a parameter, requests a token and then the userData.
 * @param code string from GitHub authorization server that is necessary to request the token
 * @returns the Google userId
 */
export async function getGoogleUserData(code: string) {
	const credentials = await oAuth2Client.getToken(code);
	oAuth2Client.setCredentials(credentials.tokens);

	const url =
		"https://people.googleapis.com/v1/people/me?personFields=metadata,names";
	const res: any = await oAuth2Client.request({ url });

	return {
		firstname: res.data.names[0].givenName,
		lastname: res.data.names[0].familyName,
		oAuthUserId: res.data.metadata.sources[0].id,
	};
}
