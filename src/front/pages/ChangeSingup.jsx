
import { Link } from "react-router-dom";

export const Signup = () => {
    return (
        <div>
            <div className="position-absolute top-50 start-50 translate-middle col-5">
                <div className="text-center mb-5">
                    <h1>Welcome!</h1>
                    <h3>Choise a option to register</h3>
                </div>
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to='/signup/alumno' className="border border-2 colorBorderSignup rounded-4 py-2 px-2 d-flex justify-content-between gap-3 d-flex align-items-center text-black text-decoration-none">
                            <img src="https://www.w3schools.com/w3css/img_avatar3.png" alt="" className="rounded-circle imgUserWidth" />
                            <div className="d-flex flex-column">
                                <h4 className="m-0">Alumno</h4>
                                <p className="m-0">Soy alumno de la institucion</p>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <Link to='/signup/profesor' className="border border-2 colorBorderSignup rounded-4 py-2 px-2 d-flex justify-content-between gap-3 d-flex align-items-center text-black text-decoration-none">
                            <img src="https://www.w3schools.com/w3css/img_avatar3.png" alt="" className="rounded-circle imgUserWidth" />
                            <div className="d-flex flex-column">
                                <h4 className="m-0">Profesor</h4>
                                <p className="m-0">Soy parte del profesorado</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}