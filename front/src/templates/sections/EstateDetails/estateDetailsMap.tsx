import { useEffect, useRef, useState } from "react";

// Google maps object
import { Loader } from "@googlemaps/js-api-loader";

// Helper
import { addMarker } from "../../../utils/googleMapHelpers";

const EstateDetailsMap = ({ estateDetails }: any) => {
	const [map, setMap] = useState<any>();

	const mapRef = useRef(null);

	useEffect(() => {
		// Get google map object using our API key
		const loader = new Loader({
			apiKey: "AIzaSyC4qYO5UXsOmOwsWEpeAkDxRslLKYbWbrc",
		});

		// Init map with these options
		const mapOptions = {
			center: {
				lat: estateDetails.position.lat,
				lng: estateDetails.position.lng,
			},
			zoom: 10,
		};

		// Loading map object
		loader
			.load()
			.then((google) => {
				// Initializing and centring the map to the user location
				const map = new google.maps.Map(mapRef.current, mapOptions);

				// Storing the map & bounds object in context
				setMap(map);

				// 1- Adding marker on the map
				addMarker(google, map, estateDetails.position);
			})
			.catch((e) => {
				console.error(e, "An error happened while loading the map");
			});
	}, [mapRef, setMap]);

	return (
		<>
			<h3 className="font-bold text-left mt-8 pl-1 sm:pl-0">
				Where is this estate located?
			</h3>
			<div className="w-full flex justify-between items-center mb-4 mt-2">
				<p className="m-0 underline text-grey-500 flex items-center">
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
					{estateDetails.address}, {estateDetails.city},
					{estateDetails.country}
				</p>
			</div>

			<div className="h-96 w-full" ref={mapRef}></div>
		</>
	);
};

export default EstateDetailsMap;
