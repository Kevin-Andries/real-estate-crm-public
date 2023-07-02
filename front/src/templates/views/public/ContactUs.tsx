// Components
import ContactForm from "../../forms/ContactForm";

// HOC
import HeaderAndFooterWrapper from "../../components/HOC/headerAndFooterWrapper";
import BasicTransition from "../../../HOC/basicTransition";

const ContactUs = () => {
	return (
		<BasicTransition>
			<HeaderAndFooterWrapper>
				<ContactForm />
			</HeaderAndFooterWrapper>
		</BasicTransition>
	);
};

export default ContactUs;
