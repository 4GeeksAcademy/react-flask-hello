import { useEffect, useState } from "react";

export const AdminProfesores = () => {
    const [showTable, setShowTable] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const handleAsistencia = (teacherId) => {
        if (selectedTeacher === teacherId) {
            setSelectedTeacher(null);
            setShowTable(false);
        } else {
            setSelectedTeacher(teacherId);
            setShowTable(true);
        }
    };

    return (
        <div className="container-fliud table-responsive px-4 my-5">
            <div className="row">
                <div className="col-7">
                    <table className="table table-striped table-bordered text-center">
                        <thead className="table-light">
                            <tr>
                                <th scope="col admin-num">Código</th>
                                <th scope="col admin-lastname">Apellidos</th>
                                <th scope="col admin-firstname">Nombres</th>
                                <th scope="col admin-materia">Materia</th>
                                <th scope="col admin-assis-but"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1234</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>Matemática</td>
                                <td>
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${selectedTeacher === 1234 ? 'btn-primary' : 'btn-success'}`}
                                        onClick={() => handleAsistencia(1234)}
                                    >
                                        <i className={`ri-eye${selectedTeacher === 1234 ? '-off' : ''}-line`}></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>5678</td>
                                <td>Alejandro</td>
                                <td>Guzmán</td>
                                <td>Historia</td>
                                <td>
                                    <button
                                        type="button"
                                        className={`btn btn-sm ${selectedTeacher === 5678 ? 'btn-primary' : 'btn-success'}`}
                                        onClick={() => handleAsistencia(5678)}
                                    >
                                        <i className={`ri-eye${selectedTeacher === 5678 ? '-off' : ''}-line`}></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {showTable && (
                    <div className="col-5">
                        <div className="col-3">
                            <select className="form-select" aria-label="Selecciona una opción">
                                <option value="">Selecciona Periodo</option>
                                <option value="1">Primer periodo</option>
                                <option value="2">Segundo periodo</option>
                                <option value="3">Tercero periodo</option>
                                <option value="4">Cuarto periodo</option>
                            </select>
                        </div>
                        <div className="w-100">
                            <table className="table table-striped table-bordered text-center mt-3">
                                <thead className="table-ligth">
                                    <tr>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Asistencia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{new Date().toLocaleDateString()}</td>
                                        <td>
                                            <div className="d-flex justify-content-around">
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="asistencia"
                                                        id="asistio"
                                                        disabled
                                                    />
                                                    <label className="form-check-label" htmlFor="asistio">
                                                        Asistió
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="asistencia"
                                                        id="falto"
                                                        disabled
                                                    />
                                                    <label className="form-check-label" htmlFor="falto">
                                                        Faltó
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="asistencia"
                                                        id="noregistrado"
                                                        defaultChecked
                                                        disabled
                                                    />
                                                    <label className="form-check-label" htmlFor="noregistrado">
                                                        No registrado
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};