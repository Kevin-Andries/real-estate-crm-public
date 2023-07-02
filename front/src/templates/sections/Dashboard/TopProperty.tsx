import { Link } from "react-router-dom";

const TopProperty = () => {
	return (
		<div className="pl-6 sm:pl-10 col-span-2">
			<h4 className="text-left my-4 text-black">Top property</h4>
			<div className="relative">
				<p className="absolute left-0 top-0 text-darkerBlue50 bg-white px-4 py-1">
					House Andromeda
				</p>
				<Link to="/your-properties">
					<button className="btn absolute right-0 top-0 rounded-none hover:scale-125 transition">
						Manage property
					</button>
				</Link>
				<img src="images/introPicture.jpg" alt="bestRealEstate" />
			</div>
			<div className="flex justify-between">
				<div className="flex items-center">
					<h5 className="text-left my-2 mr-2">Viewed: 130 times</h5>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 text-darkBlue"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
						/>
					</svg>
				</div>
				<div className="flex items-center">
					<h5 className="text-left my-2 mr-2">Visited: 6 times</h5>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 text-darkBlue"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default TopProperty;
