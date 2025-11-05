import { useState } from "react"
import userServices from "../services/userServices"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";



const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [formData, setFormData] = useState({
        email: "",
        password: ""

    })
    const { store, dispatch } = useGlobalReducer()
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        userServices.login(formData).then(async data => {


            if (data.success) {
                localStorage.setItem("user", JSON.stringify({
                    'id': data.user.id,
                    'token': data.token,
                    'email': data.user.email,
                    'role': data.user.role,
                    'avatarUrl': data.user.profile ? data.user.profile.avatar : " "

                }))



                const userRole = data.user.role

                dispatch({ type: 'logged_in' })
                const dataUser = { ...data.user, avatarUrl: data.user.profile ? data.user.profile.avatar : " " }
                dispatch({ type: 'save_user', payload: dataUser })
                // dispatch({ type: 'add_avatar', payload: infoMentor.avatar })



                navigate(`/dashboard/${userRole}`)
            } else {
                setError(data.data)
            }
        })
    }





    return (
        <div className="container justify-items-center w-50 my-5">
            <h1 className="text-center">Login <br /> <span className="span-text">MentorMatch</span></h1>
            <div className="d-flex justify-content-center" >
                <img src="src/front/assets/img/MM-2.png" alt="Hero Illustration" className="logo-image"></img>
            </div>
            <div className="d-flex justify-content-center">
                <form className="form-style p-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                            className="form-control form-input"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            required
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                            className="form-control form-input"
                            id="exampleInputPassword1"
                            required
                        ></input>
                    </div>
                    <div className="d-flex justify-content-center my-2" >
                        <button type="submit" className="cta-send">Iniciar Sesion</button>
                    </div>
                    <div className="text-center mt-3">
                        <Link to="/request-password-reset">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <Link to={`/`}>Volver a inicio</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;