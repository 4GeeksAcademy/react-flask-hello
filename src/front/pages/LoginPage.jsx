import { Link } from "react-router-dom"
import  Login  from "../pages/Login.jsx"

const LoginPage = () => {

    return (
        <>
        <Login/>
        <Link to='/register'>Need an account?</Link>
        </>
    )
}
export default LoginPage;