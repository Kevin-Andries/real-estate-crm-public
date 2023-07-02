interface propertyObject {
	[key: string]: number;
}

type Props = {
	property: propertyObject;
	changePanelsWidth: any;
};

const ToggleFindEstatePanelIcon = ({ property, changePanelsWidth }: Props) => {
	if (property.leftCols === 50) {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="hidden lg:block h-12 w-12 absolute bottom-3 left-4 z-20 bg-white hover:scale-125 ease-out duration-300
                    text-lightBlue p-1 rounded-md hover:text-white hover:bg-lightBlue"
				id=""
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				onClick={changePanelsWidth}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
				/>
			</svg>
		);
	} else {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="hidden lg:block h-12 w-12 absolute bottom-3 left-4 z-50 bg-white hover:scale-125 ease-out duration-300
                    text-lightBlue p-1 rounded-md hover:text-white hover:bg-lightBlue"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				onClick={changePanelsWidth}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M13 5l7 7-7 7M5 5l7 7-7 7"
				/>
			</svg>
		);
	}
};

export default ToggleFindEstatePanelIcon;
