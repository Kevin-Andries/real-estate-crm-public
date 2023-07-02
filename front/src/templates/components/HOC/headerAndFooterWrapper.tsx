import Footer from "../footer/footer";
import Header from "../header/header";

const HeaderAndFooterWrapper = ({ children }: any) => {
	return (
		<div className="flex flex-col justify-between min-h-screen">
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default HeaderAndFooterWrapper;
