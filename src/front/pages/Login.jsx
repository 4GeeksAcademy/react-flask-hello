import { useState, useEffect, useReducer, useContext } from "react"
import storeReducer, { initialStore } from "../store";
import { useNavigate } from "react-router-dom"
import { AppContext } from "./Layout"
import yellowLogo from '../assets/img/LogoNavbar.svg'

const adminLogin = async (dispatch, loginData) => {
    const apiUrl = "";
    dispatch({ type: 'ADMIN_LOGIN_START' })
    try {
        const response = await fetch(`${apiUrl}/api/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al loguearse");
        }
        dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: data });
        return data;
    } catch (error) {
        console.error("Error al loguearse:", error);
        dispatch({ type: 'ADMIN_LOGIN_FAILURE', payload: error.message });
        throw error;
    }
}

export const Login = () => {
    const navigate = useNavigate();
    const { setShowNavbar, setShowFooter } = useContext(AppContext)

    const [store, dispatch] = useReducer(storeReducer, initialStore());
    const { loginStatus } = store;

    useEffect(() => {
        if (setShowNavbar || setShowFooter) {
            setShowNavbar(false);
            setShowFooter(false);
        }
        return () => {
            if (setShowNavbar || setShowFooter) {
                setShowNavbar(true);
                setShowFooter(true);
            }
        }
    }, [setShowNavbar, setShowFooter])

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevLoginData => ({ ...prevLoginData, [name]: value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await adminLogin(dispatch, loginData);
            console.log("Successful login", response)
            alert("Successful login!")
            if (response.token) {
                localStorage.setItem('accessToken', response.token);
            }
            setLoginData({
                email: "",
                password: ""
            })
            navigate("/admin")
        } catch (error) {
            console.error("Error de logueo", error)
            alert("Credenciales incorrectas")
        }
    }

    return (
        <div className="container" style={{ height: "100vh" }}>
            <div className="row d-flex flex-column justify-content-center align-items-center px-3 h-100 ">

                <div className="col-12 col-md-6 col-lg-4 text-center mb-5">
                    <img src={yellowLogo} alt="CloudTech Logo" className="w-100 login-logo" />
                </div>

                <div className="col-md-6 col-lg-4">

                    <h1 className="text-center section-title mb-5">Welcome back!</h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label section-title">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                required
                                name="email"
                                value={loginData.email}
                                onChange={handleChange}
                            />
                            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label section-title">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                required
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="ct-btn-outline-accent mt-3 rounded-4" disabled={loginStatus?.status === 'loading'}>
                                {loginStatus?.status === 'loading' ? 'Logueando...' : 'Submit'}
                            </button>
                        </div>
                        {loginStatus?.status === 'error' && (
                            <div className="text-danger text-center mt-3">
                                {loginStatus.error || "Error inesperado."}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}