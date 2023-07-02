// HOC
import BasicTransition from "../../../HOC/basicTransition";

// Section
import ForthComingVisits from "../../sections/Dashboard/ForthComingVisits";
import NewMessages from "../../sections/Dashboard/NewMessages";
import TopProperty from "../../sections/Dashboard/TopProperty";

// Component
import HeaderDashboard from "../../components/header/HeaderDashboard";

const Dashboard = () => {
	return (
		<BasicTransition>
			<div
				className="flex flex-col h-screen overflow-y-auto bg-white w-full"
				id="dashboard"
			>
				<HeaderDashboard
					title={"Overview"}
					subtitle={"Get a summary of your last actions"}
				/>
				<div className="grid grid-cols-5 gap-4 mt-3">
					<TopProperty />
					<ForthComingVisits />
					<NewMessages />
				</div>
			</div>
		</BasicTransition>
	);
};

export default Dashboard;
