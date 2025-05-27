import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState('alumno')
	const [msg, setMsg] = useState('')
	const navigate = useNavigate();

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			setMsg("*Completa los campos correctamente.");
			return;
		} else setMsg('')
		const body = JSON.stringify({ email, password })

		try {
			const response = await fetch(`https://probable-space-enigma-6pqgwjg9vxvf4ww7-3001.app.github.dev/${user}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body,
			})

			const data = await response.json()

			if (response.ok) {
				localStorage.setItem("token", data.access_token);
				dispatch({ type: "SET_USER", payload: { email: email } });
				dispatch({ type: "SET_TOKEN", payload: data.access_token });
				navigate(`/${user}/dashboard`);
			}

		} catch (error) {
			console.log(error);
			setMsg('*Email o contraseña son incorrectos')

		}
	}

	return (
		<div >
			<div className="d-flex position-absolute top-50 start-50 translate-middle gap-5 align-items-center border border-1 border-secondary rounded-3"  >
				<div>
					<img src="src/front/assets/img/loginUser.jpg" alt="" className="imgLogin rounded-start" />
				</div>
				<form className="AdminLoginWidth me-5" onSubmit={handleOnSubmit}>
					<h1 className="text-center mb-5">Login</h1>
					<div className="d-flex flex-column gap-3 mb-4">
						<div>
							<label className="form-label">Email</label>
							<input name="email" type="email" className="form-control" onChange={e => setEmail(e.target.value)} required />
						</div>
						<div>
							<label className="form-label">Password</label>
							<input name="password" type="password" className="form-control" onChange={e => setPassword(e.target.value)} required />
						</div>

					</div>
					<div className="d-flex justify-content-between">
						<div className="form-check">
							<input className="form-check-input " type="radio" name="radioDefault" id="radioDefault1" onChange={() => setUser('alumno')} checked={user === 'alumno'} />
							<label className="form-check-label" htmlFor="radioDefault1">
								Alumno
							</label>
						</div>
						<div className="form-check">
							<input className="form-check-input" type="radio" name="radioDefault" id="radioDefault2" onChange={() => setUser('profesor')} checked={user === 'profesor'} />
							<label className="form-check-label" htmlFor="radioDefault2">
								Profesor
							</label>
						</div>
					</div>
					<p className="text-danger mt-2">{msg}</p>
					<button type="submit" className="btn btn-outline-dark w-100">Login</button>
				</form>
			</div>
		</div>
	)
}; 