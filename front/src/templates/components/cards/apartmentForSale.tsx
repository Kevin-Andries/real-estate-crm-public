import { useHistory } from "react-router-dom";

const ApartmentForSale = ({ estate }: any) => {
	let history = useHistory();

	const takeUserToEstateDetailsPage = () => {
		history.push(`/estate-details/${estate.estate_id}`);
	};

	return (
		<div
			className="card w-full"
			onClick={() => takeUserToEstateDetailsPage()}
		>
			<div className="h-48 sm:h-40 relative">
				<img
					className="object-cover w-full h-full"
					src="images/apartmentCard.jpg"
					alt="apartment"
				/>
			</div>

			<div className="flex flex-col px-2 md:px-4 mb-4 mt-2">
				<h5 className="text-left mt-2">
					{new Intl.NumberFormat("en-us", {
						style: "currency",
						currency: "USD",
						maximumSignificantDigits: 20,
					}).format(estate.price)}
				</h5>
				<h5 className="text-black text-left font-bold mb-1">
					{estate.estate_name}
				</h5>
				<p className="text-left text-gray-400 text-sm mb-1">
					{estate.street}, {estate.street_number}
				</p>
				<p className="text-left text-gray-400 text-sm mb-1">
					{estate.bedrooms} rooms | {estate.bathrooms} bathrooms
				</p>
				<p className="text-left">
					<i className="fab fa-gripfire"></i> {estate.square_meters}{" "}
					square meters
				</p>
			</div>
		</div>
	);
};

export default ApartmentForSale;
