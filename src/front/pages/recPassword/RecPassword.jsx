import './recpassword.css'
import { useParams } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { useState } from "react";



export const RecPassword = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [email, setEmail] = useState("")

  const restaurarPassword = async (e) => {
    e.preventDefault()
    await fetch(`${backendUrl}api/user/resetPassword`, {
      method: "POST",
      body: JSON.stringify({ "email": email }),
      headers: { "Content-type": "application/json" }
    })
    alert("Mensaje enviado al correo electronico")

  }


  return (
    <div className="recpassword-bg min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="recpasswordt-bg sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Recuperar contraseña</h2>
        <p className="mt-2 text-center text-sm font-bold text-gray-900">
          Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
        </p>
      </div>

      <div className="mt-8 transparent-form sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" py-8 px-4 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={restaurarPassword}>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-900">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Enviar enlace de recuperación
              </button>
            </div>

            <div className="text-center">
              <a href="#" className="text-sm font-bold text-blue-900 hover:text-blue-700 transition-colors duration-200">
                ← Volver al inicio de sesión
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>


  )
}