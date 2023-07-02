import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// components
import ErrorMessage from "../components/StatesComponents/errorMessage";

// Helper

// Context provider for global state
import { useContext } from "react";
import { ContextState } from "../../state/Provider";

// router object
import { useHistory } from "react-router-dom";

// Styles
import "./styles/loader.css";

// config
import { API_ROOT } from "../../config/api-config";

const ContactForm = () => {
	const { state } = useContext<any>(ContextState);
	const [error, setError] = useState<boolean>(false);
	const [errorMessage] = useState<any>(
		"An error has occurred when we were signing you up. Please reload the page an retry."
	);

	let history = useHistory();

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Email not valid")
			.required("Email is required"),
		firstName: Yup.string()
			.required("A first name is required")
			.min(2)
			.max(45),
		lastName: Yup.string()
			.required("A last name is required")
			.min(2)
			.max(45),
		message: Yup.string()
			.required("A message is required")
			.min(50)
			.max(2000),
	});

	const GOOGLE_RECAPTCHA_SITE_KEY =
		"6LdABHEfAAAAAJRkbie--bL8Yna1yevqEInnyMGf";
	const GOOGLE_RECAPTCHA_SECRET_KEY =
		"6LdABHEfAAAAAOCwzPxBwIyljgxO3UaDcuteUnXz";

	const {
		handleSubmit,
		handleChange,
		values,
		errors,
		touched,
		isSubmitting,
	} = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			message: "",
			email: "",
		},
		validationSchema,
		onSubmit: async (values: any) => {
			console.log(values);

			try {
				// 1- Get the recaptcha token
				const token = await grecaptcha
					.execute(GOOGLE_RECAPTCHA_SITE_KEY, {
						action: "submitContactForm",
					})
					.then(function (token: any) {
						return token;
					});

				// 2- Check if the token is valid by calling the backend
				const response = await fetch(
					`${API_ROOT}/user/verifyRecaptchaToken`,
					{
						body: JSON.stringify({
							token,
						}),
						headers: {
							"Content-Type": "application/json",
						},
						method: "POST",
					}
				);

				const result = await response.json();

				console.log("result", result);

				if (result.error) {
					throw new Error(
						"There has been an issue while sending your message. Please reload the page and retry."
					);
				}

				// 3- If the token is valid, we send an email to the website owner
			} catch (error) {
				return;
			}
		},
	});

	useEffect(() => {
		// Triggered every time the 'state' object is modified.
		// If the value are not empty, that means the user is logged in.
		if (state.isLoggedIn && state.userDetails.fullname) {
			// Takes the user to his private dashboard
			history.push("/dashboard");
		}
	}, [state, history]);

	return (
		<React.Fragment>
			<div
				className="flex
			w-full
			max-w-screen-lg
			rounded-lg
			filter
			my-4
			mx-auto
			md:my-12
			px-4"
			>
				<form onSubmit={handleSubmit} className="formContainer">
					<h1 className="mb-6 text-left font-extrabold text-3xl">
						Contact us
					</h1>

					<div className="form-group flex flex-col mb-4 relative">
						<label
							htmlFor="firstName"
							className="block text-sm font-bold mb-1 text-left"
						>
							First name
						</label>
						<input
							type="text"
							name="firstName"
							className="inputField"
							onChange={handleChange}
							value={values.firstName}
							placeholder="John"
						/>
						{touched.firstName && errors.firstName && (
							<span className="help-block text-red-600 text-left">
								{errors.firstName}
							</span>
						)}
					</div>
					<div className="form-group flex flex-col mb-4 relative">
						<label
							htmlFor="lastName"
							className="block text-sm font-bold mb-1 text-left"
						>
							Last name
						</label>
						<input
							type="text"
							name="lastName"
							value={values.lastName}
							onChange={handleChange}
							className="inputField"
							placeholder="Doe"
						/>
						{touched.lastName && errors.lastName && (
							<span className="help-block text-red-600 text-left">
								{errors.lastName}
							</span>
						)}
					</div>

					<div className="form-group flex flex-col mb-4 relative">
						<label
							htmlFor="email"
							className="block text-sm font-bold mb-1 text-left"
						>
							Email
						</label>
						<input
							type="email"
							name="email"
							className="inputField"
							onChange={handleChange}
							value={values.email}
							placeholder="johndoe@gmail.com"
						/>
						{touched.email && errors.email && (
							<span className="help-block text-red-600 text-left">
								{errors.email}
							</span>
						)}
					</div>
					<div className="form-group flex flex-col mb-4 relative">
						<label
							htmlFor="message"
							className="block text-sm font-bold mb-1 text-left"
						>
							Your enquiry
						</label>
						<textarea
							name="message"
							value={values.message}
							onChange={handleChange}
							className="inputField"
							placeholder="..."
							style={{ minHeight: "130px" }}
						/>
						{touched.message && errors.message && (
							<span className="help-block text-red-600 text-left">
								{errors.message}
							</span>
						)}
					</div>

					<div className="mt-4 text-left">
						<button type="submit" className="btn">
							{isSubmitting ? (
								<>
									<div className="lds-ring-2">
										<div></div>
										<div></div>
										<div></div>
										<div></div>
									</div>
									<p className="ml-3">Sending enquiry</p>
								</>
							) : (
								"Send enquiry"
							)}
						</button>
					</div>

					{error && (
						<ErrorMessage
							errorMessage={errorMessage}
							closeModal={setError}
						/>
					)}
				</form>
			</div>
		</React.Fragment>
	);
};

export default ContactForm;
