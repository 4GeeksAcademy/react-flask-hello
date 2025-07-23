import './login.css'

export const Login = () => {

	//  const [name, setName] = useState("")
	//  const [email, setEmail] = useState("")
	//  const [password, setPassword] = useState("")

	 const handleSubmit = async (e) => {
	 	e.preventDefault()
	 	try {

	 		let new_user = {
	 			"username": name,
	 			"email": email,
	 			"password": password
	 		}

	 		await fetch("https://jubilant-spork-7v5jg5r9r9p73xpqq-3001.app.github.dev/api/register", {
	 			method: "POST",
	 			body: JSON.stringify(new_user),
	 			headers: { "Content-type": "application/json" }
	 		})
	 		alert("Usuario registrado correctamente")
	 	}
	 	catch (error) {
	 		console.log(error)
	 	}
	}
	return (
		<div className="login-wrap">
			<div className="login-html">
				<input id="tab-1" type="radio" name="tab" className="sign-in" checked /><label for="tab-1" className="tab">Login</label>
				<input id="tab-2" type="radio" name="tab" className="sign-up" /><label for="tab-2" className="tab">Registrate</label>
				<div className="login-form">
					<div className="sign-in-htm">
						<div className="group">
							<label for="pass" className="label">Email</label>
							<input id="pass" type="text" className="input" />
						</div>
						<div className="group">
							<label for="pass" className="label">Contraseña</label>
							<input id="pass" type="password" className="input" data-type="password" />
						</div>
						<div className="group">
							<input id="check" type="checkbox" className="check" checked />

						</div>
						<div className="group">
							<button className='button'>Iniciar sesión</button>
						</div>
						<div className="hr"></div>

						{/* REGISTRO USUARIO */}
					</div>
					<form>
						<div className="sign-up-htm">

							<div className="group">
								<label for="user" className="label">Nombre</label>
								<input id="user" type="text" className="input" />
							</div>
							<div className="group">
								<label for="pass" className="label">Contraseña</label>
								<input id="pass" type="password" className="input" data-type="password" />
							</div>

							<div className="group">
								<label for="pass" className="label">Email</label>
								<input id="pass" type="text" className="input" />
							</div>
							<div className="group">
								<button type='submit' className='button bg-blue'>Crear cuenta</button>
							</div>
							<div className="">


							</div>
						</div>
					</form>

				</div>

			</div>
		</div>





	)
}
