import Header from "../header/header";

const HeaderWrapper = ({ children }: any) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default HeaderWrapper;
