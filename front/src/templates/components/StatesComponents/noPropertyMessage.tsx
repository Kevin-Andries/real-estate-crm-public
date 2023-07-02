const NoPropertyMessage = ({ message }: any) => {
	return (
		<div className="flex flex-col w-full z-10">
			<div className="h-full w-full flex flex-col justify-center items-center border-dashed border-4 border-light-blue-400">
				<h3 className="text-3xl my-6">
					We do not have any property to {message} at the moment.
				</h3>
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

export default NoPropertyMessage;
