import { Link } from "react-router-dom";

export const Productos = () => {
    return (
        <div className="container mt-4">
            <div className="row g-4">
                <div className="col-6 col-sm-4 col-md-3 col-lg-custom">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="Producto 1" />
                        <div className="card-body">
                            <h5 className="card-title">Título del producto</h5>
                            <p className="card-text">Descripción</p>
                            <p className="card-text">
                                <small className="text-muted">Precio</small>
                            </p>
                            <Link to="/vistaproducto" className="btn btn-primary">
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-sm-4 col-md-3 col-lg-custom">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="Producto 2" />
                        <div className="card-body">
                            <h5 className="card-title">Título del producto</h5>
                            <p className="card-text">Descripción</p>
                            <p className="card-text">
                                <small className="text-muted">Precio</small>
                            </p>
                            <Link to="/vistaproducto" className="btn btn-primary">
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-sm-4 col-md-3 col-lg-custom">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="Producto 3" />
                        <div className="card-body">
                            <h5 className="card-title">Título del producto</h5>
                            <p className="card-text">Descripción</p>
                            <p className="card-text">
                                <small className="text-muted">Precio</small>
                            </p>
                            <Link to="/vistaproducto" className="btn btn-primary">
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-sm-4 col-md-3 col-lg-custom">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="Producto 4" />
                        <div className="card-body">
                            <h5 className="card-title">Título del producto</h5>
                            <p className="card-text">Descripción</p>
                            <p className="card-text">
                                <small className="text-muted">Precio</small>
                            </p>
                            <Link to="/vistaproducto" className="btn btn-primary">
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-sm-4 col-md-3 col-lg-custom">
                    <div className="card h-100">
                        <img src="..." className="card-img-top" alt="Producto 5" />
                        <div className="card-body">
                            <h5 className="card-title">Título del producto</h5>
                            <p className="card-text">Descripción</p>
                            <p className="card-text">
                                <small className="text-muted">Precio</small>
                            </p>
                            <Link to="/vistaproducto" className="btn btn-primary">
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
