import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const ProfesoresProfile = () => {
    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-5 mb-4 mb-md-0 d-flex flex-column justify-content-center align-items-center">
                    <h2 className="mb-4 text-center"> Bienvenido José Alejandro</h2>
                    <img src={rigoImageUrl} className="img-profile rounded-circle shadow img-thumbnail object-fit-cover" alt="" />
                </div>
                <div className="col-12 col-md-6 col-lg-5">
                    <h5 className="fw-bold mb-3">Información básica</h5>
                    <ul className="list-group">
                        <li className="list-group-item"><div className="fw-bold">Apellidos:</div>Guzmán Mendoza</li>
                        <li className="list-group-item"><div className="fw-bold">Nombres:</div>José Alejandro</li>
                        <li className="list-group-item"><div className="fw-bold">ID:</div>p987654321</li>
                        <li className="list-group-item"><div className="fw-bold">Correo:</div>alejandroguzman@correo.com</li>
                        <li className="list-group-item"><div className="fw-bold">Teléfono:</div>987654321</li>
                        <li className="list-group-item"><div className="fw-bold">Materia:</div>Matemática</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};