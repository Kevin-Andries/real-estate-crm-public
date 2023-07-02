import { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Component
import ErrorMessage from "../StatesComponents/errorMessage";
import Dropzone from "../Dropzone/Dropzone";

// router object
import { useHistory } from "react-router-dom";
import AllCountries from "../select/allCountries";
import { API_ROOT } from "../../../config/api-config";

// action and provider
import { updateUserEstates } from "../../../state/actions";
import { ContextState } from "../../../state/Provider";

// helper
import { updateEstateFormGenerator } from "../../../utils/formGenerator";

const EditModal = ({ setShowModal, property }: any) => {
	const { state, dispatch } = useContext<any>(ContextState);

	const [images, setImages] = useState<Array<any>>([]);
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>(
		"An error has occurred when we were signing you up. Please reload the page an retry."
	);
	const [filesUploaded, setFilesUploaded] = useState<any>([]);

	let history = useHistory();

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
			estateName: property.estate_name,
			country: property.country,
			city: property.city,
			street: property.street,
			streetNumber: property.street_number,
			postcode: property.postcode,
			floorNumber: property.floor_number,
			apartNumber: property.apart_number,
			squareMeters: property.square_meters,
			price: property.price,
			rooms: property.rooms,
			bedrooms: property.bedrooms,
			bathrooms: property.bathrooms,
			rentOrSell: property.rent_or_sell,
			isOnline: property.is_online,
			isPublic: property.is_public,
			description: property.description,
			pictures: property.pictures,
			estate_id: property.estate_id,
		},
		validationSchema,
		onSubmit: async (values: any) => {
			// Set isSubmitting to true
			setSubmitting(true);

			let form = updateEstateFormGenerator(values);

			try {
				const response = await fetch(
					`${API_ROOT}/estate/${property.estate_id}`,
					{
						method: "PUT",
						body: form,
						credentials: "include",
					}
				);

				const result = await response.json();

				if ((result.message = "Estate successfully updated")) {
					alert("Estate successfully updated");

					// We update the user current estate list if the POST call is a success
					fetch(`${API_ROOT}/estate/me`, {
						method: "GET",
						credentials: "include",
					})
						.then((res) => res.json())
						.then(async (result) => {
							if (result.length) {
								await dispatch(updateUserEstates(result));
							}
						});

					// We close the modal
					setShowModal(false);
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

	useEffect(() => {
		// Getting images urls
		const fetchPictures = async () => {
			try {
				property.pictures.forEach(async (picture: any) => {
					let response = await fetch(
						`${API_ROOT}/estate/picture/${picture.picture_id}`
					).then((res) => {
						if (res.url.length) {
							return res.url;
						}
					});

					setImages((images) => [
						...images,
						{
							url: response,
							pictureId: picture.picture_id,
						},
					]);
				});
			} catch (error) {
				console.error(error);
			}
		};

		fetchPictures();
	}, [setImages]);

	return (
		<div
			className="fixed z-10 inset-0 overflow-y-auto"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block">
				<div
					className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					aria-hidden="true"
				></div>

				<span
					className="hidden sm:inline-block sm:align-middle sm:h-screen"
					aria-hidden="true"
				>
					&#8203;
				</span>

				<div
					className="relative inline-block align-bottom bg-white 
					rounded-lg text-left overflow-hidden shadow-xl transform 
					transition-all 
                	sm:my-8 sm:align-middle max-w-5xl sm:w-full px-6 py-6"
				>
					<div className="">
						<div className="sm:flex sm:items-start">
							<div className="mb-6 text-center sm:text-left">
								<h3
									className="text-2xl leading-6 font-medium text-blue-500"
									id="modal-title"
								>
									Edit your property details
								</h3>
								<div className="mt-2">
									<p className="text-sm text-gray-500">
										Change everything you need and hit the
										update button once you are done.
									</p>
								</div>
							</div>
						</div>

						<form
							onSubmit={handleSubmit}
							id="addEstateForm"
							className="form-container flex flex-wrap rounded w-full grid grid-cols-2 gap-4"
						>
							{/* <!-- Property name --> */}
							<div className="flex flex-col mb-4  relative">
								<label className="inputLabel">
									Property name / Title
								</label>
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
							<div className="flex flex-col mb-4   relative">
								<label className="inputLabel">
									Select a country
								</label>
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
							<div className="flex flex-col mb-4   relative">
								<label className="inputLabel">City name</label>
								<input
									onChange={handleChange}
									value={values.city}
									placeholder="City"
									type="text"
									name="city"
									className="inputField"
								/>
								{touched.city && errors.city && (
									<span className="help-block text-red-600 text-left">
										{errors.city}
									</span>
								)}
							</div>

							{/* <!-- Street name --> */}
							<div className="flex flex-col mb-4  relative">
								<label className="inputLabel">
									Street name
								</label>
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
							<div className="flex flex-col mb-4   relative">
								<label className="inputLabel">
									Street number
								</label>
								<input
									onChange={handleChange}
									value={values.streetNumber}
									placeholder="Street number"
									type="text"
									name="streetNumber"
									className="inputField"
								/>
								{touched.streetNumber &&
									errors.streetNumber && (
										<span className="help-block text-red-600 text-left">
											{errors.streetNumber}
										</span>
									)}
							</div>

							{/* <!-- Postcode --> */}
							<div className="flex flex-col mb-4   relative">
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
							<div className="flex flex-col mb-4   relative">
								<label className="inputLabel">
									Floor number
								</label>
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
							<div className="flex flex-col mb-4   relative">
								<label className="inputLabel">
									Apartment number
								</label>
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
							<div className="flex flex-col mb-4   relative">
								<label className="inputLabel">Size</label>
								<input
									onChange={handleChange}
									value={values.squareMeters}
									placeholder="Square meters"
									type="text"
									name="squareMeters"
									className="inputField"
								/>
								{touched.squareMeters &&
									errors.squareMeters && (
										<span className="help-block text-red-600 text-left">
											{errors.squareMeters}
										</span>
									)}
							</div>

							{/* <!-- Price --> */}
							<div className="flex flex-col mb-4   relative">
								<label className="inputLabel">
									Price (USD - $)
								</label>
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
							<div className="flex flex-col mb-4   relative">
								<label className="inputLabel">
									Number of rooms
								</label>
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
							<div className="flex flex-col mb-4   relative">
								<label className="inputLabel">
									Number of bedrooms
								</label>
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
							<div className="flex flex-col mb-4   relative">
								<label className="inputLabel">
									Number of bathrooms
								</label>
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
							<div className="flex flex-col mb-4   relative">
								<label className="inputLabel">
									Rent or Sell
								</label>
								<select
									onChange={handleChange}
									value={values.rentOrSell}
									name="rentOrSell"
									className="inputField"
								>
									<option value="DEFAULT">
										Choose an option
									</option>
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
							<div className="flex flex-col mb-8 mt-2  relative">
								<label className="inputLabel">
									Online Announce
								</label>
								<div className="flex items-center">
									<p className="mr-2">Put Online</p>
									<input
										onChange={handleChange}
										value={values.isOnline}
										type="checkbox"
										name="isOnline"
										defaultChecked={values.isOnline}
									/>
								</div>
							</div>

							{/* <!-- Is Public - Announce --> */}
							<div className="flex flex-col mb-8 mt-2   relative">
								<label className="inputLabel">
									Public announce
								</label>
								<div className="flex items-center">
									<p className="mr-2 my-0">Make It Public</p>

									<input
										onChange={handleChange}
										value={values.isPublic}
										type="checkbox"
										name="isPublic"
										defaultChecked={values.isPublic}
									/>
								</div>
							</div>

							{/* <!-- Description --> */}
							<div className="flex flex-col mb-4 w-full relative col-span-2">
								<label className="inputLabel">
									Description of the estate (50 characters
									minimum)
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
							<label className="inputLabel col-span-2">
								Upload images
							</label>
							<div className="col-span-2">
								<Dropzone setFilesUploaded={setFilesUploaded} />
							</div>
							<div className="flex flex-row items-center">
								{images.map((image, index): any => (
									<img
										key={index}
										src={image.url}
										className="w-40 h-40 mx-2"
									/>
								))}
							</div>

							<div className="w-full flex flex-col col-span-2">
								<hr className="mt-4 mb-3" />
								<div className="flex flex-row items-center justify-end my-2">
									<button
										className="navigationItems link link-underline link-underline-black"
										onClick={() => setShowModal(false)}
									>
										Close
									</button>
									<button
										type="submit"
										className="btn ml-3 shadow-xl"
									>
										{isSubmitting ? (
											<>
												<div className="lds-ring-2">
													<div></div>
													<div></div>
													<div></div>
													<div></div>
												</div>
												<p className="ml-3">
													Updating estate
												</p>
											</>
										) : (
											"Update"
										)}
									</button>
								</div>
							</div>

							{error && (
								<ErrorMessage
									errorMessage={errorMessage}
									closeModal={setError}
								/>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditModal;
