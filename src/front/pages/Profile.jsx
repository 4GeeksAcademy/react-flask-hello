import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Profile = () => {
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
                        <li className="list-group-item"><div className="fw-bold">ID:</div>a987654321</li>
                        <li className="list-group-item"><div className="fw-bold">Correo:</div>alejandroguzman@correo.com</li>
                        <li className="list-group-item"><div className="fw-bold">Teléfono:</div>987654321</li>
                        <li className="list-group-item"><div className="fw-bold">Año:</div>Primero</li>
                    </ul>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <h3>Contenido de Prueba</h3>
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Sección de prueba {index + 1}</h5>
                                <p className="card-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p className="card-text">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <p className="card-text">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};