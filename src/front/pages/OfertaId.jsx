import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { beautifulStyles } from "../styles/beautifulStyles";

export const OfertaId = () => {
  const { store } = useGlobalReducer();
  const { id } = useParams();
  const [showContact, setShowContact] = useState(false);

  // Find the offer from the store using the ID from URL params
  const oferta = store.ofertas ? store.ofertas.find(offer => offer.id === parseInt(id)) : null;

  const handleContactClick = () => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      // Redirect to login if not authenticated
      window.location.href = "/login";
      return;
    }
    

    setShowContact(true);
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

  // If offers are still loading from the store, show loading
  if (!store.ofertas) {
    return (
      <div>
        <style>{beautifulStyles}</style>
        <div className="campo-container">
          <div className="loading-container">
            <div className="campo-spinner"></div>
            <div className="loading-text">
              Cargando detalles de la cosecha...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If offer not found in store, show error
  if (!oferta) {
    return (
      <div>
        <style>{beautifulStyles}</style>
        <div className="campo-container">
          <div className="container-fluid px-4 py-5">
            <div className="text-center">
              <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🚨</div>
              <h2 style={{ color: 'var(--campo-verde)', marginBottom: '1rem' }}>
                Oferta no encontrada
              </h2>
              <p style={{ color: 'var(--oliva-verde)', fontSize: '1.2rem', marginBottom: '2rem' }}>
                La oferta que buscas no existe o ha sido retirada del mercado.
              </p>
              <Link to="/" className="boton-principal">
                🏠 Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const coordinates = getValidCoordinates(oferta.coordenates_vendedor);

  return (
    <div>
      <style>{beautifulStyles}</style>
      <div className="campo-container">
        <div className="container-fluid px-4">
          
          {/* Header */}
          <div className="campo-header">
            <h1 className="titulo-principal">
              {getCropIcon(oferta.titulo)} {oferta.titulo}
            </h1>
            <p className="subtitulo">
              Producto fresco directamente del agricultor
            </p>
          </div>

          <div className="row g-4">
            
            {/* Main Content */}
            <div className="col-xl-8">
              <div className="tarjeta-bella" style={{ padding: '0', overflow: 'hidden' }}>
                
                {/* Map Section */}
                {coordinates ? (
                  <div style={{ height: '400px', position: 'relative' }}>
                    <div className="mapa-overlay" style={{ zIndex: 1000 }}>
                      📍 Finca ubicada en campo español
                    </div>
                    <APIProvider apiKey={"AIzaSyA5_WFVBLTMfaheneobOObkt0mLJZj1EcQ"}>
                      <Map
                        defaultZoom={13}
                        defaultCenter={coordinates}
                        mapId={"d9aa07a16a3fc9d12e3ebf0b"}
                        mapTypeControl={true}
                        disableDefaultUI={false}
                        clickableIcons={false}
                        zoomControl={true}
                        gestureHandling={'greedy'}
                        style={{ width: '100%', height: '100%' }}
                      >
                        <AdvancedMarker position={coordinates}>
                          <div style={{
                            background: 'linear-gradient(135deg, var(--campo-verde), var(--oliva-verde))',
                            border: '4px solid white',
                            borderRadius: '50%',
                            width: '60px',
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '32px',
                            boxShadow: '0 8px 25px rgba(45, 80, 22, 0.4)',
                            animation: 'location-pulse 3s ease-in-out infinite'
                          }}>
                            🚜
                          </div>
                        </AdvancedMarker>
                      </Map>
                    </APIProvider>
                  </div>
                ) : (
                  <div className="sin-coordenadas" style={{ margin: '2rem', padding: '2rem' }}>
                    🗺️ Finca en ubicación privada - Contacta directamente con el agricultor para más detalles
                  </div>
                )}

                {/* Product Details */}
                <div style={{ padding: '3rem' }}>
                  <div className="row">
                    <div className="col-md-8">
                      <h3 className="formulario-titulo" style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>
                        Detalles del Producto
                      </h3>
                      
                      <div style={{ 
                        background: 'rgba(244, 208, 63, 0.1)', 
                        padding: '2rem', 
                        borderRadius: '15px',
                        border: '2px solid rgba(244, 208, 63, 0.2)',
                        marginBottom: '2rem'
                      }}>
                        <h5 style={{ 
                          color: 'var(--campo-verde)', 
                          marginBottom: '1rem',
                          fontSize: '1.3rem',
                          fontWeight: '600'
                        }}>
                          📝 Descripción del Agricultor:
                        </h5>
                        <p style={{ 
                          color: 'var(--oliva-verde)', 
                          fontSize: '1.1rem', 
                          lineHeight: '1.7',
                          margin: '0',
                          fontStyle: 'italic'
                        }}>
                          {oferta.descripcion}
                        </p>
                      </div>

                      {/* Product Image */}
                      {oferta.img_cosecha && (
                        <div style={{ marginBottom: '2rem' }}>
                          <h5 style={{ 
                            color: 'var(--campo-verde)', 
                            marginBottom: '1rem',
                            fontSize: '1.3rem',
                            fontWeight: '600'
                          }}>
                            📸 Imagen de la Cosecha:
                          </h5>
                          <div style={{
                            borderRadius: '15px',
                            overflow: 'hidden',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                            border: '2px solid rgba(244, 208, 63, 0.2)'
                          }}>
                            <img 
                              src={oferta.img_cosecha} 
                              alt={oferta.titulo}
                              style={{ 
                                width: '100%', 
                                height: 'auto',
                                maxHeight: '300px',
                                objectFit: 'cover'
                              }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        </div>
                      )}

                    </div>

                    <div className="col-md-4">
                      <div className="caracteristicas-tarjeta">
                        <h5 className="caracteristicas-titulo">
                          💰 Información de Venta
                        </h5>
                        
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                          <div className="oferta-precio" style={{ 
                            fontSize: '2rem', 
                            display: 'inline-block',
                            marginBottom: '1rem'
                          }}>
                            €{oferta.precio_ud} / {oferta.ud}
                          </div>
                          
                          <div style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            display: 'inline-block',
                            fontWeight: '600',
                            fontSize: '1rem',
                            backgroundColor: oferta.esta_realizada ? 'rgba(220, 53, 69, 0.1)' : 'rgba(107, 142, 35, 0.1)',
                            color: oferta.esta_realizada ? '#dc3545' : 'var(--campo-verde)',
                            border: oferta.esta_realizada ? '2px solid rgba(220, 53, 69, 0.3)' : '2px solid rgba(107, 142, 35, 0.3)'
                          }}>
                            {oferta.esta_realizada ? '🔴 VENDIDO' : '🟢 DISPONIBLE'}
                          </div>
                        </div>

                        <ul className="caracteristicas-lista">
                          <li>
                            <span>📦</span>
                            <div>
                              <strong>Unidad de venta</strong><br />
                              <small>{oferta.ud}</small>
                            </div>
                          </li>
                          <li>
                            <span>💰</span>
                            <div>
                              <strong>Precio por unidad</strong><br />
                              <small>€{oferta.precio_ud}</small>
                            </div>
                          </li>
                          <li>
                            <span>📅</span>
                            <div>
                              <strong>Fecha de publicación</strong><br />
                              <small>{new Date(oferta.created_at || Date.now()).toLocaleDateString('es-ES')}</small>
                            </div>
                          </li>
                          <li>
                            <span>🚜</span>
                            <div>
                              <strong>Directo del agricultor</strong><br />
                              <small>Sin intermediarios</small>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xl-4">
              <div className="tarjeta-bella acciones-sidebar">
                <h3 className="acciones-titulo">
                  🤝 Acciones
                </h3>

                {!oferta.esta_realizada ? (
                  <div>
                    {!showContact ? (
                      <button 
                        onClick={handleContactClick}
                        className="boton-accion btn-comprar"
                        style={{ 
                          width: '100%',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
                          <div style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '0.5rem' }}>CONTACTAR</div>
                          <div style={{ fontSize: '1rem', opacity: '0.9' }}>Con el agricultor</div>
                          <div style={{ fontSize: '0.9rem', opacity: '0.8', marginTop: '0.5rem' }}>
                            Ver información de contacto
                          </div>
                        </div>
                      </button>
                    ) : (
                      <div className="caracteristicas-tarjeta">
                        <h5 className="caracteristicas-titulo">
                          📞 Información de Contacto
                        </h5>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ marginBottom: '1rem' }}>
                            <strong>📱 Teléfono:</strong><br />
                            <a href="tel:+34666777888" style={{ 
                              color: 'var(--campo-verde)', 
                              fontSize: '1.2rem',
                              textDecoration: 'none'
                            }}>
                              +34 666 777 888
                            </a>
                          </div>
                          <div style={{ marginBottom: '1rem' }}>
                            <strong>📧 Email:</strong><br />
                            <a href="mailto:agricultor@campo.es" style={{ 
                              color: 'var(--campo-verde)', 
                              fontSize: '1.1rem',
                              textDecoration: 'none'
                            }}>
                              agricultor@campo.es
                            </a>
                          </div>
                          <div>
                            <strong>👨‍🌾 Agricultor:</strong><br />
                            <span style={{ fontSize: '1.1rem' }}>Juan Pérez</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="caracteristicas-tarjeta" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔴</div>
                    <h5 style={{ color: '#dc3545', marginBottom: '1rem' }}>
                      Producto Vendido
                    </h5>
                    <p style={{ color: 'var(--oliva-verde)', fontSize: '1rem', margin: '0' }}>
                      Este producto ya ha sido vendido y no está disponible.
                    </p>
                  </div>
                )}

                <div className="text-center mt-4">
                  <Link to="/" className="boton-principal">
                    🏠 Volver al Inicio
                  </Link>
                </div>

                <div className="text-center mt-3">
                  <Link to="/busqueda" className="boton-principal" style={{
                    background: 'linear-gradient(135deg, var(--sol-naranja), var(--trigo-dorado))'
                  }}>
                    🔍 Explorar Más Productos
                  </Link>
                </div>

                <div className="caracteristicas-tarjeta mt-4">
                  <h5 className="caracteristicas-titulo">
                    ✨ Recomendaciones
                  </h5>
                  <ul className="caracteristicas-lista">
                    <li>
                      <span>🤝</span>
                      <div>
                        <strong>Negocia directamente</strong><br />
                        <small>Habla con el agricultor</small>
                      </div>
                    </li>
                    <li>
                      <span>🕒</span>
                      <div>
                        <strong>Actúa rápido</strong><br />
                        <small>Los mejores productos se agotan</small>
                      </div>
                    </li>
                    <li>
                      <span>🌱</span>
                      <div>
                        <strong>Producto fresco</strong><br />
                        <small>Directo del campo</small>
                      </div>
                    </li>
                    <li>
                      <span>💚</span>
                      <div>
                        <strong>Apoya local</strong><br />
                        <small>Ayuda a los agricultores</small>
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