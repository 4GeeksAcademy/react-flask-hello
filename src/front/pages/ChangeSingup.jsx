import { Link } from "react-router-dom";
import studentImg from "../assets/img/students.png";
import teacherImg from "../assets/img/teacher.png";

export const Signup = () => {
    return (
        <div className="background-container">
            <div className="login-signup-form position-absolute top-50 start-50 translate-middle border rounded-3 p-3 p-md-4">
                <div className="text-center">
                    <h1 className="mb-3">¿Quién eres?</h1>
                    <p className="h5 mb-4 text-secondary">Para comenzar tu registro, elige una opción:</p>
                    <div className="d-flex flex-column flex-md-row justify-content-center gap-4">
                        <Link to='/signup/alumno' className="user-option border border-2 colorBorderSignup rounded-4 p-3 text-center text-black text-decoration-none shadow-sm bg-white">
                            <img src={studentImg} alt="Icono de estudiante" className="imgUserWidth mb-2" />
                            <p className="h4 mb-0">Soy alumno</p>
                        </Link>
                        <Link to='/signup/profesor' className="user-option border border-2 colorBorderSignup rounded-4 p-3 text-center text-black text-decoration-none shadow-sm bg-white">
                            <img src={teacherImg} alt="Icono de profesor" className="imgUserWidth mb-2" />
                            <p className="h4 mb-0">Soy profesor</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}