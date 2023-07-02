import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// components
import GoogleAndGithubRegistration from "../components/auth/GoogleAndGithubRegistration";
import ErrorMessage from "../components/StatesComponents/errorMessage";

// Helper
import { generateNewUserRegistrationForm } from "../../utils/formGenerator";

// Styles
import "./styles/loader.css";

// router object
import { useHistory } from "react-router-dom";

// Context provider for global state
import { useContext } from "react";
import { ContextState } from "../../state/Provider";
import { userRegistration } from "../../state/actions";

// api config
import { API_ROOT } from "../../config/api-config";

const RegistrationForm = () => {
	const { state, dispatch } = useContext<any>(ContextState);
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>(
		"An error has occurred when we were signing you up. Please reload the page an retry."
	);

	let history = useHistory();

	const validationSchema = Yup.object().shape({
		firstname: Yup.string()
			.required("Email is required")
			.min(2, "First name must be at least 2 characters long.")
			.max(30, "First name cannot exceed 30 characters."),
		lastname: Yup.string()
			.required("Password is required")
			.min(2, "Last name must be at least 2 characters long.")
			.max(30, "Last name cannot exceed 30 characters."),
		email: Yup.string().email("Email not valid").required(),
		password: Yup.string()
			.required("Password is required")
			.min(7, "Password must be at least 7 characters long.")
			.max(50, "Password cannot exceed 50 characters."),
		confirmEmail: Yup.string().test(
			"match",
			"emails do not match",
			function (emailConfirmation) {
				return emailConfirmation === this.parent.email;
			}
		),
		confirmPassword: Yup.string().test(
			"match",
			"Passwords do not match",
			function (passwordConfirmation) {
				return passwordConfirmation === this.parent.password;
			}
		),
	});

	const {
		handleSubmit,
		handleChange,
		values,
		errors,
		touched,
		isSubmitting,
	} = useFormik({
		initialValues: {
			firstname: "",
			lastname: "",
			email: "",
			confirmEmail: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema,
		onSubmit: async (values) => {
			let form = generateNewUserRegistrationForm(values);

			try {
				let response = await fetch(`${API_ROOT}/auth/register`, {
					method: "POST",
					credentials: "include",
					body: form,
				});
				let result = await response.json();

				if (!response.ok) {
					if (result.message) {
						throw result.message;
					} else {
						throw new Error(
							"An error has occurred when we were signing you up. Please reload the page an retry."
						);
					}
				}

				setError(false);

				// Updating context
				await dispatch(userRegistration(result.data));
			} catch (error: any) {
				setError(true);
				setErrorMessage(error);
				console.error(error);
			}
		},
	});

	useEffect(() => {
		// Triggered every time the 'state' object is modified.
		// If the value are not empty, that means the user is logged in.
		if (state.isLoggedIn && state.userDetails.firstname) {
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
			px-4
			relative"
			>
				<form onSubmit={handleSubmit} className="formContainer">
					<h1 className="mb-6 text-left font-extrabold text-3xl">
						Create your account
					</h1>

					<GoogleAndGithubRegistration />

					<div className="flex">
						<div className="form-group flex flex-col mb-6 relative mr-2 w-full">
							<label htmlFor="firstname" className="inputLabel">
								First name
							</label>
							<input
								type="text"
								name="firstname"
								className="inputField"
								onChange={handleChange}
								value={values.firstname}
								placeholder="First name"
							/>
							{touched.firstname && errors.firstname && (
								<span className="help-block text-red-600 text-left">
									{errors.firstname}
								</span>
							)}
						</div>
						<div className="form-group flex flex-col mb-6 relative ml-2 w-full">
							<label htmlFor="lastname" className="inputLabel">
								Last name
							</label>
							<input
								type="text"
								name="lastname"
								className="inputField"
								onChange={handleChange}
								value={values.lastname}
								placeholder="Last name"
							/>
							{touched.lastname && errors.lastname && (
								<span className="help-block text-red-600 text-left">
									{errors.lastname}
								</span>
							)}
						</div>
					</div>

					<div className="flex">
						<div className="form-group flex flex-col mb-6 relative mr-2 w-full">
							<label htmlFor="email" className="inputLabel">
								Email
							</label>
							<input
								type="email"
								name="email"
								className="inputField"
								onChange={handleChange}
								value={values.email}
								placeholder="First name"
							/>
							{touched.email && errors.email && (
								<span className="help-block text-red-600 text-left">
									{errors.email}
								</span>
							)}
						</div>
						<div className="form-group flex flex-col mb-6 relative ml-2 w-full">
							<label
								htmlFor="confirmEmail"
								className="inputLabel"
							>
								Repeat email
							</label>
							<input
								type="email"
								name="confirmEmail"
								className="inputField"
								onChange={handleChange}
								value={values.confirmEmail}
								placeholder="Password"
							/>
							{touched.confirmEmail && errors.confirmEmail && (
								<span className="help-block text-red-600 text-left">
									{errors.confirmEmail}
								</span>
							)}
						</div>
					</div>

					<div className="flex">
						<div className="form-group flex flex-col mb-4 relative mr-2 w-full">
							<label htmlFor="password" className="inputLabel">
								Password
							</label>
							<input
								type="password"
								name="password"
								className="inputField"
								onChange={handleChange}
								value={values.password}
								placeholder="First name"
							/>
							{touched.password && errors.password && (
								<span className="help-block text-red-600 text-left">
									{errors.password}
								</span>
							)}
						</div>
						<div className="form-group flex flex-col mb-4 relative ml-2 w-full">
							<label
								htmlFor="confirmPassword"
								className="inputLabel"
							>
								Repeat password
							</label>
							<input
								type="password"
								name="confirmPassword"
								className="inputField"
								onChange={handleChange}
								value={values.confirmPassword}
								placeholder="Password"
							/>
							{touched.confirmPassword &&
								errors.confirmPassword && (
									<span className="help-block text-red-600 text-left">
										{errors.confirmPassword}
									</span>
								)}
						</div>
					</div>

					<div className="text-left">
						<button type="submit" className="btn mt-2">
							{isSubmitting ? (
								<>
									<div className="lds-ring-2">
										<div></div>
										<div></div>
										<div></div>
										<div></div>
									</div>
									<p className="ml-3">
										Creating your account
									</p>
								</>
							) : (
								"Sign up"
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

export default RegistrationForm;
