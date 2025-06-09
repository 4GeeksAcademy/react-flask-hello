import { useState } from "react"
import { useFormStatus } from "react-dom"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import axios from "axios"


export const ResetPassword = () => {

    const URLBACK = import.meta.env.VITE_BACKEND_URL
    const { token } = useParams()
    const [password, setPassword] = useState("")
    const [text, setText] = useState("")
    const navigate = useNavigate()

    const handleReset = async (e) => {
        e.preventDefault()

        try {
            const resp = await axios.post(`${URLBACK}/api/reset-password/${token}`, { new_password: password})
            console.log(resp.data)
            setText(resp.data.success || resp.data.message)
            setTimeout(() => navigate('/login'), 3000)
        }
        catch (error) {
            console.error(error)
            setText("Invalid or expired token.")
        }
    }

    return (
        <div>
            <h2>Ingrese su nueva contraseña</h2>
            <form onSubmit={handleReset}>
                <input type="password"
                className="form-control mb-3"
                placeholder="New password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required  />
                <button type="submit" className="btn btn-success">Reset password</button>
            </form>
            {text && <div className="alert alert-info mt-3">{text}</div>}
        </div>
    )
}