import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useParams } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [name, setName] = useState("")
	const [birthday, setBirthday] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const backendUrl = import.meta.env.VITE_BACKEND_URL


	const signup = () => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": email,
				"password": password,
				"name": name,   
				"age": birthday,

			})
		}
		fetch(backendUrl + "/api/signup", option)
			.then((resp) => {
				return resp.json()
			})
			.catch(()=> {
				console.log(error, "The data did not load!!!")
			})
			.then((data) => {
				console.log(data,"Where is my data????")
			})
			
	}

	const login = () => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": "lov@email.com",
				"password": "password123"
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
	

	// useEffect(() => {
	// 	// loadMessage()
	// }, [])

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Couch Potato</h1>
			<div>
				<label>Enter Your Name</label>
				<input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="full name" />
			</div>
			<div>
				<label>Enter Age</label>
				<input onChange={(e) => setBirthday(e.target.value)} value={birthday} type="age" placeholder="19" />
			</div>
			{/* fix 'type' back to date */}
			<div>
				<label>Enter Email</label>
				<input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="johnapple@hotmail.com" />
			</div>
			<div>
				<label>Enter Password</label>
				<input onChange={(e) => setPassword(e.target.value)} value={[password]} type="password" placeholder="" />
			</div>
      {/* <-- add a button to see what youre typing---> */}
	  {/* try to see if can add 2nd password input for 'password confirmation' */}


			<div className="alert alert-info">
			<div>
				<button onClick={()=>signup()}>
					Signup
				</button>
				
				<button onClick={()=>login()}>
					Login
				</button>
				<Link to="/resetpassword">Forgot Password?</Link>
			</div>
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
