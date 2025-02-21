import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const {store, dispatch} =useGlobalReducer()
	
	const loadMessage = async () => {
		const backendUrl = import.meta.env.VITE_BACKEND_URL
		if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")
		const response = await fetch( backendUrl + "/api/hello")
		const data = await response.json()
		if (!response.ok) throw new Error(
			`Could not fetch the message from the backend.
			Please check if the backend is running and the backend port is public.`
		);
		dispatch({type: "set_hello", payload: data})
		return data
	}

	useEffect(()=>{
		loadMessage()
	},[])

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Hello Rigo!!</h1>
			<p className="lead">
				<img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
			</p>
			<div className="alert alert-info fw-bold">
				{store.hello && store.hello.message ? (
					<span>{store.hello.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)}
			</div>
		</div>
	);
}; 