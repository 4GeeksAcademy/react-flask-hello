import React, { useEffect, useState } from "react";
import profileImageUrl from "../assets/img/Profile-Image-1.jpg"; 
import star from "../assets/img/star.png";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
// import '../style.css';





export const Profile = () => {

	const { store, dispatch } = useGlobalReducer()
	const backendUrl = import.meta.env.VITE_BACKEND_URL

	// added this becuase we are filling the favorites object 
	const [fav, setFav] = useState("");

	// added this in case it is needed to map a list
	const favoritedShow = []; 

	// added this becuase we want to render show list
	const [showList, setshowList] = useState("");


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

	const getFavorites=() => {
		fetch(backendUrl + "/api/favorites")
			.then((resp)=> {
				return resp.json()
			})

			.then((data)=> {
				setFav(data)
			})
	}


// this is used to render the shows in tandem with the get request 
// Shae's creating & the useState above:

	const getShowList=() => {
		fetch(backendUrl + "/api/showList")
			.then((resp)=> {
				return resp.json()
			})

			.then((data)=> {
				setshowList(data)
			})
	}

	useEffect(() =>{
		getFavorites()
		getShowList()
	},[])


	return (
		<div className="text-center mt-5 d-inline bg-purple">
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
						<h2 className="text-center mt-7 ">Favorite List</h2>
						
						{fav.length > 0 ? 
						fav.map((show)=> {
						return (
							<div className="text-start">
								<ul className="list-unstyled display-8">
									<li className="m-1">
										<img src= {star} className="m-3" width="20" height="20" alt="Star-Image" />
										{show.showTitle}
									</li>
								</ul>
							</div>

						)
						}):
						"please select your favorite shows"}
					</div>


					<div className="d-inline-flex col-3 mt-4">
					<div>
						<h2 className="text-center mt-7 ">Show List</h2>
						
						{showList.length > 0 ? 
						showList.map((show)=> {
						return (
							<div className="text-start">
								<ul className="list-unstyled display-8">
									<li className="m-1">
										{show.showTitle}
									</li>
								</ul>
							</div>

						)
						}):
						 "Error. Please refresh page"}
					</div>
				</div>
			</div>
		</div>
		</div>
	);
}; 
