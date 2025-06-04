import { useState } from "react";

export const Service = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        ciudad: "",
        codigoPostal: "",
        telefono: "",
        comentarios: ""
    });

    // Simulación de carrito de compras (puedes conectar luego al contexto real) 
    // En una versión final, esta información vendría del contexto global, de una API o del localStorage.
    const [carrito, setCarrito] = useState([
        { id: 1, nombre: "Camiseta técnica", cantidad: 2, precio: 19.99 },
        { id: 2, nombre: "Pantalón deportivo", cantidad: 1, precio: 29.99 }
    ]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // En una app real, aquí se enviarían los datos al backend o API
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
        alert("¡Datos de envío recibidos! Gracias por tu pedido.");
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Entrega a domicilio</h2>

            <div className="row">
                {/* Formulario de entrega */}
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre completo</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input
                                type="text"
                                className="form-control"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Ciudad</label>
                            <input
                                type="text"
                                className="form-control"
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Código postal</label>
                            <input
                                type="text"
                                className="form-control"
                                name="codigoPostal"
                                value={formData.codigoPostal}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Comentarios</label>
                            <textarea
                                className="form-control"
                                name="comentarios"
                                rows="3"
                                value={formData.comentarios}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-success">Confirmar entrega</button>
                    </form>
                </div>

                {/* Resumen del carrito */}
                <div className="col-md-6">
                    <h4>Productos en tu carrito</h4>
                    <ul className="list-group">
                        {carrito.map(item => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between">
                                <span>{item.nombre} x{item.cantidad}</span>
                                <span>{(item.precio * item.cantidad).toFixed(2)}€</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

