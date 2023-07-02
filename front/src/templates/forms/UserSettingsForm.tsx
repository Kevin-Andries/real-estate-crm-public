import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const UserSettings = (props: any) => {
	const { touched, errors } = props;

	return (
		<div className="flex flex-col px-6 sm:px-10 mt-6">
			<div>
				<Form
					id="editSettingsForm"
					className="form-container flex flex-col flex-wrap rounded w-full"
				>
					<div className="flex flex-col mb-4 pr-2 w-6/12 relative">
						<label
							htmlFor=""
							className="block text-gray-700 text-sm font-bold mb-2 text-left"
						>
							Name
						</label>
						<Field
							type="text"
							name="firstName"
							className="shadow focus:ring-2 focus:ring-blue-600 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
						{touched.firstName && errors.firstName && (
							<span className="help-block text-red-600 text-left">
								{errors.firstName}
							</span>
						)}{" "}
					</div>
					<div className="flex flex-col mb-4 pr-2 w-6/12 relative">
						<label
							htmlFor=""
							className="block text-gray-700 text-sm font-bold mb-2 text-left"
						>
							Name
						</label>
						<Field
							type="text"
							name="lastName"
							className="shadow focus:ring-2 focus:ring-blue-600 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
						{touched.lastName && errors.lastName && (
							<span className="help-block text-red-600 text-left">
								{errors.lastName}
							</span>
						)}
					</div>
					<div className="flex flex-col mb-4 pr-2 w-6/12 relative">
						<label
							htmlFor=""
							className="block text-gray-700 text-sm font-bold mb-2 text-left"
						>
							Name
						</label>
						<Field
							type="text"
							name="email"
							className="shadow focus:ring-2 focus:ring-blue-600 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
						{touched.email && errors.email && (
							<span className="help-block text-red-600 text-left">
								{errors.email}
							</span>
						)}{" "}
					</div>

					<div className="flex justify-start items-center mt-4">
						<button
							type="submit"
							className="bg-blue-500 hover:bg-darkerBlue50 text-white py-2 px-4 rounded w-50"
						>
							Update details
						</button>
					</div>
				</Form>
			</div>
		</div>
	);
};

const UserSettingsForm = withFormik({
	mapPropsToValues: (props: any) => {
		return {
			firstName: props.firstName || "",
			lastName: props.lastName || "",
			email: props.email || "",
		};
	},
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email("Email not valid")
			.required("Email is required"),
		firstName: Yup.string().min(2).required("A first name is required"),
		lastName: Yup.string().min(2).required("A last name is required"),
	}),
	handleSubmit: (values) => {
		console.log(values);
		alert(values);
	},
})(UserSettings);

export default UserSettingsForm;
