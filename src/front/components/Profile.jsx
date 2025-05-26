import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Profile = () => {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                    <h2> Bienvenido José Alejandro</h2>
                    <img src={rigoImageUrl} alt="" />
                </div>
                <div className="col-4 ">
                    <h5 className="fw-bold">Información básica</h5>
                    <ul className="list-group">
                        <li className="list-group-item"><div className="fw-bold">Apellidos:</div>Guzmán Mendoza</li>
                        <li className="list-group-item"><div className="fw-bold">Nombres:</div>José Alejandro</li>
                        <li className="list-group-item"><div className="fw-bold">ID:</div>a987654321</li>
                        <li className="list-group-item"><div className="fw-bold">Correo:</div>alejandroguzman@correo.com</li>
                        <li className="list-group-item"><div className="fw-bold">Teléfono:</div>987654321</li>
                        <li className="list-group-item"><div className="fw-bold">Año:</div>Primero</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};