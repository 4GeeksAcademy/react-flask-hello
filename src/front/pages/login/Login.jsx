import { useState } from "react"
import { Link } from "react-router-dom"

export const Login = () => {

//     const [email, setEmail] = useState("")
//         const [password, setPassword] = useState("")
//     // ME FALTA PARTE DE LA LOGICA DEL FRONT PARA CONECTAR A LA API Y HACER EL LOGIN ADRIAN.B

//     const login_user = async (email, password) => {
//      const resp = await fetch(`https://jubilant-spork-7v5jg5r9r9p73xpqq-3001.app.github.dev/api/token`, { 
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }) 
//      })

//      if(!resp.ok) throw Error("There was a problem in the login request")

//      if(resp.status === 401){
//           throw("Invalid credentials")
//      }
//      else if(resp.status === 400){
//           throw ("Invalid email or password format")
//      }
//      const data = await resp.json()
//      // Guarda el token en la localStorage
//      // También deberías almacenar el usuario en la store utilizando la función setItem
//      localStorage.setItem("jwt-token", data.token);

//      return data
// }



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

					</div>
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
							<label for="pass" className="label">Repite Contraseña</label>
							<input id="pass" type="password" className="input" data-type="password" />
						</div>
						<div className="group">
							<label for="pass" className="label">Email</label>
							<input id="pass" type="text" className="input" />
						</div>
						<div className="group">
							<button className='button bg-blue'>Crear cuenta</button>
						</div>
						<div className="hr"></div>

					</div>
				</div>
			</div>
		</div>




	)
}