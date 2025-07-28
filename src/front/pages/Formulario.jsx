import React, { useState,useEffect } from "react";
/* import '@fontsource/bebas-neue'; */
/* import { useNavigate } from "react-router-dom"; */

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

	const calcularAhorro = () => {
		const valor = parseFloat(sueldo);
		if (isNaN(valor)) return 0;
		return (valor * 0.2).toFixed(2);
	};
	/* const navigate = useNavigate(); */
	const situacionBoolean = ()=> {
		if (situacion === "estudiante") {
			return true;
		} else if (situacion === "trabajador") {
			return false;
		}
		return null;
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/user/register", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: usuario,
					email: email,
					password: password,
					firstname: nombre,
					lastname: apellidos,
					country: pais,
					phone: prefijo+telefono,
					sueldo: sueldo, // Asegúrate de definir y capturar este estado en tu formulario
					is_student: situacionBoolean(),
				}),
			});

			const data = await response.json();

			if (response.status === 201) {// Si la respuesta es 201, el usuario se registró correctamente
				alert("Usuario registrado con éxito ✅");
				localStorage.setItem('token', data.token); // Guardamos el token en localStorage
				setTimeout(() => {
					window.location.href = '/'; // Redirige al usuario a la página de login
				}, 1000); // Espera 1 segundo antes de redirigir
			} else if (response.status >= 400) {// Si la respuesta es un error, mostramos el mensaje
				alert("Error: " + data.msg);
			}
		} catch (error) {
			console.error("Error al enviar el formulario:", error);
			alert("Error al enviar el formulario ❌");
		}
	};
	/* const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			
			await axios.post("http://localhost:5000/api/user/register", {
			username: usuario,
			email: email,
			password: password,
		});
		alert("Usuario registrado con éxito ✅");
		navigate("/main");
		} catch (error) {
			console.error("Error al enviar el formulario:", error);
			alert("Error al enviar el formulario ❌");
		}
	}; */

	return (
		<div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#ffffff", minHeight: "80vh" }}>
			<form className="w-100" style={{ maxWidth: "600px", margin: "1vh" }} onSubmit={handleSubmit} >
				<div className="text-center" style={{ fontFamily: "/* 'Bebas Neue', */ sans-serif" }}><h1>Formulario</h1></div>
				<div className="p-5 rounded shadow-lg" style={{ backgroundColor: "#ffffff" }}>
					<div className="mb-4">
						<label className="form-label">Nombre</label>
						<input type="text" className="form-control" id="name" value={nombre} onChange={(e) => setNombre(e.target.value)} />
					</div>

					<div className="mb-4">
						<label className="form-label">Apellidos</label>
						<input type="text" className="form-control" id="lastName" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
					</div>

					<div className="mb-4">
						<label className="form-label">Nombre de Usuario</label>
						<input type="text" className="form-control" id="userName" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
					</div>

					<div className="mb-4">
						<label className="form-label">Email</label>
						<input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
					</div>

					<div className="mb-3">
						<label className="form-label">Contraseña</label>
						<input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
					</div>

					<div className="mb-4">
						<label className="form-label"></label>
						<select className="form-select mb-4" onChange={(e) => setPais(e.target.value)} required>
							<option disabled selected>Donde vives?</option>
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

					<div className="mb-4">
						<label className="form-label">Contacto</label>
						<div className="d-flex gap-2">
							<select className="form-select text-secondary" style={{ width: '30%' }} onChange={(e) => setPrefijo(e.target.value)} required>
								<option value="" disabled selected>+</option>
								<option value="+34">(+34)</option>
								<option value="+49">(+49)</option>
								<option value="+32">(+32)</option>
								<option value="+385">(+385)</option>
								<option value="+357">(+357)</option>
								<option value="+421">(+421)</option>
								<option value="+386">(+386)</option>
								<option value="+33">(+33)</option>
								<option value="+30">(+30)</option>
								<option value="+353">(+353)</option>
								<option value="+39">(+39)</option>
								<option value="+371">(+371)</option>
								<option value="+370">(+370)</option>
								<option value="+352">(+352)</option>
								<option value="+356">(+356)</option>
								<option value="+31">(+31)</option>
								<option value="+351">(+351)</option>
								<option value="+358">(+358)</option>
								<option value="+43">(+43)</option>
								<option value="+372">(+372)</option>
							</select>
							<input type="tel" className="form-control" required onChange={(e) => setTelefono(e.target.value)} />
						</div>
					</div>

					<div className="mb-4 text-center">
					<label className="form-label">Cuéntame algo sobre ti</label>
					<div className="mb-4 d-flex justify-content-center">
						
						<button type="button" className="btn me-2" onClick={() => setSituacion("estudiante")}
						style={{
							backgroundColor: situacion === "estudiante" ? "#b7ff00" : "white",
							color: "black",
							border: situacion === "estudiante" ? "none" : "2px solid #b7ff00",
						}}
						>Soy estudiante
						</button>
						
						<button type="button" className="btn" onClick={() => setSituacion("trabajador")}
						style={{
							backgroundColor: situacion === "trabajador" ? "#b7ff00" : "white",
							color: "black",
							border: situacion === "trabajador" ? "none" : "2px solid #b7ff00",
						}}
						>Tengo trabajo
						</button>
					</div>

						<div className="mb-4">
							<label className="form-label">¿Cuánto dispones al mes?</label>
							<input type="number" className="form-control" placeholder="€" disabled={situacion !== "estudiante"} onChange={(e) => setSueldo(e.target.value)} />
						</div>

						<div className="mb-3">
							<label className="form-label">¿Cuál es tu sueldo neto?</label>
							<input type="number" className="form-control" placeholder="€" disabled={situacion !== "trabajador"} onChange={(e) => setSueldo(e.target.value)} />
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

export default function Footer() {
  const frases = [
    "Ahorra hoy para invertir mañana 💰",
    "La constancia vence al interés compuesto 📈",
    "Invierte en conocimiento antes que en activos 📚",
    "Cada euro cuenta, cada decisión importa 💡"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % frases.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className="w-full p-4 text-center"
      style={{
        backgroundColor: "#b7ff00",
        color: "black",
        borderTop: "2px solid #b7ff00"
      }}
    >
      <p className="text-lg font-medium transition-opacity duration-500">
        {frases[index]}
      </p>
    </footer>
  );
}


