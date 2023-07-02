// HOC
import BasicTransition from "../../../HOC/basicTransition";

// Component
import HeaderDashboard from "../../components/header/HeaderDashboard";
import UserSettingsForm from "../../forms/UserSettingsForm";

const Settings = () => {
	return (
		<BasicTransition>
			<div
				className="flex flex-col h-screen overflow-y-auto bg-white w-full"
				id="dashboard"
			>
				<HeaderDashboard
					title={"Settings"}
					subtitle={"Your account settings"}
				/>
				<div className="grid grid-cols-1 gap-4">
					<UserSettingsForm />
				</div>
			</div>
		</BasicTransition>
	);
};

export default Settings;
