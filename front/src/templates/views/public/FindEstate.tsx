import { useEffect, useState } from "react";

// HOC
import HeaderWrapper from "../../components/HOC/headerWrapper";
import BasicTransition from "../../../HOC/basicTransition";

// styles
import "./styles/findEstate.css";

// Sections
import ListOfProperties from "../../sections/FindEstate/ListOfProperties";
import GoogleMap from "../../sections/FindEstate/GoogleMap";
import FiltersModal from "../../components/Modals/filters";

// Component
import MapIcon from "../../components/icons/map";
import ListIcon from "../../components/icons/list";

interface classProperty {
	[key: string]: number;
}

const FindEstate = () => {
	const [showModal, setShowModal] = useState(false);
	const [mobileView, setMobileView] = useState(false);
	const [classProperties, setClassProperties] = useState<classProperty>({
		leftCols: 50,
		rightCols: 50,
	});

	const toggleLeftAndRightPanels = () => {
		if (classProperties.leftCols === 100) {
			setClassProperties({
				leftCols: 0,
				rightCols: 100,
			});
		} else {
			setClassProperties({
				leftCols: 100,
				rightCols: 0,
			});
		}
	};

	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set properties
			if (!mobileView && window.innerWidth < 1025) {
				setClassProperties({
					leftCols: 100,
					rightCols: 0,
				});
				setMobileView(true);
			}

			if (mobileView && window.innerWidth > 1023) {
				setClassProperties({
					leftCols: 50,
					rightCols: 50,
				});
				setMobileView(false);
			}
		}
		// Add event listener
		window.addEventListener("resize", handleResize);

		// Call handler right away, so properties gets updated with initial window size
		handleResize();

		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, [setMobileView, mobileView, setClassProperties, classProperties]);

	return (
		<BasicTransition>
			<HeaderWrapper>
				<div
					className="w-full m-0 flex flex-col dark:border-gray-600 relative"
					id="searchPage"
				>
					{showModal && (
						<BasicTransition>
							<FiltersModal setShowModal={setShowModal} />
						</BasicTransition>
					)}
					<div className="w-full h-full m-0 flex overflow-y-scroll">
						<ListOfProperties
							property={classProperties}
							setShowModal={setShowModal}
						/>
						<GoogleMap
							property={classProperties}
							setClassProperties={setClassProperties}
						/>
						<div className="lg:hidden absolute bottom-2 left-1/2 -translate-x-1/2 z-40">
							<button
								className="btn rounded-xl flex items-center"
								onClick={toggleLeftAndRightPanels}
							>
								{classProperties.leftCols === 100
									? "Show Map"
									: "Show Estates"}
								{classProperties.leftCols === 100 ? (
									<MapIcon />
								) : (
									<ListIcon />
								)}
							</button>
						</div>
					</div>
				</div>
			</HeaderWrapper>
		</BasicTransition>
	);
};

export default FindEstate;
