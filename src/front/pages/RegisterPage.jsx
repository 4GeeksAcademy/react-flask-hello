import { Link } from "react-router-dom"
import  Register  from "../pages/Register.jsx"

const RegisterPage = () => {


    return (
        <>
            <Register />
            <Link to='/login'>Registered?</Link>
        </>
    )
} 

export default RegisterPage;
