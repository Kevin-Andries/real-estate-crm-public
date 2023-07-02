import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Component
import ErrorMessage from "../components/StatesComponents/errorMessage";
import Dropzone from "../components/Dropzone/Dropzone";

// Styles
import "./styles/loader.css";

// action and provider
import { updateEstateList } from "../../state/actions";
import { ContextState } from "../../state/Provider";

// Helpers
import { addNewEstateFormGenerator } from "../../utils/formGenerator";

// api config
import { API_ROOT } from "../../config/api-config";
import AllCountries from "../components/select/allCountries";

const AddNewEstateForm = () => {
	const { state, dispatch } = useContext<any>(ContextState);

	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>(
		"An error has occurred when we were signing you up. Please reload the page an retry."
	);
	const [filesUploaded, setFilesUploaded] = useState<any>([]);

	const validationSchema = Yup.object().shape({
		estateName: Yup.string()
			.required("A name for your property is required")
			.min(4, "The property name must be at least 4 characters long.")
			.max(40, "The property name cannot exceed 40 characters."),
		country: Yup.string()
			.required("A country is required")
			.min(2, "The country name must be at least 3 characters long.")
			.max(30, "The country name cannot exceed 30 characters."),
		city: Yup.string().required("A city is required"),
		street: Yup.string()
			.required("A street name/address is required")
			.min(5, "The street name must be at least 5 characters long.")
			.max(30, "The street name cannot exceed 30 characters."),
		streetNumber: Yup.number().required("A street number is required"),
		postcode: Yup.string()
			.required("A postcode is required")
			.min(2, "Postcode must be at least 2 characters long.")
			.max(30, "Postcode cannot exceed 30 characters."),
		floorNumber: Yup.number()
			.required("A floor number is required")
			.min(0, "Cannot be lower than 0.")
			.max(299, "Cannot be higher than 299."),
		apartNumber: Yup.number()
			.required("The apartment number is required")
			.min(0, "Cannot be lower than 0.")
			.max(20000, "Cannot be higher than 20000."),
		squareMeters: Yup.number()
			.required("Please add your property size (square meters)")
			.min(0, "Cannot be lower than 0.")
			.max(20000, "Cannot be higher than 20000."),
		price: Yup.number()
			.required("Adding a price is mandatory")
			.min(0, "Cannot be lower than 0.")
			.max(200000000, "Cannot be higher than 200000000."),
		rooms: Yup.number()
			.required("How many rooms do your property have?")
			.min(0, "Cannot be lower than 0.")
			.max(35, "Cannot be higher than 35."),
		bedrooms: Yup.number()
			.required("Add the number of bedrooms here")
			.min(0, "Cannot be lower than 0.")
			.max(20, "Cannot be higher than 20."),
		bathrooms: Yup.number()
			.required("Add the number of bathrooms here")
			.min(0, "Cannot be lower than 0.")
			.max(20, "Cannot be higher than 20."),
		rentOrSell: Yup.string().required("The field rent or sell is required"),
		description: Yup.string()
			.required("A description is required")
			.min(100, "The description must be at least 100 characters long.")
			.max(2000, "The description cannot exceed 2000 characters."),
	});

	const {
		handleSubmit,
		handleBlur,
		handleChange,
		values,
		errors,
		touched,
		isSubmitting,
		setSubmitting,
		resetForm,
	} = useFormik({
		initialValues: {
			estateName: "",
			country: "DEFAULT",
			city: "",
			street: "",
			streetNumber: "",
			postcode: "",
			floorNumber: "",
			apartNumber: "",
			squareMeters: "",
			price: "",
			rooms: "",
			bedrooms: "",
			bathrooms: "",
			rentOrSell: "DEFAULT",
			isOnline: "",
			isPublic: "",
			description: "",
			pictures: "",
		},
		validationSchema,
		onSubmit: async (values: any) => {
			// Set isSubmitting to true
			setSubmitting(true);

			if (!filesUploaded.length) {
				setError(true);
				setErrorMessage(
					"Please upload at least 3 images of your property in order to complete the property submission."
				);

				// Auto scroll to the error message
				document
					.getElementById("errorMessage")
					?.scrollIntoView({ behavior: "smooth" });

				return;
			}

			let form = addNewEstateFormGenerator(values, filesUploaded);

			try {
				const response = await fetch(`${API_ROOT}/estate`, {
					method: "POST",
					body: form,
					credentials: "include",
				});

				const result = await response.json();

				if ((result.message = "Estate successfully created")) {
					alert("Estate successfully created");
					resetForm();

					// We update the user current estate list if the POST call is a success
					fetch(`${API_ROOT}/estate/me`, {
						method: "GET",
						credentials: "include",
					})
						.then((res) => res.json())
						.then((result) => {
							if (result.length) {
								dispatch(updateEstateList(result));
							}
						});
				}

				setSubmitting(false);
			} catch (error) {
				setSubmitting(false);
				console.error(
					"An error occured while creating the estate",
					error
				);
			}
		},
	});

	return (
		<div
			className="
			w-12/12
			px-6
			sm:px-10
			pl-6
			flex flex-col
			items-start
			bg-white
			py-6
		"
		>
			<form
				onSubmit={handleSubmit}
				id="addEstateForm"
				className="forContainerGrid"
			>
				{/* <!-- Property name --> */}
				<div className="flex flex-col mb-4 col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-2 relative">
					<label className="inputLabel">Property name / Title</label>
					<input
						onChange={handleChange}
						value={values.estateName}
						placeholder="Stunning apartment with ..."
						type="text"
						name="estateName"
						className="inputField"
					/>
					{touched.estateName && errors.estateName && (
						<span className="help-block text-red-600 text-left">
							{errors.estateName}
						</span>
					)}
				</div>

				{/* <!-- Country --> */}
				<div className="flex flex-col mb-4 col-span-1 md:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">Select a country</label>
					<AllCountries
						handleBlur={handleBlur}
						handleChange={handleChange}
						values={values}
					/>
					{touched.country && errors.country && (
						<span className="help-block text-red-600 text-left">
							{errors.country}
						</span>
					)}
				</div>

				{/* <!-- City --> */}
				<div className="flex flex-col mb-4 col-span-1 md:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">City name</label>
					<input
						onChange={handleChange}
						value={values.city}
						placeholder="City"
						type="text"
						name="city"
						className="inputField "
					/>
					{touched.city && errors.city && (
						<span className="help-block text-red-600 text-left">
							{errors.city}
						</span>
					)}
				</div>

				{/* <!-- Street name --> */}
				<div className="flex flex-col mb-4  col-span-1 md:col-span-2 lg:col-span-2  relative">
					<label className="inputLabel">Street name</label>
					<input
						onChange={handleChange}
						value={values.street}
						placeholder="Street name"
						type="text"
						name="street"
						className="inputField"
					/>
					{touched.street && errors.street && (
						<span className="help-block text-red-600 text-left">
							{errors.street}
						</span>
					)}
				</div>

				{/* <!-- Street number --> */}
				<div className="flex flex-col mb-4 col-span-1 md:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">Street number</label>
					<input
						onChange={handleChange}
						value={values.streetNumber}
						placeholder="Street number"
						type="text"
						name="streetNumber"
						className="inputField"
					/>
					{touched.streetNumber && errors.streetNumber && (
						<span className="help-block text-red-600 text-left">
							{errors.streetNumber}
						</span>
					)}
				</div>

				{/* <!-- Postcode --> */}
				<div className="flex flex-col mb-4 col-span-1 md:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">Postcode</label>
					<input
						onChange={handleChange}
						value={values.postcode}
						placeholder="Postcode"
						type="text"
						name="postcode"
						className="inputField"
					/>
					{touched.postcode && errors.postcode && (
						<span className="help-block text-red-600 text-left">
							{errors.postcode}
						</span>
					)}
				</div>

				{/* <!-- Floor n° --> */}
				<div className="flex flex-col mb-4 pr-2 col-span-1 md:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">Floor number</label>
					<input
						onChange={handleChange}
						value={values.floorNumber}
						placeholder="Floor number"
						type="text"
						name="floorNumber"
						className="inputField"
					/>
					{touched.floorNumber && errors.floorNumber && (
						<span className="help-block text-red-600 text-left">
							{errors.floorNumber}
						</span>
					)}
				</div>

				{/* <!-- Apartment n° --> */}
				<div className="flex flex-col mb-4 col-span-1 md:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">Apartment number</label>
					<input
						onChange={handleChange}
						value={values.apartNumber}
						placeholder="n°"
						type="text"
						name="apartNumber"
						className="inputField"
					/>
					{touched.apartNumber && errors.apartNumber && (
						<span className="help-block text-red-600 text-left">
							{errors.apartNumber}
						</span>
					)}
				</div>

				{/* <!-- Size --> */}
				<div className="flex flex-col mb-4 col-span-1 md:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">Size</label>
					<input
						onChange={handleChange}
						value={values.squareMeters}
						placeholder="Square meters"
						type="text"
						name="squareMeters"
						className="inputField"
					/>
					{touched.squareMeters && errors.squareMeters && (
						<span className="help-block text-red-600 text-left">
							{errors.squareMeters}
						</span>
					)}
				</div>

				{/* <!-- Price --> */}
				<div className="flex flex-col mb-4 col-span-1 md:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">Price (USD - $)</label>
					<input
						onChange={handleChange}
						value={values.price}
						placeholder="Price of your property"
						type="text"
						name="price"
						className="inputField"
					/>
					{touched.price && errors.price && (
						<span className="help-block text-red-600 text-left">
							{errors.price}
						</span>
					)}
				</div>

				{/* <!-- rooms --> */}
				<div className="flex flex-col mb-4 pr-2 col-span-1 md:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">Number of rooms</label>
					<input
						onChange={handleChange}
						value={values.rooms}
						placeholder="n° of rooms"
						type="text"
						name="rooms"
						className="inputField"
					/>
					{touched.rooms && errors.rooms && (
						<span className="help-block text-red-600 text-left">
							{errors.rooms}
						</span>
					)}
				</div>

				{/* <!-- Bedrooms --> */}
				<div className="flex flex-col mb-4 col-span-1 md:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">Number of bedrooms</label>
					<input
						onChange={handleChange}
						value={values.bedrooms}
						placeholder="n° of bed"
						type="text"
						name="bedrooms"
						className="inputField"
					/>
					{touched.bedrooms && errors.bedrooms && (
						<span className="help-block text-red-600 text-left">
							{errors.bedrooms}
						</span>
					)}
				</div>

				{/* <!-- Bathrooms --> */}
				<div className="flex flex-col mb-4 col-span-1 md:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">Number of bathrooms</label>
					<input
						onChange={handleChange}
						value={values.bathrooms}
						placeholder="n° of bathroom"
						type="text"
						name="bathrooms"
						className="inputField"
					/>
					{touched.bathrooms && errors.bathrooms && (
						<span className="help-block text-red-600 text-left">
							{errors.bathrooms}
						</span>
					)}
				</div>

				{/* <!-- Rent or sell --> */}
				<div className="flex flex-col mb-4 col-span-1 sm:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">Rent or Sell</label>
					<select
						onChange={handleChange}
						value={values.rentOrSell}
						name="rentOrSell"
						className="inputField cursor-pointer"
					>
						<option value="DEFAULT">Choose an option</option>
						<option value="sell">Sell</option>
						<option value="rent">Rent</option>
					</select>
					{touched.rentOrSell && errors.rentOrSell && (
						<span className="help-block text-red-600 text-left">
							{errors.rentOrSell}
						</span>
					)}
				</div>

				{/* <!-- Is online - Announce --> */}
				<div className="flex flex-col mb-4 col-span-1 md:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">Online Announce</label>
					<div className="flex items-center">
						<p className="mr-2">Put Online</p>
						<input
							onChange={handleChange}
							value={values.isOnline}
							type="checkbox"
							name="isOnline"
						/>
					</div>
				</div>

				{/* <!-- Is Public - Announce --> */}
				<div className="flex flex-col mb-4 col-span-1 md:col-span-2 lg:col-span-1 relative">
					<label className="inputLabel">Public announce</label>
					<div className="flex items-center">
						<p className="mr-2 my-0">Make It Public</p>

						<input
							onChange={handleChange}
							value={values.isPublic}
							type="checkbox"
							name="isPublic"
						/>
					</div>
				</div>

				{/* <!-- Description --> */}
				<div className="flex flex-col mb-4 col-span-1 sm:col-span-2 md:col-span-4 relative">
					<label className="inputLabel">
						Description of the estate (50 characters minimum)
					</label>
					<textarea
						onChange={handleChange}
						value={values.description}
						placeholder="Write a description of your property"
						name="description"
						className="inputField"
						style={{ minHeight: "130px" }}
					/>
					{touched.description && errors.description && (
						<span className="help-block text-red-600 text-left">
							{errors.description}
						</span>
					)}
				</div>

				{/* <!-- Image input--> */}
				<label className="inputLabel mb-0">Upload images</label>
				<Dropzone setFilesUploaded={setFilesUploaded} />

				<div className="flex justify-center items-center mt-4 col-span-1 sm:col-span-2 md:col-span-4">
					<button
						type="submit"
						className="
						bg-blue-500
						hover:bg-darkerBlue50
						text-white
						py-2
						px-4
						rounded
						w-50
					"
					>
						{isSubmitting ? (
							<div className="lds-ring-2">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						) : (
							"Add new property"
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
	);
};

export default AddNewEstateForm;
