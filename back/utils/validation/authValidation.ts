import { IRegisterForm, ILoginForm } from "../interfaces";

// TODO: write validation function for register form
export function isRegisterFormValid(form: any) {
	const email = form.email;
	const password = form.password;
	const firstname = form.firstname;
	const lastname = form.lastname;

	const validateEmail = (email: string) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const isValidName = (name: string) => {
		if (typeof name !== "string" || /[0-9]+/g.test(name)) {
			return false;
		}
		return true;
	};

	if (!validateEmail(email)) return false;
	if (!isValidName(firstname)) return false;
	if (!isValidName(lastname)) return false;
	if (password.length < 6) return false;

	return true;
}

export function areLoginDetailsValid(form: any) {
	const email = form.email;
	const password = form.password;

	const validateEmail = (email: string) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	if (!validateEmail(email)) return false;
	if (password.length < 6) return false;

	return true;
}
