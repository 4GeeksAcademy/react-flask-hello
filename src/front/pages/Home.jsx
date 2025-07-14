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

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<>
			<HeaderHome />

			<Services />
			<Process />
			<Projects />
			<Testimonials />
			<Benefits />

		</>
	);
}; 