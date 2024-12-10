import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundForViews from "../../img/background.jpg";
import imgWelcome from "../../img/wellcomeicon.png"
import "../../styles/components.css";
import Swal from 'sweetalert2';

const FormCommon = ({ type }) => {
    const { store, actions } = useContext(Context)
    const [startDate, setStartDate] = useState(new Date());
    const [formBody, setFormBody] = useState({
        name: '',
        description: '',
        date: '',
        status: '',
        grade: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormBody(prevState => ({ ...prevState, [name]: value }));
    };

    const handleDateChange = (date) => {
        setStartDate(date);
        setFormBody(prevState => ({ ...prevState, date: date ? date.toISOString().split('T')[0] : '' }));
    };

    const submitFormData = async (event) => {
        event.preventDefault();

        try {
            if (type === 'crear') {
                await actions.testsOperations('POST', {
                    nombre: formBody.name,
                    descripcion: formBody.description,
                    fecha: formBody.date,
                    finalizada: formBody.status === 'finalizada'
                })
            }
            Swal.fire({
                title: "Datos registrados correctamente",
                icon: "success"
            });
            setFormBody({
                name: '',
                description: '',
                date: '',
                status: '',
                grade: ''
            });
            setStartDate(new Date());
        } catch (error) {
            console.error("Error submitting data", error)
            Swal.fire({
                title: "Error al registrar los datos",
                icon: "error"
            });
        }
    };

    return (
        <div className="container ms-2">

            <form onSubmit={(e) => submitFormData(e)} className="container-welcome-teacher">
                <h4 className="text-title d-flex justify-content-center mb-4">{`${type === 'crear' ? 'Crear' : 'Calificar'} evaluación`}</h4>
                {type === 'crear' && <div className="mb-3">
                    <label className="form-label text-form">Nombre:</label>
                    <input type="text" name="name" className="form-control rounded-pill" required value={formBody.name} onChange={handleChange} />
                </div>}
                {type === 'crear' && (
                    <div className="mb-3">
                        <label className="form-label text-form">Descripción:</label>
                        <textarea type="text" name="description" className="form-control rounded-pill" required value={formBody.description} onChange={handleChange}></textarea>

                    </div>
                )}
                {type === 'crear' && <div className="mb-3">
                    <label className="form-label text-form">Fecha de evaluación:</label> <br></br>
                    <DatePicker selected={startDate} onChange={handleDateChange} dateFormat="yyyy/MM/dd" className="form-control rounded-pill" required />
                </div>}

                {type === 'crear' && (
                    <div className="mb-3">
                        <label className="form-label text-form me-3">Estado:</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="active" value="pendiente" onChange={handleChange} />
                            <label className="form-check-label text-form" htmlFor="active">Pendiente</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="finished" value="finalizada" onChange={handleChange} />
                            <label className="form-check-label text-form" htmlFor="finished">Finalizada</label>
                        </div>
                    </div>
                )}
                <div className="d-flex">
                    {type === 'calificar' && (
                        <div className="mb-3 me-5">
                            <label className="form-label text-form">Elige un grado:</label> <br></br>
                            <div className="input-group" onChange={handleChange}>
                                <select className="custom-select rounded-pill" id="inputGroupSelect04">
                                    <option selected>Grado...</option>
                                    <option value="1">1er Grado</option>
                                    <option value="2">2do Grado</option>
                                    <option value="3">3er Grado</option>
                                </select>
                            </div>
                        </div>
                    )}
                    {type === 'calificar' && (
                        <div className="mb-3">
                            <label className="form-label text-form">Selecciona una evaluación:</label> <br></br>
                            <div className="input-group" onChange={handleChange}>
                                <select className="custom-select rounded-pill" id="inputGroupSelect04">
                                    <option selected>Pendientes...</option>
                                    <option value="1">Evaluación preparatoria</option>
                                    <option value="2">Evaluación Lenguaje</option>
                                    <option value="3">Evaluación Matemáticas</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
                {type === 'calificar' && (
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Calificación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John</td>
                                <td>Doe</td>
                                <td>
                                    <input type="number" name="grade" className="form-control" required value={formBody.grade} onChange={(e) => handleChange(e)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}

                <button type="submit" className="btn btn-outline-register">Registrar</button>
            </form>
        </div>
    );
};

export const LeftMenuTeacher = () => {
    const [activeContent, setActiveContent] = useState(null);

    const handleCreateEvaluation = () => {
        setActiveContent("crear");
    };

    const handleGradeEvaluation = () => {
        setActiveContent("calificar");
    };

    const renderContent = () => {
        switch (activeContent) {
            case "crear":
                return <FormCommon type="crear" />;
            case "calificar":
                return <FormCommon type="calificar" />;
            default:
                return (
                    <div className="container-fluid container-welcome-parent mt-5">
                        <div className="container-welcome-teacher py-5 d-flex">
                            <img src={imgWelcome} alt="welcome image" className="welcome-icon" />
                            <div>
                                <h1 className="text-title display-4">¡Siempre es un gusto tenerte de vuelta!</h1>
                                <p className="lead text-content">Recuerda usar el menú de la izquierda para ingresar o editar la información de los estudiantes.</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="mt-0">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 left-menu-background rounded-start">
                    <div className="d-flex flex-column align-items-center align-items-sm-start mt-5 px-3 pt-4 text-white min-vh-100">
                        <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline ">Menú</span>
                        </Link>
                        <ul className="nav nav-pills list-group flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li >
                                <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-card-checklist"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Evaluaciones</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <i className="fs-4 bi-file-earmark-plus"></i>
                                            <span className="ms-2 d-none d-sm-inline list-menu-item" onClick={handleCreateEvaluation}>Crear</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <i className="fs-4 bi-file-earmark-check"></i>
                                            <span className="ms-2 d-none d-sm-inline list-menu-item" onClick={handleGradeEvaluation}>Calificar</span>
                                        </Link>
                                    </li>
                                </ul>

                            </li>
                            <li>
                                <Link to="#submenuEditar" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-pen"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Editar</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-calendar2-date"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Eventos</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="ms-2 d-none d-sm-inline list-menu-item">Reuniones</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <span className="ms-2 d-none d-sm-inline list-menu-item">Salidas</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-chat-left-text"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Comunicados</span>
                                </Link>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
                <div className="d-flex justify-content-center render-content col mt-3 py-3"
                    style={{ backgroundImage: `url(${backgroundForViews})` }}>
                    <div className="welcome-message mt-5">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

