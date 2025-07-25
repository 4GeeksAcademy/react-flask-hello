import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';

export const Home = () => {
  const { store,dispatch } = useGlobalReducer();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(offers)
  // Form state
  const [form, setForm] = useState({ name: "", seller: "", price: "", unit: "", img: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined");
        
        const res = await fetch(`https://animated-pancake-x5pjxq9vv4gj2ppgx-3001.app.github.dev/api/user/ofertas`);
        console.log(res)
        
        const data = await res.json();
        console.log(data)
        setOffers(data.ofertas);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  // Handle input change
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Submit new offer
  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const token = store.token
      const res = await fetch(`https://animated-pancake-x5pjxq9vv4gj2ppgx-3001.app.github.dev/api/user/ofertas`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
         },
        body: JSON.stringify(form)
      });
        const resUser = await fetch(`https://animated-pancake-x5pjxq9vv4gj2ppgx-3001.app.github.dev/api/user`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
         },
      });
      if (!res.ok) throw new Error(await res.text());
      const newOffer = await res.json();
      const usuarioLogeado = await resUser.json();
      dispatch({
              type : "add_user",
              payload : usuarioLogeado
          })
      setOffers(prev => [newOffer, ...prev]);
      setForm({ name: "", seller: "", price: "", unit: "", img: "" });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row gx-4">
        <div className="col-md-8">
          <div className="bg-white p-4 rounded shadow-sm mb-4">
            {/* Conditionally show form if user is logged in */}
            {store.user ? (
              <>
                <h2 className="text-success mb-3">Crear Nueva Oferta</h2>
                {submitError && <div className="alert alert-danger">{submitError}</div>}
                <form onSubmit={handleSubmit} className="mb-4">
                  <div className="row g-2">
                    <div className="col-md-6">
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nombre"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        name="seller"
                        value={form.seller}
                        onChange={handleChange}
                        placeholder="Agricultor"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="row g-2 mt-2">
                    <div className="col-md-4">
                      <input
                        name="price"
                        type="number"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Precio"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        name="unit"
                        value={form.unit}
                        onChange={handleChange}
                        placeholder="Unidad"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        name="img"
                        value={form.img}
                        onChange={handleChange}
                        placeholder="URL Imagen"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3" disabled={submitting}>
                    {submitting ? 'Enviando...' : 'Crear Oferta'}
                  </button>
                </form>
              </>
            ) : (
              <div className="alert alert-info">
                <Link to="/login">Inicia sesión</Link> para crear nuevas ofertas.
              </div>
            )}

            {/* Listing */}
            <h2 className="text-success mb-3">Ofertas</h2>
            {loading && <div className="spinner-border text-success" role="status"><span className="visually-hidden">Cargando...</span></div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && (
              <div className="overflow-auto" style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
                <div className="d-flex flex-column gap-3">
                  {offers.map(o => (
                    <div key={o.id} className="card">
                      <img src={o.img || 'https://via.placeholder.com/300x150.png?text=Producto'} className="card-img-top" alt={o.name} style={{ height: 150, objectFit: 'cover' }} />
                      <div className="card-body">
                        <h5 className="card-title mb-1">{o.name}</h5>
                        <p className="card-text mb-1">Agricultor: {o.seller}</p>
                        <p className="fw-bold text-success mb-0">€{o.price} / {o.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="text-center mt-2">
              <Link to="/login" className="btn btn-warning">Mostrar más</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex flex-column justify-content-center align-items-center">
          <Link to="/login" className="btn btn-success btn-lg w-75 mb-3">Comprar</Link>
          <Link to="/login" className="btn btn-outline-success btn-lg w-75">Vender</Link>
        </div>
      </div>
    </div>
  );
};
