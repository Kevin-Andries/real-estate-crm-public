import { useState } from "react";

const ShareLinkModal = ({ setShowModal }: any) => {
	const [urlCopied, setUrlCopied] = useState<boolean>(false);

	const copyUrlAndCloseModal = () => {
		setUrlCopied(true);

		var Url = document.getElementById("urlValue") as HTMLInputElement;
		Url.select(); // OK
		document.execCommand("copy");

		setTimeout(() => {
			setShowModal(false);
		}, 2000);
	};

	return (
		<div
			className="fixed z-10 inset-0 overflow-y-auto"
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block">
				<div
					className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					aria-hidden="true"
					onClick={() => setShowModal(false)}
				></div>

				<span
					className="hidden sm:inline-block sm:align-middle sm:h-screen"
					aria-hidden="true"
				>
					&#8203;
				</span>

				<div
					className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all
                sm:my-8 sm:align-middle max-w-md sm:w-full py-4"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 absolute top-2 right-2 text-blue-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
						onClick={() => setShowModal(false)}
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start flex-col">
							<div className="mb-6 text-center sm:text-left">
								<h3
									className="text-2xl leading-6 font-medium text-blue-500"
									id="modal-title"
								>
									Share this page with someone
								</h3>
								<div className="mt-2">
									<p className="text-sm text-gray-500">
										Copy the link below
									</p>
								</div>
							</div>
							<div className="flex flex-col items-center w-full">
								<input
									type="text"
									className="inputField w-full py-2"
									value={window.location.href}
									id="urlValue"
								/>
								<button
									className="btn ml-2 w-full mt-2"
									onClick={() => copyUrlAndCloseModal()}
								>
									{urlCopied ? "URL Copied" : "Copy URL"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShareLinkModal;
