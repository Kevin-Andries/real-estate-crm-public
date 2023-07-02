import { useEffect, useRef, useContext } from "react";

// Context and Actions
import { ContextState } from "../../../state/Provider";
import {
	setMapObjectFromGoogle,
	setBoundsObjectFromGoogle,
} from "../../../state/actions";

// Google maps object
import { Loader } from "@googlemaps/js-api-loader";

// Styles
import "./styles/map.css";

// Component
import ToggleFindEstatePanelIcon from "../../components/icons/toggleFindEstatePanelIcon";

const GoogleMap = ({ property, setClassProperties }: any) => {
	const { state, dispatch } = useContext<any>(ContextState);

	const mapRef = useRef(null);

	const changePanelsWidth = () => {
		if (property.leftCols === 50) {
			setClassProperties({
				leftCols: 0,
				rightCols: 100,
			});
		} else {
			setClassProperties({
				leftCols: 50,
				rightCols: 50,
			});
		}
	};

	useEffect(() => {
		// Get google map object using our API key
		const loader = new Loader({
			apiKey: "AIzaSyC4qYO5UXsOmOwsWEpeAkDxRslLKYbWbrc",
		});

		// Init map with these options
		const mapOptions = {
			center: {
				lat: 51.50722,
				lng: -0.1275,
			},
			zoom: 6,
		};

		// Loading map object
		loader
			.load()
			.then(async (google) => {
				// Initializing and centring the map
				const map = new google.maps.Map(mapRef.current, mapOptions);

				// Creating the bounds object
				let bounds = new google.maps.LatLngBounds();

				// Storing the map & bounds object in context
				await dispatch(setMapObjectFromGoogle(map));
				await dispatch(setBoundsObjectFromGoogle(bounds));

				// map.fitBounds(bounds);
			})
			.catch((e) => {
				console.error(e, "An error happened while loading the map");
			});
	}, [dispatch]);

	return (
		<div
			className="transition-transform flex justify-center items-center relative"
			style={{ width: property.rightCols + "vw" }}
			id="transitioning"
		>
			<ToggleFindEstatePanelIcon
				property={property}
				changePanelsWidth={changePanelsWidth}
			/>
			<div className="h-full w-full" ref={mapRef} id="map"></div>
		</div>
	);
};

export default GoogleMap;
