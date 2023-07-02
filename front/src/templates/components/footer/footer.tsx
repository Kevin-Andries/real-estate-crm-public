// Router
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div
			className="
			flex
			justify-center
			items-center
			border-t border-gray-300
			dark:border-gray-600
			bg-gray-50
			dark:bg-gray-800
		"
		>
			<footer
				id="footer"
				className="max-w-screen-xl px-6 px-xl-0 w-full mx-auto relative"
			>
				<div
					className="
					py-4 sm:py-8
					flex flex-col-reverse sm:flex-row
					justify-center
					items-center
					text-center
				"
				>
					<Link to="/">
						<img
							className="h-10 w-auto sm:mr-4 mt-3 sm:mt-0"
							src="/images/logo2.png"
							alt="companyLogo"
						/>
					</Link>
					<p
						className="
						focus:outline-none
						text-lg
						lg:text-md
						leading-none
						text-darkerBlue
						dark:text-zinc-200
						sm:text-left
						leading-6
					"
					>
						Easimmo - 2021 Real Estate CRM. <br />
						All Rights Reserved.
					</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
