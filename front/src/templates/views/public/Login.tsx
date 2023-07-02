// Form
import LoginForm from "../../forms/loginForm";

// HOC
import HeaderAndFooterWrapper from "../../components/HOC/headerAndFooterWrapper";
import BasicTransition from "../../../HOC/basicTransition";

// styles
import "./styles/login.css";

const Login = () => {
	return (
		<BasicTransition>
			<HeaderAndFooterWrapper>
				<LoginForm />
			</HeaderAndFooterWrapper>
		</BasicTransition>
	);
};

export default Login;
