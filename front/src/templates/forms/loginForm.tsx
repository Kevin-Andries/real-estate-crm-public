import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// components
import GoogleAndGithubLogin from "../components/auth/GoogleAndGithubLogin";
import ErrorMessage from "../components/StatesComponents/errorMessage";

// Helper
import { generateEmailLoginForm } from "../../utils/formGenerator";

// Context provider for global state
import { useContext } from "react";
import { ContextState } from "../../state/Provider";
import { emailLogin } from "../../state/actions";

// router object
import { useHistory } from "react-router-dom";

// Styles
import "./styles/loader.css";

// api config
import { API_ROOT } from "../../config/api-config";

const LoginForm = () => {
	const { state, dispatch } = useContext<any>(ContextState);
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<any>(
		"An error has occurred when we were signing you up. Please reload the page an retry."
	);

	let history = useHistory();

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Email not valid")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
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
			email: "",
			password: "",
		},
		validationSchema,
		onSubmit: async (values: any) => {
			let form = generateEmailLoginForm(values);

			try {
				let response = await fetch(`${API_ROOT}/auth/login`, {
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
				await dispatch(emailLogin(result.data));
			} catch (error: any) {
				setError(true);
				setErrorMessage(error);
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
			px-4"
			>
				<form onSubmit={handleSubmit} className="formContainer">
					<h1 className="mb-6 text-left font-extrabold text-3xl">
						Sign in
					</h1>

					<GoogleAndGithubLogin />

					<div className="form-group flex flex-col mb-4 relative">
						<label
							htmlFor="email"
							className="block text-sm font-bold mb-1 text-left"
						>
							Email
						</label>
						<input
							type="text"
							name="email"
							className="inputField"
							onChange={handleChange}
							value={values.email}
							placeholder="Email"
						/>
						{touched.email && errors.email && (
							<span className="help-block text-red-600 text-left">
								{errors.email}
							</span>
						)}
					</div>
					<div className="form-group flex flex-col mb-4 relative">
						<label
							htmlFor="password"
							className="block text-sm font-bold mb-1 text-left"
						>
							Password
						</label>
						<input
							type="password"
							name="password"
							value={values.password}
							onChange={handleChange}
							className="inputField"
							placeholder="Password"
						/>
						{touched.password && errors.password && (
							<span className="help-block text-red-600 text-left">
								{errors.password}
							</span>
						)}
					</div>

					<div className="flex flex-col sm:flex-row justify-between">
						<div className="rememberMeContainer flex items-center">
							<input
								type="checkbox"
								name=""
								id="rememberMe"
								className="mx-1 cursor-pointer"
							/>
							<label htmlFor="rememberMe">Remember me</label>
						</div>
						<div className="forgotPassword">
							<p
								className="
							font-medium
							text-blue-500 text-md
							hover:text-blue-700
							cursor-pointer
							transition
							duration-200
							ease-in-out
							text-left
							sm:text-center
							mx-1
							mt-1
							italic
						"
							>
								Forgot your password?
							</p>
						</div>
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
									<p className="ml-3">Signin you in</p>
								</>
							) : (
								"Sign in"
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

export default LoginForm;
