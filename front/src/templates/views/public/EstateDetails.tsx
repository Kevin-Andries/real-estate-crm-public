import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// HOC
import HeaderAndFooterWrapper from "../../components/HOC/headerAndFooterWrapper";
import BasicTransition from "../../../HOC/basicTransition";

// Sections
import EstateDetailsActionButtons from "../../components/Buttons/estateDetailsActionButtons";
import EstateDetailsContactLandlord from "../../sections/EstateDetails/estateDetailsContactLandlord";
import EstateDetailsMap from "../../sections/EstateDetails/estateDetailsMap";

// Component
import PublicEstatePageCarousel from "../../components/Carousel/publicEstatePageCarousel";

// api config
import { API_ROOT } from "../../../config/api-config.js";

interface estateType {
	estateDetails: {
		estate_name: null | string;
		address: null | string;
		city: null | string;
		images: any;
		country: null | string;
		bedrooms: null | number;
		bathrooms: null | number;
		square_meters: null | number;
		price: null | number | string;
		position: {
			lat: null | number;
			lng: null | number;
		};
		description: null | string;
	};
}

const EstateDetails = () => {
	let history = useHistory();

	const [estate, setEstate] = useState<estateType>({
		estateDetails: {
			estate_name: "",
			address: "",
			city: "",
			images: [""],
			country: "",
			bedrooms: 0,
			bathrooms: 0,
			square_meters: 0,
			price: "",
			position: {
				lat: 0,
				lng: 0,
			},
			description: "",
		},
	});

	useEffect(() => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});

		let id = history.location.pathname.split("/")[2];

		// declare the async data fetching function
		const fetchData = async () => {
			try {
				let result: any = await fetch(`${API_ROOT}/estate/${id}`)
					.then((res) => res.json())
					.then((result) => result);

				setEstate({
					estateDetails: {
						estate_name: result.estate_name,
						address: result.street + " ," + result.street_number,
						city: result.city,
						images: [],
						country: result.country,
						bedrooms: result.bedrooms,
						bathrooms: result.bathrooms,
						square_meters: result.square_meters,
						price: result.price,
						position: {
							lat: 51.507351,
							lng: -0.127758,
						},
						description: result.description,
					},
				});
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, [history]);

	let { estateDetails } = estate;

	return (
		<BasicTransition>
			<HeaderAndFooterWrapper>
				<div className="w-full px-0 py-6 m-0 flex flex-col">
					<section
						className="
				max-w-screen-xl
				px-3
				sm:px-6
				w-full
				mx-auto
				flex
				justify-center
			"
					>
						<div className="flex flex-col py-2 w-full">
							<h2 className="text-2xl font-bold text-center sm:text-left">
								{estateDetails.estate_name}
							</h2>
							<div
								className="
						w-full
						flex flex-col
						sm:flex-row
						justify-between
						items-center
						md:items-start
						sm:items-center
						mb-4
						mt-2
					"
							>
								<p
									className="
							mb-2
							sm:mb-0
							m-0
							text-sm
							sm:text-md
							underline
							text-grey-500
							flex
							items-center
						"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 mr-1"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
											clipRule="evenodd"
										/>
									</svg>
									{estateDetails.address},{" "}
									{estateDetails.city},{estateDetails.country}
								</p>
								<EstateDetailsActionButtons />
							</div>

							<div className="w-full pb-4 md:pb-14">
								<PublicEstatePageCarousel />
							</div>

							<EstateDetailsContactLandlord
								estateDetails={estateDetails}
							/>
							<EstateDetailsMap estateDetails={estateDetails} />
						</div>
					</section>
				</div>
			</HeaderAndFooterWrapper>
		</BasicTransition>
	);
};

export default EstateDetails;
