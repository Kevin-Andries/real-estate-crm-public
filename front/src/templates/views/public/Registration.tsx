import RegistrationForm from "../../forms/registrationForm";

// HOC
import HeaderAndFooterWrapper from "../../components/HOC/headerAndFooterWrapper";
import BasicTransition from "../../../HOC/basicTransition";

const Registration = () => {
	return (
		<BasicTransition>
			<HeaderAndFooterWrapper>
				<RegistrationForm />
			</HeaderAndFooterWrapper>
		</BasicTransition>
	);
};

export default Registration;
