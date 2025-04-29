import React, { useEffect,useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const backendUrl = import.meta.env.VITE_BACKEND_URL
	const[email,setEmail] = useState("")
	const[password,setPassword] = useState("")
	const[name,setName] = useState("")
	const[age,setAge] = useState("")

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

	const signup = () => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": "email@email.com",
				"password": "password123",
				"name": "Jon",
				"age": 32,

			})
		}
		fetch(backendUrl  + "/api/signup", option)
			.then((resp) => {
				return resp.json()
			})

			.then((data) => {
				console.log(data)
			})
	}

	const login = () => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": "user10@gmail.com",
				"password": "password 123"
			})
		}
		fetch(backendUrl  + "/api/login", option)
			.then((resp) => {
				return resp.json()
			})

			.then((data) => {
				console.log(data)
			})
	}

	useEffect(() => {
		// loadMessage()
	}, [])

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Couch Potato</h1>
			<p className="lead">
				<h1>Yo</h1>
				<img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
			</p>
			<div className="alert alert-info">
			<div>
				<input onChange={(e) => setName(e.target.value)} value={name}  type="text" placeholder="Name" />
				<input onChange={(e) => setAge(e.target.value)} value={age}  type="text" placeholder="Age" />
				<input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
            	<input onChange={(e) => setPassword(e.target.value)} value={password}  type="text" placeholder="Password" />
				<button onClick={()=>signup()}>
					Signup
				</button>
			</div>
				<button onClick={()=>login()}>
					Login
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
