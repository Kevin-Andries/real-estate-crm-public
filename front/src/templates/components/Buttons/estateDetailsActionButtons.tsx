import { useState } from "react";

// Component
import ShareLinkModal from "../Modals/shareLinkMondal";

const EstateDetailsActionButtons = () => {
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<div className="sharing-and-save-options flex items-center">
			<div id="share" className="mr-2 flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 text-blue-500 cursor-pointer"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
					/>
				</svg>
				<p
					className="my-0 ml-1 text-bold text-base cursor-pointer"
					onClick={() => setShowModal(true)}
				>
					Share
				</p>
			</div>
			<div className="save flex items-center mx-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5 text-blue-500 cursor-pointer"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
					/>
				</svg>
				<p className="my-0 ml-1 text-bold text-base cursor-pointer">
					Save
				</p>
			</div>
			{showModal && <ShareLinkModal setShowModal={setShowModal} />}
		</div>
	);
};

export default EstateDetailsActionButtons;
