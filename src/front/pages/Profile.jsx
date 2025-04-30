import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export default function Profile() {

	const { store, dispatch } = useGlobalReducer()
	const backendUrl = import.meta.env.VITE_BACKEND_URL

	// added this becuase we are filling the favorites object 
	const [fav, setFav] = useState("")

	// added this in case it is needed to map a list
	const favoritedShow = []; 

	const loadMessage = async () => {
		try {

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

	const post_favorites = () => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"user": "Brandon-Ray",
			

			})
		}
		fetch(backendUrl  + "/api/post_favorites", option)
			.then((resp) => {
				return resp.json()
			})

			.then((data) => {
				console.log(data)
			})
	}

	const post_show = () => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"showTitle": "Breaking Bad",
				"favorites_id":2
			

			})
		}
		fetch(backendUrl  + "/api/post_show", option)
			.then((resp) => {
				return resp.json()
			})

			.then((data) => {
				console.log(data)
			})
	}




	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Profile Page</h1>
			<p className="lead">
				{/* <h1>Welcome, ${user}</h1>  will need to come back and update so it is personalized */}
				{/* <img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" /> */}
			<div>
				<h1>Favorites List</h1>
					{/* should take in each favorited item into the state then in a list */}
				{fav.map((favoritedShow)=> (	
					<ul>
					<li favoritedShow={favoritedShow}></li>
				</ul>
				))}
			</div>
			</p>

			<div className="alert alert-info">
			<button onClick={()=>signup()}>
			signup
			</button>
				{/* {store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)} */}
			</div>
		</div>
	);
}; 
