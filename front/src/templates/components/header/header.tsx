import { useState } from "react";

// styles
import "./header.css";

// Components
import MobileViewHeader from "./mobileViewheader";
import DesktopViewHeader from "./desktopViewHeader";

const Header = () => {
	const [showMobileViewHeader, toggleMobileViewHeader] = useState(false);

	return (
		<div className="flex justify-center items-center shadow">
			<header
				className="
				max-w-screen-xl
				px-6 px-xl-0
				w-full
				mx-auto
				flex
				items-center
				justify-between
				py-5
				relative
			"
				id="header"
			>
				<DesktopViewHeader />

				{/* Mobile view accordeon icon */}
				{!showMobileViewHeader && (
					<div
						className="lg:hidden"
						onClick={() => toggleMobileViewHeader(true)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</div>
				)}

				{/* Mobile View Header  */}
				{showMobileViewHeader && (
					<MobileViewHeader
						toggleMobileViewHeader={toggleMobileViewHeader}
					/>
				)}
			</header>
		</div>
	);
};

export default Header;
