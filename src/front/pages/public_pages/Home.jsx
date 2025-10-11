import ClosingSection from "../../components/home-components/features-section-components/ClosingSection";
import FeaturesSection from "../../components/home-components/FeaturesSection";
import Jumbotron from "../../components/home-components/Jumbotron";


export const Home = () => {

	return (
		<div className="container py-5">
			<Jumbotron/>
			<FeaturesSection/>
			<ClosingSection/>
		</div>
	);
}; 