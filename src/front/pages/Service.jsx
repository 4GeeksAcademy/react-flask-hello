import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Service = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        ciudad: "",
        codigoPostal: "",
        telefono: "",
        comentarios: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
        alert("¡Datos de envío recibidos! Gracias por tu pedido.");
        navigate('/carrito');
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Entrega a domicilio</h2>

            {store.carrito.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (<div className="row">

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
                                type="number"
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

                <div className="col-md-6">
                    <h4>Productos en tu carrito</h4>
                    {store.carrito.length === 0 ? (
                        <p>Tu carrito está vacío.</p>
                    ) : (
                        <ul>
                            {store.carrito.map(item => (
                                <li key={item.id} className="border p-2 rounded flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{item.product_name}</p>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => dispatch({ type: "decrementar_cantidad", payload: item.id })}
                                                disabled={item.cantidad <= 1}
                                            >-</button>
                                            <span className="mx-2">{item.cantidad}</span>
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => dispatch({ type: "incrementar_cantidad", payload: item.id })}
                                            >+</button>
                                        </div>
                                        <p>Precio unitario: {item.price.toFixed(2)} €</p>
                                        <p>Total: {(item.price * item.cantidad).toFixed(2)} €</p>
                                    </div>
                                    <button
                                        onClick={() => dispatch({ type: "eliminar_del_carrito", payload: item.id })}
                                        className="bg-danger text-white px-3 py-1 rounded"
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            )}
        </div>
    );
};