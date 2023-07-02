const PointerIcon = ({ zoomOntoEstate }: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-8 w-8 hidden sm:block absolute top-0 right-0"
			viewBox="0 0 20 20"
			fill="currentColor"
			id="pin"
			data-lat={51.507351}
			data-lng={-0.127758}
			onClick={zoomOntoEstate}
		>
			<path
				fillRule="evenodd"
				d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
				clipRule="evenodd"
				data-lat={51.507351}
				data-lng={-0.127758}
				onClick={zoomOntoEstate}
			/>
		</svg>
	);
};

export default PointerIcon;
