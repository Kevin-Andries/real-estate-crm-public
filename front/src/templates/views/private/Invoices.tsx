// HOC
import BasicTransition from "../../../HOC/basicTransition";

// Component
import HeaderDashboard from "../../components/header/HeaderDashboard";
import InvoicesSummary from "../../components/Invoices/InvoicesSummary";

const Invoices = () => {
	return (
		<BasicTransition>
			<div
				className="flex flex-col h-screen overflow-y-auto bg-white w-full"
				id="invoicesView"
			>
				<HeaderDashboard
					title={"Your invoices"}
					subtitle={"All your invoices"}
				/>
				<div className="flex flex-col pb-10 pt-4">
					<InvoicesSummary />
				</div>
			</div>
		</BasicTransition>
	);
};

export default Invoices;
