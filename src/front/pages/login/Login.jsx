import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Login = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login_user = async (e) => {
        e.preventDefault()

        const body = await fetch(`${backendUrl}api/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        if (!body.ok) throw Error("There was a problem in the login request")

        if (body.status === 401) {
            throw ("Invalid credentials")
        }
        else if (body.status === 400) {
            throw ("Invalid email or password format")
        }
        const data = await body.json();
        console.log(data.user)
        localStorage.setItem("jwt-token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Sesion iniciada correctamente");
        navigate("/")
        return data
    }





    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>

                </div>
                <form className="mt-8 space-y-6" onSubmit={login_user}>
                    <div className="space-y-4">

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="tu@email.com"


                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Mínimo 8 caracteres"
                                minLength={8}

                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            Inicia sesión
                        </button>
                    </div>
                    <div className="text-center">

                        <Link to="/Register">
                            <p className="text-sm text-gray-600">¿No tienes cuenta? Registrate ya



                            </p>

                        </Link>


                    </div>
                </form>
            </div>
        </div>
    )
}