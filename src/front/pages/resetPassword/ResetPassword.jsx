
import { useState } from "react"
import { useParams } from "react-router-dom"
export const ResetPassword = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [password, setpassword] = useState("")
  const { token } = useParams()
 
  const restaurarPassword = async (e) => {
    e.preventDefault()
    await fetch(`${backendUrl}api/user/newPassword`, {
      method: "POST",
      body: JSON.stringify({ "password": password, "token": token }),
      headers: { "Content-type": "application/json" }
    })

    alert("Mensaje enviado al correo electronico")
  
   
  }
  return (
     <div
      className="min-h-screen bg-[url('https://images2.alphacoders.com/105/thumb-1920-1052293.jpg')] bg-cover bg-center flex items-center justify-center"
    >
  
    <div class="max-w-md mx-auto p-4 md:p-6 mt-20 mb-20 bg-white rounded shadow-md">
      <h2 class="text-2xl font-bold mb-4">Nueva contraseña</h2>
      <form onSubmit={restaurarPassword}>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Nueva contraseña
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Ingrese su nueva contraseña"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Guardar nueva contraseña
          </button>
        </div>
      </form>
    </div>
  </div >  
  )
}