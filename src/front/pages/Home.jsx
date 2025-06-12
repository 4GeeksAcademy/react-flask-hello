import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import Carousel from "../components/Carousel.jsx";
import GymPlans from "../components/GymPlans.jsx";
import EventosButton from "../components/EventosButton.jsx";
import Partners from "../components/Partners.jsx";
import ParallaxScroll from "../components/ParallaxScroll.jsx";

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

	//<VideoPlayer/> 
	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="text-center mt-5">
			<ParallaxScroll />
			<Carousel/>
			<h1 className="section-title text-white">Planes de Gimnasio</h1>
            <GymPlans/>
			<h1>Partners</h1>
			<Partners/>	
		</div>
	);
}; 