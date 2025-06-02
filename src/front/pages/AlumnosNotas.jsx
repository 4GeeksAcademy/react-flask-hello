export const AlumnosNotas = () => {
    return (
        <div className="container table-responsive">
            <div className="row">
                <div className="col-2">
                    <select className="form-select" aria-label="Selecciona una opción">
                        <option value="">Selecciona Materia</option>
                        <option value="1">Matemática</option>
                        <option value="2">Historia</option>
                        <option value="3">Religión</option>
                        <option value="4">Educación Física</option>
                    </select>
                </div>
                <div className="col-2">
                    <select className="form-select" aria-label="Selecciona una opción">
                        <option value="">Selecciona Periodo</option>
                        <option value="1">Primer Bimestre</option>
                        <option value="2">Segundo Bimestre</option>
                        <option value="3">Tercero  Bimestre</option>
                        <option value="4">Cuarto  Bimestre</option>
                    </select>
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-success px-4">Buscar</button>
                </div>
                <table className="col-12 table table-striped table-bordered text-center mt-5">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Participación en Clase (15%)</th>
                            <th scope="col">Tareas (20%)</th>
                            <th scope="col">Exámen Parcial (30%)</th>
                            <th scope="col">Exámen Final (35%)</th>
                            <th scope="col">Promedio Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};