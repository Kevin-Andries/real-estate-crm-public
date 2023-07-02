import Footer from "../footer/footer";

const FooterWrapper = ({ children }: any) => {
	return (
		<>
			{children}
			<Footer />
		</>
	);
};

export default FooterWrapper;
