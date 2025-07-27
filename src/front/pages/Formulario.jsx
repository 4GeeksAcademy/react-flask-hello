import React, { useState, useEffect } from "react";
import axios from "axios";
import "@fontsource/bebas-neue";
import { useNavigate } from "react-router-dom";

export const Formulario = () => {
	const [situacion, setSituacion] = useState(null);
	const [sueldo, setSueldo] = useState("");
	const [nombre, setNombre] = useState("");
	const [apellidos, setApellidos] = useState("");
	const [usuario, setUsuario] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [pais, setPais] = useState("");
	const [prefijo, setPrefijo] = useState("");
	const [telefono, setTelefono] = useState("");
	const [estudiante, setEstudiante] = useState("");
	const [trabajador, setTrabajador] = useState("");

	const calcularAhorro = () => {
		const valor = parseFloat(sueldo);
		if (isNaN(valor)) return 0;
		return (valor * 0.2).toFixed(2);
	};

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();


		if (!situacion) {
			alert("Debes seleccionar si eres estudiante o trabajador ❌");
			return;
		}

		if (!sueldo || isNaN(parseFloat(sueldo))) {
			alert("Debes indicar tu sueldo o dinero disponible ❌");
			return;
		}

		try {
			await axios.post("http://localhost:5000/api/user/register", {
				username: usuario,
				email: email,
				password: password,
				firstname: nombre,
				lastname: apellidos,
				country: pais,
				phone: telefono,
				is_student: estudiante,
				sueldo: trabajador,

			});
			alert("Usuario registrado con éxito ✅");
			navigate("/main");
		} catch (error) {
			console.error("Error al enviar el formulario:", error);
			alert("Error al enviar el formulario ❌");
		}
	};

	return (
		<div
			className="min-vh-100 d-flex justify-content-center align-items-center"
			style={{ backgroundColor: "#ffffff", minHeight: "80vh" }}
		>
			<form
				className="w-100"
				style={{ maxWidth: "600px" }}
				onSubmit={handleSubmit}
			>
				<div
					className="text-center"
					style={{ fontFamily: "'Bebas Neue', sans-serif" }}
				>
					<h1>Formulario</h1>
				</div>
				<div className="p-5 rounded shadow-lg" style={{ backgroundColor: "#ffffff" }}>

					{/* NOMBRE */}
					<div className="mb-4">
						<label className="form-label">Nombre</label>
						<input
							type="text"
							className="form-control"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							required
						/>
					</div>

					{/* APELLIDOS */}
					<div className="mb-4">
						<label className="form-label">Apellidos</label>
						<input
							type="text"
							className="form-control"
							value={apellidos}
							onChange={(e) => setApellidos(e.target.value)}
							required
						/>
					</div>

					{/* USUARIO */}
					<div className="mb-4">
						<label className="form-label">Nombre de Usuario</label>
						<input
							type="text"
							className="form-control"
							value={usuario}
							onChange={(e) => setUsuario(e.target.value)}
							required
						/>
					</div>

					{/* EMAIL */}
					<div className="mb-4">
						<label className="form-label">Email</label>
						<input
							type="email"
							className="form-control"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					{/* PASSWORD */}
					<div className="mb-3">
						<label className="form-label">Contraseña</label>
						<input
							type="password"
							className="form-control"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>


					<div className="mb-4">
						<label className="form-label"></label>
						<select
							value={pais}
							className="form-select mb-4"
							onChange={(e) => setPais(e.target.value)}
						>
							<option value="" disabled>
								Selecciona tu país
							</option>
							<option value="Alemania">Alemania</option>
							<option value="Austria">Austria</option>
							<option value="Bélgica">Bélgica</option>
							<option value="Chipre">Chipre</option>
							<option value="Croacia">Croacia</option>
							<option value="Eslovaquia">Eslovaquia</option>
							<option value="Eslovenia">Eslovenia</option>
							<option value="España">España</option>
							<option value="Estonia">Estonia</option>
							<option value="Finlandia">Finlandia</option>
							<option value="Francia">Francia</option>
							<option value="Grecia">Grecia</option>
							<option value="Irlanda">Irlanda</option>
							<option value="Italia">Italia</option>
							<option value="Letonia">Letonia</option>
							<option value="Lituania">Lituania</option>
							<option value="Luxemburgo">Luxemburgo</option>
							<option value="Malta">Malta</option>
							<option value="Países Bajos">Países Bajos</option>
							<option value="Portugal">Portugal</option>
						</select>
					</div>

					{/* CONTACTO */}
					<div className="mb-4">
						<label className="form-label">Contacto</label>
						<div className="d-flex gap-2">
							<select
								className="form-select text-secondary"
								style={{ width: "30%" }}
								onChange={(e) => setPrefijo(e.target.value)}
								required
							>
								<option value="" disabled selected>
									+
								</option>
								<option value="+43">(+43) Austria</option>
								<option value="+32">(+32) Bélgica</option>
								<option value="+357">(+357) Chipre</option>
								<option value="+385">(+385) Croacia</option>
								<option value="+421">(+421) Eslovaquia</option>
								<option value="+386">(+386) Eslovenia</option>
								<option value="+34">(+34) España</option>
								<option value="+372">(+372) Estonia</option>
								<option value="+358">(+358) Finlandia</option>
								<option value="+33">(+33) Francia</option>
								<option value="+30">(+30) Grecia</option>
								<option value="+353">(+353) Irlanda</option>
								<option value="+39">(+39) Italia</option>
								<option value="+371">(+371) Letonia</option>
								<option value="+370">(+370) Lituania</option>
								<option value="+352">(+352) Luxemburgo</option>
								<option value="+356">(+356) Malta</option>
								<option value="+31">(+31) Países Bajos</option>
								<option value="+351">(+351) Portugal</option>
								<option value="+49">(+49) Alemania</option>
							</select>

							<input
								type="tel"
								className="form-control"
								required
								onChange={(e) => setTelefono(e.target.value)}
								value={telefono}
							/>
						</div>
					</div>

					{/* SITUACIÓN */}
					<div className="mb-4 text-center">
						<label className="form-label">Cuéntame algo sobre ti</label>
						<div className="mb-4 d-flex justify-content-center">
							<button
								type="button"
								className="btn me-2"
								onClick={() => setSituacion("estudiante")}
								style={{
									backgroundColor: situacion === "estudiante" ? "#b7ff00" : "white",
									color: "black",
									border:
										situacion === "estudiante" ? "none" : "2px solid #b7ff00",
								}}
							>
								Soy estudiante
							</button>

							<button
								type="button"
								className="btn"
								onClick={() => setSituacion("trabajador")}
								style={{
									backgroundColor: situacion === "trabajador" ? "#b7ff00" : "white",
									color: "black",
									border:
										situacion === "trabajador" ? "none" : "2px solid #b7ff00",
								}}
							>
								Tengo trabajo
							</button>
						</div>

						{/* SUELDO */}
						<div className="mb-4">
							<label className="form-label">¿Cuánto dispones al mes?</label>
							<input
								type="number"
								className="form-control"
								placeholder="€"
								disabled={situacion !== "estudiante"}
								onChange={(e) => {
									setEstudiante(e.target.value);
									setSueldo(e.target.value);
								}}
								value={estudiante}
							/>
						</div>

						<div className="mb-3">
							<label className="form-label">¿Cuál es tu sueldo neto?</label>
							<input
								type="number"
								className="form-control"
								placeholder="€"
								disabled={situacion !== "trabajador"}
								onChange={(e) => {
									setTrabajador(e.target.value);
									setSueldo(e.target.value)
								}}

								value={trabajador}
							/>
						</div>
					</div>

					{/* AHORRO */}
					<div className="mb-4">
						{sueldo && !isNaN(parseFloat(sueldo)) && (
							<div className="alert" style={{ backgroundColor: "#b7ff00" }}>
								💰 Deberías ahorrar mensualmente:{" "}
								<strong>{calcularAhorro()} €</strong> (20%)
							</div>
						)}
					</div>

					{/* BOTÓN */}
					<div className="mb-3 d-flex justify-content-center">
						<button
							type="submit"
							className="btn btn-primary"
							style={{
								backgroundColor: "#b7ff00",
								color: "black",
								border: "1px solid #b7ff00",
							}}
						>
							Send
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};