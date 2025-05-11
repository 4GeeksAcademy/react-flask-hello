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
			.then((data) => {
				console.log(data,"Where is my data????")
			})
			.catch((error)=> {
				console.log(error, "The data did not load!!!")
			})
			
	}

	const login = () => {
		const option = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": email,
				"password": password
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
	
	const showList = () => {
		fetch(import.meta.env.VITE_API_URL)
			.then((resp) => {
				return resp.json()
			})

			.then((data) => {
				console.log(data,"Here is my list of shows!!")
			})
			.catch((error)=> {
				console.log(error, "There was an error!!!")
			})
	}
	
	// useEffect(() => {
	// 	// loadMessage()
	// }, [])

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Couch Potato </h1>
			<div>
				<h2 className="p-3">Sign up !</h2>
				<label className="p-2">Enter Your Name</label>
				<input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="full name" />
			</div>
			<div>
				<label className="p-2">Enter Age</label>
				<input onChange={(e) => setBirthday(e.target.value)} value={birthday} type="age" placeholder="19" />
			</div>
			{/* fix 'type' back to date */}
			<div>
				<label className="p-2">Enter Email</label>
				<input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="johnapple@hotmail.com" />
			</div>
			<div>
				<label className="p-2">Enter Password</label>
				<input onChange={(e) => setPassword(e.target.value)} value={[password]} type="password" placeholder="" />
			</div>
      {/* <-- add a button to see what youre typing---> */}
	  {/* try to see if can add 2nd password input for 'password confirmation' */}


			<div className="alert alert-info">
			<div>
			{/* <button onClick={() => showList()}>Show list button</button>  */} {/* <--this button needs to be added in the 'Profile Page' */}
				<button onClick={()=>signup()}>
					Signup
				</button>
				
				
				<div>
					<Link to="/login">Already Have An Account?</Link>
				</div>
				
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
