import { useState } from "react";

// Component
import FiltersForm from "../../forms/filtersForm";

// style
import "./styles/filters.css";

const FiltersModal = ({ setShowModal }: any) => {
	const [loader, setLoader] = useState<any>(false);

	return (
		<div
			className="fixed z-30 inset-0 overflow-y-auto"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block">
				<div
					className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					aria-hidden="true"
				></div>

				<span
					className="hidden sm:inline-block sm:align-middle sm:h-screen"
					aria-hidden="true"
				>
					&#8203;
				</span>

				<div
					className="relative inline-block align-bottom
				 bg-white rounded-lg text-left overflow-hidden shadow-xl 
				 transform transition-all sm:my-8 sm:align-middle max-w-3xl 
				 w-full px-6 py-4"
				>
					<div
						className="absolute top-3 right-4 text-blue-500 cursor-pointer hover:scale-105"
						onClick={() => setShowModal(false)}
					>
						&#9587;
					</div>
					{loader && (
						<div
							className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity flex justify-center items-center"
							aria-hidden="true"
						>
							<div className="flex flex-col items-center justify-center">
								<div className="lds-ring-4 w-full">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
								<h2 className="mt-8 font-semibold">
									Applying filters...
								</h2>
							</div>
						</div>
					)}

					<h3>Apply filters</h3>
					<hr className="mt-2 mb-4" />
					<FiltersForm
						setShowModal={setShowModal}
						setLoader={setLoader}
					/>
				</div>
			</div>
		</div>
	);
};

export default FiltersModal;
