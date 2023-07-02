// HOC
import BasicTransition from "../../../HOC/basicTransition";

// Component
import HeaderDashboard from "../../components/header/HeaderDashboard";
import UserPropertyList from "../../components/UserPropertylist.tsx/UserPropertyList";

const YourProperties = () => {
	return (
		<BasicTransition>
			<div
				className="flex flex-col h-screen overflow-y-auto bg-white w-full"
				id="addPropertiesView"
			>
				<HeaderDashboard
					title={"Your Properties"}
					subtitle={"List of your properties"}
				/>
				<div className="flex flex-col pb-16 md:pb-10 pt-4">
					<UserPropertyList />
				</div>
			</div>
		</BasicTransition>
	);
};

export default YourProperties;
