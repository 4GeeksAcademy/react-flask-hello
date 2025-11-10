import React from "react";
import { FaLaptopCode, FaBrain, FaDatabase, FaPalette, FaShieldAlt } from "react-icons/fa";

const TechFocus = () => {
    return (
        <div className="cards-tech container mt-5 bg-light py-5 rounded-4">
            <div className="row"> 
            <div className="col-sm-12 col-md-12 col-lg-12 ms-2">
                <h1 className="text-center mb-4">Especializados en el sector tecnológico</h1>
                <p className="text-center mb-5 mx-2 lead"> En MentorMatch conectamos a estudiantes y mentores apasionados por la tecnología. Aprende las habilidades más demandadas del mundo digital y acelera tu carrera profesional. </p>
            </div>
                <div className="row justify-content-center">
                    <div className="card p-5 ms-4 col-sm-12 col-md-6 col-lg-4">
                        <FaLaptopCode size={110} className="icon-card m-3 " />
                        <div className="body-card">
                            <h5 className="text-card ">Desarrollo Web</h5>
                        </div>
                    </div>
                    <div className="card p-5 ms-4 col-sm-12 col-md-6 col-lg-4">
                        <FaPalette size={110} className="icon-card m-3 " />
                        <div className="body-card">
                            <h5 className="text-card">Diseño UX/UI</h5>
                        </div>
                    </div>
                    <div className="card p-5 ms-4 col-sm-12 col-md-6 col-lg-4">
                        <FaBrain size={110} className="icon-card m-3 text-center " />
                        <div className="body-card text-center">
                            <h5 className="text-card ">Inteligencia Artificial</h5>
                        </div>
                    </div>
                    <div className="card p-5 ms-4 col-sm-12 col-md-6 col-lg-4">
                        <FaShieldAlt size={110} className="icon-card m-3 " />
                        <div className="body-card">
                            <h5 className="text-card">Ciberseguridad</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TechFocus;