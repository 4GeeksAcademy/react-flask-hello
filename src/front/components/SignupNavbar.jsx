import { Link } from "react-router-dom";

export const SignupNavbar = () => {
    return (
        <nav className="navbar navbar-light bg-light d-flex justify-content-between align-items-center gap-3 px-5">
            <div className='d-flex align-items-center'>
                <Link to="/" className="navbar-brand fs-2 h1">
                    αlpha
                </Link>
            </div>
            <div className='d-flex align-items-center'>
                <Link to='/' className=' signup-login-button text-decoration-none fw-semibold btn btn-dark rounded-5 '>
                    Login
                </Link>
            </div>
        </nav>
    )
}