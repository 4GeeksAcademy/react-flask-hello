import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Services } from "../components/Services/Services.jsx";
import { Process } from "../components/Process.jsx";
import { Projects } from "../components/Projects.jsx";
import { Testimonials } from "../components/Testimonial/Testimonials.jsx";
import { HeaderHome } from "../components/HeaderHome.jsx";
import { Benefits } from "../components/Benefits/Benefits.jsx";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<>
			<HeaderHome />
			<Services />
			<Process />
			<Projects limit={4} />
			<Testimonials />
			<Benefits />

		</>
	);
}; 