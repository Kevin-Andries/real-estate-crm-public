// HOC
import BasicTransition from "../../../HOC/basicTransition";

// Component
import HeaderDashboard from "../../components/header/HeaderDashboard";
import EmailBox from "../../components/Emails/EmailBox";

const Inbox = () => {
	return (
		<BasicTransition>
			<div
				className="flex flex-col h-screen overflow-y-auto bg-white w-full"
				id="inboxView"
			>
				<HeaderDashboard
					title={"Your inbox"}
					subtitle={"All your discussions"}
				/>
				<div className="flex flex-col w-full pb-10 pt-4">
					<EmailBox />
				</div>
			</div>
		</BasicTransition>
	);
};

export default Inbox;
