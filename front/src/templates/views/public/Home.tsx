// HOC
import HeaderAndFooterWrapper from "../../components/HOC/headerAndFooterWrapper";
import BasicTransition from "../../../HOC/basicTransition";

// sections import
import HomePageIntro from "../../sections/Home/HomePageIntro";
import SearchSection from "../../sections/Home/SearchSection";
import LatestProperties from "../../sections/Home/LatestProperties";
import GoToMap from "../../sections/Home/GoToMap";

const Home = () => {
	return (
		<BasicTransition>
			<HeaderAndFooterWrapper>
				<HomePageIntro />
				<SearchSection />
				<LatestProperties />
				<GoToMap />
			</HeaderAndFooterWrapper>
		</BasicTransition>
	);
};

export default Home;
