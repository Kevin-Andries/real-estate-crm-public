import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

// Components
import ApartmentForRent from "../../components/cards/apartmentForRent";
import ApartmentForSale from "../../components/cards/apartmentForSale";
import NoPropertyMessage from "../../components/StatesComponents/noPropertyMessage";

// style
import "./styles/LatestProperties.css";

// Context State and actions
import { ContextState } from "../../../state/Provider";
import { updateEstateList } from "../../../state/actions";

// api config
import { API_ROOT } from "../../../config/api-config";

const LatestProperties = () => {
	const { dispatch } = useContext<any>(ContextState);

	const [apartmentToRent, setApartmentToRent] = useState([]);
	const [apartmentToSell, setApartmentToSell] = useState([]);

	let history = useHistory();

	const seeAllEstates = async (estateType: string) => {
		try {
			let properties: any = await fetch(
				`${API_ROOT}/estate?rent_or_sell=${estateType}`
			)
				.then((res) => res.json())
				.then((result) => result);

			// Updating the reducer with the new value
			await dispatch(updateEstateList(properties));

			// Taking the user to the estate page
			history.push(`/find-estate`);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		// declare the async data fetching function
		const fetchData = async () => {
			try {
				let [propertiesOnRent, propertiesOnSell]: any =
					await Promise.all([
						fetch(`${API_ROOT}/estate?rent_or_sell=rent`)
							.then((res) => res.json())
							.then((result) => result),
						fetch(`${API_ROOT}/estate?rent_or_sell=sell`)
							.then((res) => res.json())
							.then((result) => result),
					]);

				setApartmentToRent(propertiesOnRent);
				setApartmentToSell(propertiesOnSell);
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, []);

	return (
		<section className="relative ">
			<div className="absolute top-0 bottom-0 right-0 left-0 bg-gray-50  dark:bg-gray-800 z-0"></div>
			<div
				className="
				flex flex-col
				max-w-screen-xl
				px-6 px-xl-0
				w-full
				mx-auto
				justify-center
				items-center py-4 md:py-12"
			>
				{/* Sales */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mt-4 md:mt-14 mb-6 z-10">
					<h3 className="text-left sm:text-center mb-4 sm:mb-0">
						Latest properties for sales
					</h3>
					{!!apartmentToSell.length && (
						<button
							className="btn"
							onClick={() => seeAllEstates("sell")}
						>
							See all
						</button>
					)}
				</div>

				{!apartmentToSell.length && (
					<NoPropertyMessage message="sell" />
				)}

				<div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{apartmentToSell.length &&
						apartmentToSell
							.slice(0, 4)
							.map((estate, idx) => (
								<ApartmentForSale key={idx} estate={estate} />
							))}
				</div>

				{/* Rents */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mt-14 mb-6 z-10">
					<h3 className="text-left sm:text-center mb-4 sm:mb-0">
						Latest properties to rent
					</h3>
					{!!apartmentToRent.length && (
						<button
							className="btn"
							onClick={() => seeAllEstates("rent")}
						>
							See all
						</button>
					)}
				</div>

				{!apartmentToRent.length && (
					<NoPropertyMessage message="rent" />
				)}

				<div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{apartmentToRent.length &&
						apartmentToRent
							.slice(0, 4)
							.map((estate, idx) => (
								<ApartmentForRent key={idx} estate={estate} />
							))}
				</div>
			</div>
		</section>
	);
};

export default LatestProperties;
