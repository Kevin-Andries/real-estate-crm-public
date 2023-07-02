// HOC
import BasicTransition from "../../../HOC/basicTransition";

// Component
import HeaderDashboard from "../../components/header/HeaderDashboard";
import AddNewEstateForm from "../../forms/AddNewEstateForm";

const AddEstate = () => {
	return (
		<BasicTransition>
			<div
				className="flex flex-col h-screen bg-white w-full overflow-y-auto"
				id="addEstateView"
			>
				<HeaderDashboard
					title={"Add a property"}
					subtitle={"Add a property to your catalog"}
				/>

				<div className="flex flex-col pb-16 md:pb-0">
					<AddNewEstateForm />
				</div>
			</div>
		</BasicTransition>
	);
};

export default AddEstate;
