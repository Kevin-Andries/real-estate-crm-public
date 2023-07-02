import { Link } from "react-router-dom";

const GoToMap = () => {
	return (
		<section className="relative">
			<div className="absolute top-0 bottom-0 right-0 left-0 z-0"></div>
			<div className="flex flex-col md:flex-row max-w-screen-xl px-6 px-xl-0 w-full mx-auto z-10 py-10">
				<div
					className="
                goToMap
                flex flex-col
                items-start
                justify-start
                z-10
                w-full
                md:w-7/12
                bg-white
                p-6
                md:rounded-l-lg
                border md:border-r-0 border-gray-300
                border-b-0 md:border-b
            "
				>
					<h2 className="text-bold text-left mb-3">
						Search Your Dream House On The Map
					</h2>
					<p className="text-left text-gray-400 text-lg">
						Find the property you are looking for thanks to our map.
					</p>
					<p className="text-left text-gray-400 text-lg mb-4 md:mb-8">
						Click on the button below to start searching for your
						dream house!
					</p>
					<Link
						href="#"
						to="/find-estate"
						className="
                    whitespace-nowrap
                    inline-flex
                    items-center
                    justify-center
                    px-6
                    py-2
                    border border-transparent
                    rounded-md
                    shadow-sm
                    text-base
                    font-medium
                    bg-lightBlue
                    hover:bg-darkerBlue50
                    text-white
                "
					>
						Search on the map
					</Link>
				</div>
				<div
					className="
                goToMapIllustration
                flex
                justify-center
                items-center
                z-10
                w-full
                md:w-5/12
                border md:border-l-0 border-gray-300
                md:rounded-r-lg
                border-t-0 md:border-t
            "
				>
					<img
						className="md:rounded-r-lg h-52 md:h-full object-cover object-left w-full"
						src="images/map.jpg"
						alt="map"
					/>
				</div>
			</div>
		</section>
	);
};

export default GoToMap;
