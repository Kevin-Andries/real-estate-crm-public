import { useState, useEffect } from "react";

// Component
import EditModal from "../Modals/editModal";

// api config
import { API_ROOT } from "../../../config/api-config";

const UserProperty = ({ property }: any) => {
	const [showModal, setShowModal] = useState(false);
	const [image, setImage] = useState<string>("");

	useEffect(() => {
		if (property.pictures.length) {
			fetch(
				`${API_ROOT}/estate/picture/${property.pictures[0].picture_id}`,
				{
					method: "GET",
					credentials: "include",
				}
			)
				.then((res) => res.json())
				.then((result) => {
					console.log("result 2", result);
					setImage(result);
				})
				.catch(() => {
					setImage("/images/placeholder-image.png");
				});
		}
	}, [property]);

	return (
		<div className="flex flex-col mb-3 border-2 relative">
			<div className="w-full relative">
				<img
					className="property-images w-full"
					src={image}
					alt="property"
				/>
				<p className="absolute bottom-0 bg-lightBlue right-0 px-2 py-1 text-white">
					Uploaded: {new Date().toLocaleDateString()}
				</p>
				{property.isOnline && (
					<p className="absolute bottom-0 bg-green-500 left-0 px-2 py-1 text-white">
						isOnline
					</p>
				)}
				{!property.online && (
					<p className="absolute bottom-0 bg-red-500 left-0 px-2 py-1 text-white">
						Offline
					</p>
				)}
			</div>
			<h3 className="text-center text-2xl font-bold py-4">
				{property.estate_name}
			</h3>
			<div className="grid grid-cols-3 py-5">
				<p className="border-r-2 text-center border-grey-500">
					Bed: {property.bedrooms}
				</p>
				<p className="border-r-2 text-center border-grey-500">
					Bath: {property.bathrooms}
				</p>
				<p className="text-center">Size: {property.square_meters}</p>
			</div>
			<h4
				id="editProperty"
				data-id={property.estate_id}
				className="bg-lightBlue hover:bg-darkerBlue50 text-lg text-white py-1 px-3 absolute top-0 right-0 modal-button"
				onClick={() => setShowModal(true)}
			>
				Edit
			</h4>

			{showModal && (
				<EditModal setShowModal={setShowModal} property={property} />
			)}
		</div>
	);
};

export default UserProperty;
