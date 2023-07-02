import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

// Context and Actions
import { ContextState } from "../../../state/Provider";
import { updateEstateList } from "../../../state/actions";

// style
import "./styles/ListOfProperties.css";

// api config
import { API_ROOT } from "../../../config/api-config";

// Components
import PointerIcon from "../../components/icons/pointer";
import Pagination from "../../components/pagination/pagination";

const ListOfProperties = ({ property, setShowModal }: any) => {
	const { state, dispatch } = useContext<any>(ContextState);
	let history = useHistory();

	const zoomOntoEstate = (e: any) => {
		let lat = parseFloat(e.target.dataset.lat);
		let lng = parseFloat(e.target.dataset.lng);

		// set center
		state.map.setCenter({ lat, lng });
		// Zoom in
		state.map.setZoom(8);
	};

	const takeUserToEstateDetailsPage = (e: any) => {
		history.push(`/estate-details/${e.target.dataset.id}`);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				let properties: any = await fetch(`${API_ROOT}/estate`)
					.then((res) => res.json())
					.then((result) => result);

				await dispatch(updateEstateList(properties));
			} catch (err) {
				console.log(err);
			}
		};

		if (!state.estateList.length) {
			fetchData();
		}
	}, [state, dispatch]);

	return (
		<div
			className={`transition-transform relative overflow-y-scroll flex flex-col py-3 ${
				property.leftCols > 0 ? "px-4 transitionStart" : "transitionEnd"
			}`}
			id="transitioning"
			style={{ width: property.leftCols + "vw" }}
		>
			<div
				className="
            details
            flex flex-col-reverse sm:flex-row items-center justify-between
            border-2 border-l-0 border-r-0 border-t-0
			dark:border-gray-600
			relative

        "
			>
				<p className="text-left my-2">
					{state.estateList.length}
					{state.estateList.length > 1 ? " estates" : " estate"}{" "}
					currently on the map
				</p>
				<button className="btn my-2" onClick={() => setShowModal(true)}>
					Open Filters
				</button>
			</div>

			{state.estateList.map((data: any) => {
				return (
					<div
						key={data.estate_id}
						className="flex flex-col sm:flex-row border-2 border-l-0 border-r-0 border-t-0 dark:border-gray-600 py-5"
					>
						<div
							className="property-picture w-full sm:w-5/12 relative"
							data-id={data.estate_id}
							onClick={takeUserToEstateDetailsPage}
						>
							<img
								className="rounded-lg list-property--image cursor-pointer"
								src="images/apartmentCard.jpg"
								alt="property-overview"
								data-id={data.estate_id}
								onClick={takeUserToEstateDetailsPage}
							/>
						</div>
						<div
							className="
								property-details
								flex flex-col
								justify-between
								w-full
								sm:w-7/12
								sm:pl-4
							"
						>
							<div className="flex flex-col relative">
								<h4
									className=" text-left mb-0 mt-2 sm:mt-0 cursor-pointer sm:pr-5"
									data-id={data.estate_id}
									onClick={takeUserToEstateDetailsPage}
								>
									{data.estate_name}
								</h4>
								<PointerIcon zoomOntoEstate={zoomOntoEstate} />
							</div>

							<div className="flex flex-col relative">
								<p className="text-left text-md md:text-lg m-0">
									<span className="font-semibold">
										Type: to
									</span>{" "}
									{data.rent_or_sell}
								</p>
								<p className="text-left text-md md:text-lg m-0">
									<span className="font-semibold">Bed:</span>{" "}
									{data.bedrooms}
								</p>
								<p className="text-left text-md md:text-lg m-0">
									<span className="font-semibold">
										Bath:{" "}
									</span>
									{data.bathrooms}
								</p>
								<p className="text-left text-md md:text-lg m-0">
									<span className="font-semibold">
										Square meter:
									</span>{" "}
									{data.square_meters}
								</p>
								<p className="text-left text-md md:text-lg m-0">
									{data.street}, {data.street_number}
								</p>
								<p className="text-left text-md md:text-lg m-0">
									{data.city}, {data.country}
								</p>
								<p
									className="w-max sm:absolute bottom-0 right-0 mt-2 sm:mt-0 m-0 btn"
									data-id={data.estate_id}
									onClick={takeUserToEstateDetailsPage}
								>
									$&nbsp;
									{new Intl.NumberFormat("us-US", {
										maximumSignificantDigits: 2,
									}).format(data.price)}
								</p>
							</div>
						</div>
					</div>
				);
			})}
			<Pagination />
		</div>
	);
};

export default ListOfProperties;
