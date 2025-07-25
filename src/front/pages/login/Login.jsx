import './login.css'


export const Login = () => {


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