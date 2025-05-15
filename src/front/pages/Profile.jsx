import React ,{ useEffect, useState } from "react";
import profileImageUrl from "../assets/img/roundpicture.png"; 
import star from "../assets/img/star.png";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import profilehero from "../assets/img/cute.png";
import { Card } from "../components/Card.jsx";
// import '../style.css';





export const Profile = () => {

	const { store, dispatch } = useGlobalReducer()
	const backendUrl = import.meta.env.VITE_BACKEND_URL
	const apiKey = import.meta.env.VITE_API_KEY
	const watchModeBase = import.meta.env.VITE_WATCHMODE_BASE_URL
	const watchModeApi = import.meta.env.VITE_WATCHMODE_API_KEY

	// added this becuase we are filling the favorites object 
	const [fav, setFav] = useState("");

	// added this in case it is needed to map a list
	const favoritedShow = []; 

	// added this becuase we want to render show list
	const [showList, setshowList] = useState([]);

	// added this for the search functionality
	const [search, setSearch] = useState("");

	const [episode, setEpisode] = useState("")


	// card map use state to override 
	const [label, setLabel] = useState([])

	const [mapItem, setMapItem] = useState("")

	const matchesSearch = (showList, search) => {
		return showList.title.toLowerCase().includes(search.toLowerCase());
	};

	const showListFetch = () => {
		fetch(watchModeBase+"/list-titles/?apiKey="+watchModeApi+"&source_ids=203,57")
			.then((resp) => {
				return resp.json()
			})

			.then((data) => {
				const arrayofMedia = data.titles
				const onlyShows = arrayofMedia.filter((show) => show.type == "tv_series")
				console.log(onlyShows, "HEREEEEEEEE")
				setLabel(onlyShows)
				setMapItem("show")
			})
			.catch((error) => {
				console.log(error, "There was an error!!!")
			})
	}

	// allows us to filter through the shows within the use state via the map method,
	//  meaning that only the title searched will be mapped.


	const filteredShows = mapItem == "show" ? label.filter(
		(show) => {
			const showTitleLower = show.title.toLowerCase()
			const searchLower = search.toLowerCase()
			return showTitleLower.includes(searchLower)
		}

	) : [];


	// added this becuase we want to render show season list
	const [seasons, setSeasons] = useState("");


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
				"favorites_id": 2

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

	// adding to pull show seasons from api


	const getSeasons=(id) => {
		fetch(watchModeBase+"/title/"+ `${id}`+ "/seasons/?apiKey=" + watchModeApi)
			.then((resp)=> {
				return resp.json()
			})

			.then((data)=> {
				setLabel(data)
				setMapItem("season")
				console.log("SEASONSSSSSSS",data)
			})
	}


	// below wokring on the code to render the episode list of the selected show season
        const getEpisodes = () => {
        	fetch(watchModeBase+ "/title/3197275/episodes/?apiKey="+ watchModeApi)
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                console.log("episode list is here",data)
            })
			
	}

	useEffect(() => {
		getFavorites()
		showListFetch()
		getEpisodes()
	}, [])


	return (
		
		<div style={{ backgroundColor: '#B08EF3', padding: '1rem' }} className="vh-100">
		
			<p className="lead">
				{/* <h1>Welcome, ${user}</h1>  will need to come back and update so it is personalized */}
			</p>
			
			<div className="d-inline-flex col-6"> 
					<img src= {profileImageUrl} className="img-fluid rounded-circle mb-4" width="200px" alt="User-Image" />
			</div>
			<div className="d-inline-flex col-12">
				<div>
					<h5 className="text-center">Favorite List</h5>
					{fav.length > 0 ?
						fav.map((show) => {
							return (
								<div className="text-start">
									<ul className="list-unstyled display-8">
										<li className="m-1">
											<img src={star} className="m-3" width="20" height="20" alt="Star-Image" />
											{show.showTitle}
										</li>
									</ul>
								</div>
							)
						}) :
						<p className=" small text-black-50">please select your favorite shows</p>}
				</div>


				<div className="text-center col-8 mb-5">
					<div className="">
						<img src={profilehero} className="img-fluid p-4" width="200"/>
					</div>
					<div className="">
						<h2 className="text-center"> What Are You Watching?</h2>
						{/* search bar for shows */}
						<div className="mx-auto col-4">
							<form className="text-center d-flex" role="search">
								<input
									className="form-control me-2"
									type="search"
									placeholder="Search shows..."
									aria-label="Search"
									value={search}
									onChange={(e) => {
									// setLabel(showList)	
									setSearch(e.target.value)}
							}
								/>
							
								{/* <button className="btn btn-outline-primary" type="submit">
									Search
								</button> */}
							</form>
							{label.length === 0 ?
							  "Search Not Found. Please Try again.":
								mapItem == "show" ? 
								filteredShows.map((show) => {
									return (
										<div className=" text-start">
											<ul className="list-unstyled">
												<li onClick={() => (getSeasons(show.id))} className="m-1">
													<Card
													title={show.title} 
													id={show.id}
													/>
												</li>
											</ul>
										</div>
									)
								})
								:
								 label.map((season) => {
								  return (
									  <div className="text-start text-center">
											<ul class="list-group d-flex align-items-center ">
												<li class="list-group-item col-4">{season.name}</li>
											</ul>
										</div>
									)
								})}
							</div>
						</div>
						<div>
							{seasons.length === 0 ?
							  "Seasons not found. Please Try again.":
							  seasons.map((season) => {
								  return (
									  <div className="text-start text-center">
											<ul class="list-group d-flex align-items-center ">
												<li class="list-group-item col-4">{season.name}</li>
											</ul>
										</div>
									)
								})}

					</div>
				</div>
			</div>
		</div>
	);
};











