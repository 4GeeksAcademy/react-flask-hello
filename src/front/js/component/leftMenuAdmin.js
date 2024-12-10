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
    const [photoPreview, setPhotoPreview] = useState(null)
    const [formBody, setFormBody] = useState({
        name: '',
        lastName: '',
        birthDate: '',
        email: '',
        password: '',
        address: '',
        description: '',
        photo: null,
        classroomName: '',
        subjectName: '',
        subjectDescription: ''
    });

    useEffect(() => {
        if (type === 'addSubject') {
            actions.getCourses();
        }
        if (type === 'assignSubject') {
            actions.setSubjects();
            actions.getTeachers();
        }
    }, [type]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormBody(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUploadPhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormBody(prevState => ({ ...prevState, photo: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submitFormData = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        //console.log(formData)
        try {
            if (type === 'student') {
                await actions.studentsOperations('POST', {
                    "nombre": formBody.name,
                    "apellido": formBody.lastName,
                    "direccion": formBody.address,
                    "fecha_nacimiento": formBody.birthDate,
                })
            }
            if (type === 'teacher') {
                await actions.postTeacher({
                    "nombre": formBody.name,
                    "apellido": formBody.lastName,
                    "email": formBody.email,
                    "password": formBody.password,
                    "descripcion": formBody.description,
                    "direccion": formBody.address,
                    "foto": "abc"
                });
            }
            if (type === 'addClassroom') {
                let classroom = formBody.classroomName
                await actions.postCourse({ "nombre": classroom });
            }
            if (type === 'addSubject') {
                await actions.subjectsOperations('POST', { nombre: formBody.subjectName, "grado_id": formBody.grado_id, descripcion: formBody.subjectDescription })
            }
            if (type == 'assignSubject') {
                const response = await actions.fetchRoute("docentes/materias", {
                    method: "POST",
                    body: { "id_docente": formBody.id_docente, "id_materia": formBody.id_materia },
                    isPrivate: true,
                    bluePrint: 'admin'
                })
            }
            Swal.fire({
                title: "Datos registrados correctamente",
                icon: "success"
            });
            setFormBody({
                name: '',
                lastName: '',
                birthDate: '',
                email: '',
                password: '',
                address: '',
                description: '',
                photo: null,
                classroomName: '',
                subjectName: '',
                subjectDescription: ''
            });
            setPhotoPreview(null);

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
                <h4 className="text-title d-flex justify-content-center mb-4">{`Registrar ${type === 'student' ? 'estudiante nuevo' : type === 'teacher' ? 'profesor nuevo' : type === 'addClassroom' ? 'grado nuevo' : type === 'addSubject' ? 'materia nueva' : type === 'assignSubject' ? 'asignación de materia' : ''}`}</h4>
                {/* Formulario con elementos comunes para crear profesor y estudiante */}

                {(type === 'student' || type === 'teacher') && <div className="mb-3">
                    <label className="form-label text-form">Nombre:</label>
                    <input type="text" name="name" className="form-control rounded-pill" required value={formBody.name} onChange={handleChange} />
                </div>}
                {(type === 'student' || type === 'teacher') && <div className="mb-3">
                    <label className="form-label text-form">Apellido:</label>
                    <input type="text" name="lastName" className="form-control rounded-pill" required value={formBody.lastName} onChange={handleChange} />
                </div>}
                {(type === 'student' || type === 'teacher') && <div className="mb-3">
                    <label className="form-label text-form">Email:</label>
                    <input type="email" name="email" className="form-control rounded-pill" required value={formBody.email} onChange={handleChange} />
                </div>}
                {type === 'student' && <div className="mb-3">
                    <label className="form-label text-form">Fecha de nacimiento:</label> <br></br>
                    <DatePicker selected={startDate} name="birthDate" onChange={date => setStartDate(date)} dateFormat="yyyy/MM/dd" className="form-control rounded-pill" required />
                </div>}
                {(type === 'student' || type === 'teacher') && <div className="mb-3">
                    <label className="form-label text-form">Dirección:</label>
                    <input type="text" name="address" className="form-control rounded-pill" required value={formBody.address} onChange={handleChange} />
                </div>}

                {/* Elementos específicos del formuario para crear profesor */}

                {type === 'teacher' && (
                    <div className="mb-3">
                        <label className="form-label text-form">Contraseña:</label>
                        <input type="password" name="password" className="form-control rounded-pill" required value={formBody.password} onChange={handleChange} />
                    </div>
                )}
                {type === 'teacher' && (
                    <div className="mb-3">
                        <label className="form-label text-form">Descripción:</label>
                        <textarea name="description" className="form-control teacher-description" rows="3" required value={formBody.description} onChange={handleChange}></textarea>
                    </div>
                )}
                {type === 'teacher' && (
                    <div className="mb-3">
                        <label className="form-label text-form">Subir foto:</label>
                        <input type="file" accept="image/*" className="form-control select-image rounded-pill" onChange={handleUploadPhoto} required />
                        {photoPreview && (
                            <img src={photoPreview} alt="Preview" className="mt-2 teacher-photo" style={{ maxWidth: "30%", height: "auto" }} />
                        )}
                    </div>
                )}

                {/* Vista para editar estudiantes */}

                {type === 'updateStudents' && (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Fecha de nacimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" name="name" className="form-control" required value={formBody.name} onChange={(e) => handleChange(e)} />
                                </td>
                                <td>
                                    <input type="text" name="lastName" className="form-control" required value={formBody.lastName} onChange={(e) => handleChange(e)} />
                                </td>
                                <td>
                                    <input type="text" name="email" className="form-control" required value={formBody.email} onChange={(e) => handleChange(e)} />
                                </td>
                                <td>
                                    <input type="date" name="date" className="form-control" required value={formBody.date} onChange={(e) => handleChange(e)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}


                {/* Vista para editar profesores */}

                {type === 'updateTeachers' && (
                    <table className="table table-hover ">
                        <thead className="table-design">
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Descripción</th>
                                <th>Foto</th>
                            </tr>
                        </thead>
                        <tbody className="table-design">
                            <tr>
                                <td>
                                    <input type="text" name="name" className="form-control" required value={formBody.name} onChange={(e) => handleChange(e)} />
                                </td>
                                <td>
                                    <input type="text" name="lastName" className="form-control" required value={formBody.lastName} onChange={(e) => handleChange(e)} />
                                </td>
                                <td>
                                    <input type="text" name="email" className="form-control" required value={formBody.email} onChange={(e) => handleChange(e)} />
                                </td>
                                <td>
                                    <textarea name="description" className="form-control" rows="3" required value={formBody.description} onChange={(e) => handleChange(e)}></textarea>
                                </td>
                                <td>
                                    <input type="file" accept="image/*" className="form-control select-image" onChange={handleUploadPhoto} required />
                                    {photoPreview && (
                                        <img src={photoPreview} alt="Preview" className="mt-2 teacher-photo" style={{ maxWidth: "30%", height: "auto" }} />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}

                {/* Formulario para añadir grados */}

                {type === "addClassroom" && (
                    <div className="mb-3">
                        <label className="form-label text-title">Ingresa un nombre para crear un nuevo grado:</label>
                        <input type="text" name="classroomName" className="form-control rounded-pill" required value={formBody.classroomName} placeholder="1er Grado..." onChange={(e) => handleChange(e)} />
                    </div>
                )}

                {/* Formulario para añadir materias */}

                {type === "addSubject" && (



                    < div className="mb-3">
                        <label className="form-label text-title">Selecciona el grado al que vas a asignar la materia:</label>
                        <div className="input-group" required>
                            <select className="custom-select rounded-pill" name="grado_id" id="inputGroupSelect04" onChange={handleChange}>
                                <option value="" disabled selected>Opciones...</option>
                                {store.grados.map(grado =>
                                    <option key={grado.id} value={grado.id}>{grado.nombre}</option>

                                )}
                            </select>
                        </div>
                    </div>
                )
                }

                {
                    type === "addSubject" && (
                        <div className="mb-3">
                            <label className="form-label text-title">Ingresa un nombre para crear una nueva materia:</label>
                            <input type="text" name="subjectName" className="form-control rounded-pill" required value={formBody.subjectName} onChange={handleChange} />

                            <label className="form-label text-title mt-3">Ingresa una descripción simple para la materia:</label>
                            <textarea name="subjectDescription" className="form-control teacher-description" rows="5" required value={formBody.subjectDescription} onChange={(e) => handleChange(e)}></textarea>
                        </div>

                    )
                }

                {/* Formulario para asignar materias a profesores */}

                {type === "assignSubject" && (
                    <div className="mb-3 d-flex justify-content-between mb-5">
                        <div className="d-flex flex-column ms-4">
                            <label className="form-label text-title">Selecciona un profesor:</label>
                            <div className="input-group" required>
                                <select name="id_docente" className="custom-select rounded-pill" id="inputGroupSelect04" onChange={handleChange}>
                                    <option value="" disabled selected>Opciones...</option>
                                    {store.profesores.map(profesor =>
                                        <option key={profesor.id} value={profesor.id}>{profesor.nombre + " " + profesor.apellido}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="d-flex flex-column me-4">
                            <label className="form-label text-title">Selecciona una materia:</label>
                            <div className="input-group" required>
                                <select name="id_materia" className="custom-select rounded-pill" id="inputGroupSelect04" onChange={handleChange}>
                                    <option value="" disabled selected>Opciones...</option>
                                    {store.materias.map(materia =>
                                        <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                <div className="d-flex justify-content-center mt-5">
                    <button type="submit" className="btn btn-outline-register">Registrar</button>
                </div>
            </form >
        </div >
    );
};

export const LeftMenuAdmin = () => {
    const [activeContent, setActiveContent] = useState(null);

    const handleStudentRegisterForm = () => {
        setActiveContent("estudiantes");
    };

    const handleTeacherRegisterForm = () => {
        setActiveContent("profesores");
    };

    const handleUpdateStudentForm = () => {
        setActiveContent("updateStudents");
    }

    const handleUpdateTeacherForm = () => {
        setActiveContent("updateTeachers");
    }

    const handleAddClassroomForm = () => {
        setActiveContent("addClassroom");
    };

    const handleAddSubjectForm = () => {
        setActiveContent("addSubject");
    };

    const handleAssignSubjectForm = () => {
        setActiveContent("assignSubject");
    }

    const renderContent = () => {
        switch (activeContent) {
            case "estudiantes":
                return <FormCommon type="student" />;
            case "profesores":
                return <FormCommon type="teacher" />;
            case "updateStudents":
                return <FormCommon type="updateStudents" />;
            case "updateTeachers":
                return <FormCommon type="updateTeachers" />;
            case "addClassroom":
                return <FormCommon type="addClassroom" />;
            case "addSubject":
                return <FormCommon type="addSubject" />;
            case "assignSubject":
                return <FormCommon type="assignSubject" />;
            default:
                return (
                    <div className="container-fluid container-welcome-parent mt-3">
                        <div className="container-welcome-teacher py-5 d-flex">
                            <img src={imgWelcome} alt="welcome image" className="welcome-icon" />
                            <div>
                                <h1 className="text-title display-4">¡Qué bueno verte de regreso!</h1>
                                <p className="lead text-content">Recuerda usar el menú de la izquierda para editar la información de los estudiantes y el profesorado.</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="mt-0">
            <div className="row flex-nowrap " >
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 rounded-start left-menu-background">
                    <div className="d-flex flex-column mt-5 align-items-center align-items-sm-start px-3 pt-4 text-white min-vh-100">
                        <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline ">Menú</span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li>
                                <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-save2"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Crear</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleStudentRegisterForm}>
                                            <i className="fs-4 bi-mortarboard"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2">Estudiantes</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white" onClick={handleTeacherRegisterForm}>
                                            <i className="fs-4 bi-person-add"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2">Profesores</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="#submenuEditar" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-pen"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Editar</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenuEditar" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <i className="fs-4 bi-mortarboard"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2" onClick={handleUpdateStudentForm}>Estudiantes</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <i className="fs-4 bi-person-add"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2" onClick={handleUpdateTeacherForm}>Profesores</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-book"></i>
                                    <span className="ms-1 d-none d-sm-inline list-menu-item">Grados</span>
                                </Link>
                                <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <i className="fs-4 bi-plus-square"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2" onClick={handleAddClassroomForm}>Añadir</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <i className="fs-4 bi-journal-plus"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2" onClick={handleAddSubjectForm}>Materias</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-0 text-white">
                                            <i className="fs-4 bi-pin-angle"></i>
                                            <span className="d-none d-sm-inline list-menu-item ms-2" onClick={handleAssignSubjectForm}>Asignar</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
                <div className="d-flex justify-content-center render-content col mt-3 py-3 "
                    style={{ backgroundImage: `url(${backgroundForViews})`, backgroundSize: "cover" }}>
                    <div className="welcome-message mt-5">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

