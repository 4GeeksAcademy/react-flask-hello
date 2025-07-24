import React from "react";
import { useState } from "react";

import '@fontsource/bebas-neue';




export const Formulario = () => {

	const [situacion, setSituacion] = useState(null);
	const [sueldo, setSueldo] = useState("");

	const calcularAhorro = () => {
		const valor = parseFloat(sueldo);
		if (isNaN(valor)) return 0;
		return (valor * 0.2).toFixed(2);
	};

	return (<div className="min-vh-100 d-flex justify-content-center align-items-center " style={{
		backgroundColor: "#ffffff",
		minHeight: "80vh"
	}}>
		<form className="w-100" style={{ maxWidth: "600px" }}>
			<div className="text-center" style={{ fontFamily: "'Bebas Neue', sans-serif"  }} ><h1>Formulario</h1></div>
			<div className="p-5 rounded shadow-lg" style={{ backgroundColor: "#ffffff", width: "100%", maxWidth: "600px", paddingTop: "60px", paddingBottom: "60px" }}>
				<div className="mb-4 ">
					<label for="firstName" className="form-label " >Nombre</label>
					<input type="text" className="form-control" id="name" aria-describedby="name" />
				</div>

				<div className="mb-4 ">
					<label for="lastName" className="form-label "  >Apellidos</label>
					<input type="text" className="form-control  " id="lastName" aria-describedby="lastName" />
				</div>
				<div className="mb-4 ">
					<label for="userName" className="form-label "  >Nombre de Usuario</label>
					<input type="text" className="form-control  " id="userName" aria-describedby="userName" />
				</div>

				<div className="mb-4 ">
					<label for="email" className="form-label" >Email</label>
					<input type="email" className="form-control" id="email" aria-describedby="email" />
				</div>

				<div className="mb-3 ">
					<label for="exampleInputPassword1" class="form-label">Contraseña</label>
					<input type="password" className="form-control " id="exampleInputPassword1"/>
				</div>

				<div className="mb-4 ">
					<label for="lastName" className="form-label " ></label>
					<select className="form-select   mb-4" aria-label=".form-select-lg example" >
						<option disabled selected >Donde vives?</option>
						<option value="1">Alemania</option>
						<option value="2">Austria</option>
						<option value="3">Bélgica</option>
						<option value="4">Chipre</option>
						<option value="5">Croacia</option>
						<option value="6">Eslovaquia</option>
						<option value="7">Eslovenia</option>
						<option value="8">España</option>
						<option value="9">Estonia</option>
						<option value="10">Finlandia</option>
						<option value="11">Francia</option>
						<option value="12">Grecia</option>
						<option value="13">Irlanda</option>
						<option value="14">Italia</option>
						<option value="15">Letonia</option>
						<option value="16">Lituania</option>
						<option value="17">Luxemburgo</option>
						<option value="18">Malta</option>
						<option value="19">Paises Bajos</option>
						<option value="20">Portugal</option>
					</select>
				</div>

				<div className="mb-4 ">
					<label htmlFor="telefono" className="form-label block mb-2 font-semibold">Contacto</label>
					<div className="d-flex mb-4 gap-2">

						<select className="form-select text-secondary" style={{ width: '30%' }} required>
							<option value="" disabled selected>+</option>
							<option value="Alemania">+49</option>
							<option value="Austria">+43</option>
							<option value="Bélgica">+32</option>
							<option value="Chipre">+357</option>
							<option value="Croacia">+385</option>
							<option value="Eslovaquia">+421</option>
							<option value="Eslovenia">+386</option>
							<option value="España">+34</option>
							<option value="Estonia">+372</option>
							<option value="Finlandia">+358</option>
							<option value="Francia">+33</option>
							<option value="Grecia">+30</option>
							<option value="Irlanda">+353</option>
							<option value="Italia">+39</option>
							<option value="Letonia">+371</option>
							<option value="Lituania">+370</option>
							<option value="Luxemburgo">+352</option>
							<option value="Malta">+356</option>
							<option value="Países Bajos">+31</option>
							<option value="Portugal">+351</option>
						</select>
						
						<input type="tel" className="form-control"  required />
					</div>
				</div>


				<div className="mb-4 ">
					<label className="form-label">Cuéntame algo sobre ti</label>
					<div className="mb-4 d-flex justify-content-center">
						<button type="button" style={{ backgroundColor: situacion === "estudiante" ? "#b7ff00" : "#b7ff00", color: situacion === "estudiante" ? "black" : "black", border: "1px solid #b7ff00" }} className={`btn me-2 ${situacion === "estudiante" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setSituacion("estudiante")}>
							Soy estudiante
						</button>
						<button type="button" style={{
							backgroundColor: situacion === "trabajador" ? "#b7ff00" : "#b7ff00",
							color: situacion === "trabajador" ? "black" : "black",
							border: "1px solid #b7ff00"
						}} className={`btn ${situacion === "trabajador" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setSituacion("trabajador")}>
							Tengo trabajo
						</button>
					</div>

					<div className="mb-4 ">
						<label className="form-label">¿Cuánto dispones al mes?</label>
						<input
							type="number" className="form-control" placeholder="€" disabled={situacion !== "estudiante"} onChange={(e) => setSueldo(e.target.value)} />
					</div>

					<div className="mb-3">
						<label className="form-label">¿Cuál es tu sueldo neto?</label>
						<input
							type="number" className="form-control" placeholder="€" disabled={situacion !== "trabajador"} onChange={(e) => setSueldo(e.target.value)} />
					</div>
				</div>

				<div className="mb-4">

					{sueldo && !isNaN(parseFloat(sueldo)) && (
						<div className="alert" style={{ backgroundColor: "#b7ff00" }}>
							💰 Deberías ahorrar mensualmente: <strong>{calcularAhorro()} €</strong> (20%)
						</div>
					)}
				</div>

				<div className="mb-3 d-flex justify-content-center">
					<button type="submit" className="btn btn-primary" style={{ backgroundColor: "#b7ff00", color: "black", border: "1px solid #b7ff00" }}>Send</button>
				</div>

			</div>

		</form>
	</div>
	);
};

