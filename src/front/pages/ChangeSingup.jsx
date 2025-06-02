
import { Link } from "react-router-dom";

import studentImg from "../assets/img/students.png";
import teacherImg from "../assets/img/teacher.png";

export const Signup = () => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            <p className="h1 mb-4">¿Quién eres?</p>
            <p className="h3 mb-5">Para comenzar tu registro, elige una opción:</p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 w-100">
                <Link to='/signup/alumno' className="border border-2 colorBorderSignup rounded-4 py-4 px-4 gap-2 d-flex flex-column align-items-center text-black text-decoration-none shadow-sm bg-white">
                    <img src={studentImg} alt="" className="imgUserWidth" />
                    <p className="h4">Soy alumno</p>
                </Link>
                <Link to='/signup/profesor' className="border border-2 colorBorderSignup rounded-4 py-4 px-4 gap-2 d-flex flex-column align-items-center text-black text-decoration-none shadow-sm bg-white">
                    <img src={teacherImg} alt="" className="imgUserWidth" />
                    <p className="h4">Soy profesor</p>
                </Link>
            </div>
        </div>
    )
}