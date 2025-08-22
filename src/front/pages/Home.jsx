import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { APIProvider, useMap, Map } from '@vis.gl/react-google-maps';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { beautifulStyles } from "../styles/beautifulStyles";



export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    precio_ud: "",
    ud: "",
    img_cosecha: "",
    esta_realizada: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (!backendUrl) {
          throw new Error("VITE_BACKEND_URL is not defined");
        }

        // Use the environment variable instead of hardcoded URL
        const res = await fetch(`${backendUrl}api/user/ofertas`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setOffers(data.ofertas || []);
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}api/user/ofertas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Offer created successfully:', data);

      // Reset form on success
      setForm({
        titulo: "",
        descripcion: "",
        precio_ud: "",
        ud: "",
        img_cosecha: "",
        esta_realizada: false
      });

      // Refresh offers list
      const updatedOffers = await fetch(`${backendUrl}api/user/ofertas`);
      const updatedData = await updatedOffers.json();
      setOffers(updatedData.ofertas || []);

    } catch (err) {
      console.error('Error submitting offer:', err);
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const isValidCoordinate = (num) => {
    return !isNaN(num) && isFinite(num);
  };

  const getValidCoordinates = (coordenates_vendedor) => {
    if (!coordenates_vendedor) return null;

    let lat, lng;

    if (typeof coordenates_vendedor === 'string') {
      const cleaned = coordenates_vendedor.replace(/[{}]/g, '');
      const coords = cleaned.split(',');

      if (coords.length >= 2) {
        lat = parseFloat(coords[0].trim());
        lng = parseFloat(coords[1].trim());
      } else {
        return null;
      }
    } else if (typeof coordenates_vendedor === 'object' && !Array.isArray(coordenates_vendedor)) {
      lat = parseFloat(coordenates_vendedor.lat || coordenates_vendedor.latitude);
      lng = parseFloat(coordenates_vendedor.lng || coordenates_vendedor.longitude || coordenates_vendedor.lon);
    } else if (Array.isArray(coordenates_vendedor) && coordenates_vendedor.length >= 2) {
      lat = parseFloat(coordenates_vendedor[0]);
      lng = parseFloat(coordenates_vendedor[1]);
    } else {
      return null;
    }

    if (isValidCoordinate(lat) && isValidCoordinate(lng)) {
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { lat, lng };
      }
    }

    return null;
  };

  const getCropIcon = (title) => {
    if (!title) return <span className="icono-cultivo">🌱</span>;

    const titleLower = title.toLowerCase();

    const iconMap = {
      'trigo|cereal|avena': '🌾',
      'tomate|verdura|hortaliza': '🍅',
      'fruta|manzana|pera': '🍎',
      'uva|vino|viña': '🍇',
      'oliva|aceite|aceituna': '🫒',
      'naranja|limón|cítrico': '🍊',
      'girasol|flor': '🌻',
      'maíz|grano': '🌽',
      'lechuga|ensalada': '🥬',
      'zanahoria|tubérculo': '🥕'
    };

    for (const [keywords, icon] of Object.entries(iconMap)) {
      if (keywords.split('|').some(keyword => titleLower.includes(keyword))) {
        return <span className="icono-cultivo">{icon}</span>;
      }
    }

    return <span className="icono-cultivo">🌱</span>;
  };

  return (
    <div>
      <style>{beautifulStyles}</style>
      <div className="campo-container">
        <div className="container-fluid px-4">

          {/* HEADER */}
          <div className="campo-header">
            <h1 className="titulo-principal">
              Mercado del Campo Español
            </h1>
            <p className="subtitulo">
              Donde la tradición agrícola se encuentra con la innovación digital
            </p>
          </div>

          <div className="row g-4">
            <div className="col-xl-8">

              {/* FORM SECTION */}
              <div className="tarjeta-bella formulario-seccion mb-4">
                {store.user ? (
                  <>
                    <div className="formulario-header">
                      <h2 className="formulario-titulo">
                        Comparte los Frutos de tu Tierra
                      </h2>
                      <p className="formulario-descripcion">
                        Conecta tu cosecha directamente con quienes la valoran
                      </p>
                    </div>

                    {submitError && (
                      <div className="alert alert-danger mb-4" role="alert" style={{
                        borderRadius: '15px',
                        border: '2px solid rgba(220, 53, 69, 0.3)',
                        background: 'rgba(220, 53, 69, 0.1)'
                      }}>
                        ⚠️ {submitError}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="campo-formulario">
                      <div className="grupo-campo">
                        <label className="etiqueta-campo">
                          🌾 <span>Título de la campaña</span>
                        </label>
                        <input
                          name="titulo"
                          value={form.titulo}
                          onChange={handleChange}
                          placeholder="Tomates cherry de temporada, trigo durum ecológico..."
                          className="input-campo"
                          required
                          disabled={submitting}
                        />
                      </div>

                      <div className="grupo-campo">
                        <label className="etiqueta-campo">
                          👨‍🌾 <span>Describa sus cultivos</span>
                        </label>
                        <textarea
                          name="descripcion"
                          value={form.descripcion}
                          onChange={handleChange}
                          placeholder="Descripción del producto"
                          className="input-campo"
                          rows="3"
                          required
                          disabled={submitting}
                        />
                      </div>

                      <div className="grupo-campo">
                        <label className="etiqueta-campo">
                          💰 <span>Precio Justo (€)</span>
                        </label>
                        <input
                          name="precio_ud"
                          type="number"
                          step="0.01"
                          min="0"
                          value={form.precio_ud}
                          onChange={handleChange}
                          placeholder="2.50"
                          className="input-campo"
                          required
                          disabled={submitting}
                        />
                      </div>

                      <div className="grupo-campo">
                        <label className="etiqueta-campo">
                          📦 <span>Unidad de Venta</span>
                        </label>
                        <input
                          name="ud"
                          value={form.ud}
                          onChange={handleChange}
                          placeholder="kg, caja de 5kg, docena..."
                          className="input-campo"
                          required
                          disabled={submitting}
                        />
                      </div>

                      <div className="grupo-campo" style={{ gridColumn: '1 / -1' }}>
                        <label className="etiqueta-campo">
                          📸 <span>Imagen de tu Cosecha (URL)</span>
                        </label>
                        <input
                          name="img_cosecha"
                          type="url"
                          value={form.img_cosecha}
                          onChange={handleChange}
                          placeholder="https://mi-huerta.com/tomates-frescos.jpg"
                          className="input-campo"
                          disabled={submitting}
                        />
                      </div>

                      <div className="grupo-campo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          name="esta_realizada"
                          type="checkbox"
                          checked={form.esta_realizada}
                          onChange={handleChange}
                          disabled={submitting}
                          id="esta_realizada"
                        />
                        <label htmlFor="esta_realizada" className="etiqueta-campo" style={{ margin: 0 }}>
                          ✅ <span>¿Está vendida?</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="boton-principal"
                        disabled={submitting}
                        style={{
                          opacity: submitting ? 0.7 : 1,
                          cursor: submitting ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {submitting ? '🔄 Publicando...' : '🌱 Publicar mi Cosecha'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="alerta-login">
                    <h3>🚪 Únete a Nuestra Comunidad Agrícola</h3>
                    <p>Forma parte de la red de agricultores y compradores más grande de España</p>
                    <Link to="/login" className="boton-login">
                      🌾 Acceder al Campo Digital
                    </Link>
                  </div>
                )}
              </div>

              {/* OFFERS SECTION */}
              <div className="tarjeta-bella ofertas-seccion">
                <div className="ofertas-header">
                  <h2 className="ofertas-titulo">
                    Cosecha Fresca Disponible
                  </h2>
                  <br />
                  <span className="contador-ofertas">
                    🌱 {offers.length} productos frescos del campo
                  </span>
                </div>

                {loading && (
                  <div className="loading-container">
                    <div className="campo-spinner"></div>
                    <div className="loading-text">
                      Recolectando los productos más frescos del campo español...
                    </div>
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger" role="alert" style={{
                    borderRadius: '15px',
                    border: '2px solid rgba(220, 53, 69, 0.3)',
                    background: 'rgba(220, 53, 69, 0.1)',
                    color: 'var(--campo-verde)'
                  }}>
                    🚨 Error en la cosecha: {error}
                  </div>
                )}

                {!loading && !error && (
                  <div className="ofertas-grid">
                    {offers.length === 0 ? (
                      <div className="text-center p-5" style={{ color: 'var(--campo-verde)' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌾</div>
                        <h4>Temporada de Siembra</h4>
                        <p style={{ color: 'var(--oliva-verde)', fontSize: '1.1rem', fontStyle: 'italic' }}>
                          Los agricultores están preparando las mejores cosechas de la temporada...
                        </p>
                      </div>
                    ) : (
                      offers.map((offer) => {
                        const coordinates = getValidCoordinates(offer.coordenates_vendedor);

                        return (
                          <div key={offer.id} className="oferta-tarjeta">
                            {coordinates ? (
                              <div className="mapa-contenedor">
                                <div className="mapa-overlay">
                                  📍 Finca ubicada en campo español
                                </div>
                                <APIProvider apiKey={"AIzaSyA5_WFVBLTMfaheneobOObkt0mLJZj1EcQ"}>
                                  <Map
                                    defaultZoom={11}
                                    defaultCenter={coordinates}
                                    mapId={"d9aa07a16a3fc9d12e3ebf0b"}
                                    mapTypeControl={false}
                                    disableDefaultUI={true}
                                    clickableIcons={false}
                                    disableDoubleClickZoom={true}
                                    zoomControl={true}
                                    gestureHandling={'greedy'}
                                    style={{ width: '100%', height: '100%' }}
                                  >
                                    <AdvancedMarker position={coordinates}>
                                      <div style={{
                                        background: 'linear-gradient(135deg, var(--campo-verde), var(--oliva-verde))',
                                        border: '4px solid white',
                                        borderRadius: '50%',
                                        width: '55px',
                                        height: '55px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '28px',
                                        boxShadow: '0 6px 20px rgba(45, 80, 22, 0.4)',
                                        animation: 'location-pulse 3s ease-in-out infinite'
                                      }}>
                                        🚜
                                      </div>
                                    </AdvancedMarker>
                                  </Map>
                                </APIProvider>
                              </div>
                            ) : (
                              <div className="sin-coordenadas">
                                🗺️ Finca en ubicación privada - Contacta directamente con el agricultor
                              </div>
                            )}

                            <div className="oferta-contenido">
                              <h5 className="oferta-titulo">
                                {getCropIcon(offer.titulo)}
                                {offer.titulo}
                              </h5>
                              <p className="oferta-descripcion">
                                📝 {offer.descripcion}
                              </p>
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="oferta-precio">
                                  💰 €{offer.precio_ud} / {offer.ud}
                                </span>
                                <small style={{
                                  color: offer.esta_realizada ? 'var(--danger-color)' : 'var(--oliva-verde)',
                                  fontWeight: '600',
                                  background: offer.esta_realizada ? 'rgba(220, 53, 69, 0.1)' : 'rgba(107, 142, 35, 0.1)',
                                  padding: '4px 12px',
                                  borderRadius: '15px',
                                  border: offer.esta_realizada ? '1px solid rgba(220, 53, 69, 0.2)' : '1px solid rgba(107, 142, 35, 0.2)'
                                }}>
                                  {offer.esta_realizada ? '🔴 Vendido' : '🟢 Disponible ahora'}
                                </small>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                <div className="text-center mt-4">
                  <Link
                    to={localStorage.getItem("jwt_token") ? "/busqueda" : "/login"}
                    className="boton-principal"
                    style={{ display: 'inline-block', textDecoration: 'none' }}
                  >
                    {localStorage.getItem("jwt_token") ? '🔍 Explorar Toda la Cosecha' : '🚪 Iniciar Sesión para Explorar'}
                  </Link>
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="col-xl-4">
              <div className="tarjeta-bella acciones-sidebar">
                <h3 className="acciones-titulo">
                  🤝 ¿Cómo Participar?
                </h3>

                <Link to="/login" className="boton-accion btn-comprar">
                  <div>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '0.5rem' }}>COMPRAR</div>
                    <div style={{ fontSize: '1rem', opacity: '0.9' }}>Productos frescos del agricultor</div>
                    <div style={{ fontSize: '0.9rem', opacity: '0.8', marginTop: '0.5rem' }}>
                      Sin intermediarios • Precios justos
                    </div>
                  </div>
                </Link>

                <Link to="/login" className="boton-accion btn-vender">
                  <div>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌾</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '0.5rem' }}>VENDER</div>
                    <div style={{ fontSize: '1rem', opacity: '0.9' }}>Tu cosecha directamente</div>
                    <div style={{ fontSize: '0.9rem', opacity: '0.8', marginTop: '0.5rem' }}>
                      Mejor precio • Contacto directo
                    </div>
                  </div>
                </Link>

                <div className="caracteristicas-tarjeta">
                  <h5 className="caracteristicas-titulo">
                    🌱 Ventajas del Campo Digital
                  </h5>
                  <ul className="caracteristicas-lista">
                    <li>
                      <span>🚚</span>
                      <div>
                        <strong>Comercio directo</strong><br />
                        <small>Del campo a tu mesa sin intermediarios</small>
                      </div>
                    </li>
                    <li>
                      <span>🌿</span>
                      <div>
                        <strong>Productos de temporada</strong><br />
                        <small>Frescos y recién cosechados</small>
                      </div>
                    </li>
                    <li>
                      <span>💰</span>
                      <div>
                        <strong>Precios transparentes</strong><br />
                        <small>Justos para agricultor y comprador</small>
                      </div>
                    </li>
                    <li>
                      <span>📍</span>
                      <div>
                        <strong>Trazabilidad completa</strong><br />
                        <small>Conoce el origen de tus alimentos</small>
                      </div>
                    </li>
                    <li>
                      <span>🤝</span>
                      <div>
                        <strong>Comunidad agrícola</strong><br />
                        <small>Apoya a los productores locales</small>
                      </div>
                    </li>
                    <li>
                      <span>🌍</span>
                      <div>
                        <strong>Sostenibilidad</strong><br />
                        <small>Reduce la huella de carbono</small>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};