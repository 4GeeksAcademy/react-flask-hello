import './register.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [is_admin, setIs_admin] = useState("")
     const navigate = useNavigate();

    const registerUser = async (e) => {

        try {
            e.preventDefault()

            let new_user = {
                "username": name,
                "email": email,
                "password": password,
                "is_admin": is_admin
            }

            await fetch(`${backendUrl}api/user/register`, {
                method: "POST",
                body: JSON.stringify(new_user),
                headers: { "Content-type": "application/json" }
            })
            alert("Usuario registrado correctamente")
            navigate("/Login")
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
       <div className="register-bg min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-md w-full transparent-form space-y-8 bg-gray-200 p-6 rounded-md">
                
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Crear cuenta</h2>
                    <p className="mt-2 text-center text-sm font-extrabold text-gray-900">Completa los campos para registrarte</p>
                </div>
                <form className="mt-8 space-y-6 " onSubmit={registerUser}>
                    <div className="space-y-4">
                       
                        <div>
                            <label htmlFor="name" className="block text-sm font-extrabold text-gray-900">
                                Nombre completo
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Tu nombre completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-extrabold text-gray-900">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-extrabold text-gray-900">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Mínimo 8 caracteres"
                                minLength={8}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            Registrarse
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-bold text-gray-800">
                            ¿Ya tienes cuenta?{" "}
                            <a href="#" className="font-bold text-blue-800 hover:text-white">
                                Inicia sesión
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>




    )
}

