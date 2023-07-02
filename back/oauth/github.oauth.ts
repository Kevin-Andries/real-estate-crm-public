import axios from "axios";
import { IUserData } from "../utils/interfaces";
import printRed from "../utils/print";

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

/**
 * Helper function to get the oAuth url from GitHub.
 * @returns the url to which redirect the client
 */
export function getGithubAuthUrl() {
	return `https://github.com/login/oauth/authorize?client_id=${clientId}`;
}

/**
 * Function that takes the oAuth code from GitHub as a parameter, requests a token and then the userData.
 * @param code string from GitHub authorization server that is necessary to request the token
 * @returns the GitHub userId
 */
export async function getGithubUserData(code: string) {
	const body = {
		client_id: clientId,
		client_secret: clientSecret,
		code,
	};

	const res = await axios.post(
		`https://github.com/login/oauth/access_token`,
		body,
		{
			headers: { accept: "application/json" },
		}
	);

	const githubToken = res.data.access_token;

	const userData: any = (
		await axios.get("https://api.github.com/user", {
			headers: { Authorization: `Bearer ${githubToken}` },
		})
	).data;

	return {
		oAuthUserId: userData.id,
	};
}
