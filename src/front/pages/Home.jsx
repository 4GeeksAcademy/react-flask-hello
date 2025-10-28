import Login from "./Login.jsx";
import Register from "./Register.jsx";
import CitasForm from "../components/CitasForm.jsx";
import HeroSection from "../components/HeroSection.jsx";
import PatientDashboard from "./PatientDashboard.jsx";
import DoctorDashboard from "./DoctorDashboard.jsx";

import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div className="text-center mt-5">

			<Register />
			<HeroSection />

		</div>
	);
}; 