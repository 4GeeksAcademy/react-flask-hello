import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import imagenBack from "../assets/fondo-Rock.jpg";


export const Prebuy = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (store.isLoggedIn && store.user_id) {
            fetchCartItems();
        } else {
            setCartItems([]);
            setLoading(false);
            setError(null);
        }
    }, [store.isLoggedIn, store.user_id, navigate]);

    const fetchCartItems = async () => {
        setLoading(true);
        setError(null);
        if (!backendUrl) {
            setError("Error: La URL del backend no está configurada.");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${backendUrl}api/cart/${store.user_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setCartItems(data);
            } else {
                setError(`Error al cargar el carrito: ${data.msg || response.statusText}`);
            }
        } catch (err) {
            console.error("Error de conexión al cargar carrito:", err);
            setError("Hubo un problema al conectar con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItem = async (itemId) => {
        if (!store.isLoggedIn) {
            alert("Inicia sesión para eliminar artículos.");
            navigate("/login");
            return;
        }
        if (!backendUrl) {
            alert("Error: La URL del backend no está configurada.");
            return;
        }
        if (!confirm("¿Estás seguro de que quieres eliminar este artículo del carrito?")) {
            return;
        }
        try {
            const response = await fetch(`${backendUrl}/api/cart/${itemId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${store.token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.msg);
                fetchCartItems();
            } else {
                alert(`Error al eliminar artículo: ${data.msg || response.statusText}`);
            }
        } catch (err) {
            console.error("Error de conexión al eliminar artículo:", err);
            alert("Hubo un problema al conectar con el servidor.");
        }
    };

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (!store.isLoggedIn) {
            alert("Inicia sesión para actualizar la cantidad.");
            navigate("/login");
            return;
        }
        if (newQuantity < 1) {
            handleDeleteItem(itemId);
            return;
        }
        if (!backendUrl) {
            alert("Error: La URL del backend no está configurada.");
            return;
        }
        try {
            const response = await fetch(`${backendUrl}/api/cart/item/${itemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`
                },
                body: JSON.stringify({ quantity: newQuantity })
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.msg);
                fetchCartItems();
            } else {
                alert(`Error al actualizar cantidad: ${data.msg || response.statusText}`);
            }
        } catch (err) {
            console.error("Error de conexión al actualizar cantidad:", err);
            alert("Hubo un problema al conectar con el servidor.");
        }
    };

    const handleCheckout = async () => {
        if (!store.isLoggedIn) {
            alert("Inicia sesión para finalizar tu compra.");
            navigate("/login");
            return;
        }
        if (!backendUrl) {
            alert("Error: La URL del backend no está configurada.");
            return;
        }
        if (!confirm("¿Confirmar la compra de todos los artículos en el carrito?")) {
            return;
        }
        try {
            const response = await fetch(`${backendUrl}/api/cart/checkout/${store.user_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.msg);
                navigate("/home");
            } else {
                alert(`Error al finalizar compra: ${data.msg || response.statusText}`);
            }
        } catch (err) {
            console.error("Error de conexión al finalizar compra:", err);
            alert("Hubo un problema al conectar con el servidor.");
        }
    };

    if (loading) return <div className="text-center mt-5">Cargando carrito...</div>;
    if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

    if (!store.isLoggedIn) {
        return (
            <div className="text-center mt-5">
                <p>Inicia sesión para ver y gestionar los artículos de tu carrito.</p>
                <Link to="/login" className="btn btn-primary mb-5">Ir a Iniciar Sesión</Link>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="home-page-container">
                <div className="imagen-background">
                    <img src={imagenBack} alt="imagen fondo" />
                </div>
                <div className="vh-100">
                <div className="text-center py-5 mt-5">
                    <p>Tu carrito está vacío.</p>
                    <Link to="/home" className="btn btn-secondary">Explorar Eventos</Link>
                </div>
                </div>
            </div>
        );
    }

    return (
        <div className="home-page-container">
            <div className="imagen-background">
                <img src={imagenBack} alt="imagen fondo" />
            </div>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Tu Carrito de Compras</h2>
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        {cartItems.map((item) => (
                            <div key={item.id} className="card mb-3 p-3 shadow-sm">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5>Artículo ID: {item.event_id}</h5>
                                        <p>Cantidad: {item.quantity}</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button
                                            className="btn btn-sm btn-outline-secondary me-2"
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                                            className="form-control text-center me-2"
                                            style={{ width: '70px' }}
                                            min="1"
                                        />
                                        <button
                                            className="btn btn-sm btn-outline-secondary me-3"
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteItem(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="text-center mt-4">
                            <button className="btn btn-success btn-lg" onClick={handleCheckout}>
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};