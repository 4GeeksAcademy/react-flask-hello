import React, { useEffect, useState } from "react";
import profileImageUrl from "../assets/img/Profile-Image-1.jpg"; 
import star from "../assets/img/star.png";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Profile = () => {

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
		<div className="bg-secondary text-center mt-5 d-inline">
			<h1 className="display-6 mt-5">Welcome, @Bianca_23</h1>
			<p className="lead">
				{/* <h1>Welcome, ${user}</h1>  will need to come back and update so it is personalized */}
			</p>
			<div>
				<div className="d-inline-flex col-6"> 
					<img src= {profileImageUrl} className="img-fluid rounded-circle mb-4 w-50" alt="User-Image" />

				</div>
				<div className="d-inline-flex col-3 mt-4">
					<div>
						<h2 className="text-center mt-7 ">Favorites List</h2>
							{/* should take in each favorited item into the state then in a list */}
						{/* {fav.map((favoritedShow)=> (	
						))} */}
						<div className="text-start">
							<ul className="list-unstyled display-8">
								<li className="m-1" favoritedShow={favoritedShow}>
								<img src= {star} className="m-3" width="20" height="20" alt="Star-Image" />
								Game of Thrones
								</li>
								<li className="m-1" favoritedShow={favoritedShow}>
								<img src= {star} className="m-3" width="20" height="20" alt="Star-Image" />
								Breaking Bad
								</li>
								<li className="m-1" favoritedShow={favoritedShow}>
								<img src= {star} className="m-3" width="20" height="20" alt="Star-Image" />
								Prison Break
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}; 
