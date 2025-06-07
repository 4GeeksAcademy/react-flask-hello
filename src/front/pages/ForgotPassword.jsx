import axios from "axios"
import { useState } from "react"

export const ForgotPassword = () => {

    const URLBACK = import.meta.env.VITE_BACKEND_URL
    const [email, setEmail] = useState("")
    const [text, setText] = useState("")

    const handledSubmit = async (e) => {
        e.preventDefault()

        try {
            const resp = await axios.post(`${URLBACK}api/forgot-password`, { email })
            console.log(resp.data)
            alert('Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico')
            setText(resp.data.message)
        }
        catch (error) {
            console.error(error)
            setText('An error occurred while sending the email')
        }

    }

    return (
        <div>
            <h2></h2>
            <form onSubmit={handledSubmit}>
                <input type="email"
                    className="form-control mb-3"
                    placeholder="enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())} required />
                <button type="submit" className="btn btn-primary">Send link</button>
            </form>
            {text && <div className="mt-3 alert alert-info">{text}</div>}
        </div>
    )
}