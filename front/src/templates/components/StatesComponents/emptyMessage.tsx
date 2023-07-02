// router
import { Link } from "react-router-dom";

const EmptyMessage = () => {
	return (
		<div className="flex flex-col px-6 sm:px-10">
			<div className="h-full w-full flex flex-col justify-center items-center border-dashed border-4 border-light-blue-400">
				<h3 className="text-3xl my-6">
					You have no real estate properties yet.
				</h3>
				<Link to="/add-estate">
					<p className="underline text-blue-500 cursor-pointer z-10">
						Click here to add a new estate to your list.
					</p>
				</Link>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-12 w-12 my-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
					/>
				</svg>
			</div>
		</div>
	);
};

export default EmptyMessage;
