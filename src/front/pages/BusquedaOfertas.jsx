
import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { APIProvider, useMap, Map } from '@vis.gl/react-google-maps';
import {AdvancedMarker} from '@vis.gl/react-google-maps';
import { beautifulStyles } from "../styles/beautifulStyles";

export const BusquedaOfertas = () => {
  const { store, dispatch } = useGlobalReducer();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  // Estados para filtros y búsqueda
  const [searchFilters, setSearchFilters] = useState({
    searchText: '',
    sortBy: 'relevance',
    priceRange: { min: '', max: '' },
    productType: 'all',
    availableOnly: false,
    userLocation: null
  });

  // Obtener ubicación del usuario para búsqueda por cercanía
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchFilters(prev => ({
            ...prev,
            userLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
        },
        (error) => {
          console.log('Error getting user location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (!backendUrl) {
          throw new Error("VITE_BACKEND_URL is not defined");
        }
        
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

  // Función para calcular distancia entre dos puntos (fórmula de Haversine)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distancia en km
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

  // Función para determinar el tipo de producto
  const getProductType = (title) => {
    if (!title) return 'otros';
    
    const titleLower = title.toLowerCase();
    
    if (['trigo', 'cereal', 'avena', 'maíz', 'grano'].some(keyword => titleLower.includes(keyword))) {
      return 'cereales';
    }
    if (['fruta', 'manzana', 'pera', 'uva', 'naranja', 'limón', 'cítrico'].some(keyword => titleLower.includes(keyword))) {
      return 'frutas';
    }
    if (['tomate', 'verdura', 'hortaliza', 'lechuga', 'ensalada', 'zanahoria'].some(keyword => titleLower.includes(keyword))) {
      return 'verduras';
    }
    if (['oliva', 'aceite', 'aceituna', 'girasol'].some(keyword => titleLower.includes(keyword))) {
      return 'aceites';
    }
    
    return 'otros';
  };

  // Filtrar y ordenar ofertas usando useMemo para optimizar performance
  const filteredAndSortedOffers = useMemo(() => {
    let filtered = [...offers];

    // Filtro por texto de búsqueda
    if (searchFilters.searchText.trim()) {
      const searchTerm = searchFilters.searchText.toLowerCase().trim();
      filtered = filtered.filter(offer => 
        offer.titulo?.toLowerCase().includes(searchTerm) ||
        offer.descripcion?.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro por tipo de producto
    if (searchFilters.productType !== 'all') {
      filtered = filtered.filter(offer => 
        getProductType(offer.titulo) === searchFilters.productType
      );
    }

    // Filtro por rango de precios
    if (searchFilters.priceRange.min) {
      filtered = filtered.filter(offer => 
        parseFloat(offer.precio_ud) >= parseFloat(searchFilters.priceRange.min)
      );
    }
    if (searchFilters.priceRange.max) {
      filtered = filtered.filter(offer => 
        parseFloat(offer.precio_ud) <= parseFloat(searchFilters.priceRange.max)
      );
    }

    // Filtro por disponibilidad
    if (searchFilters.availableOnly) {
      filtered = filtered.filter(offer => !offer.esta_realizada);
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (searchFilters.sortBy) {
        case 'price-asc':
          return parseFloat(a.precio_ud) - parseFloat(b.precio_ud);
        
        case 'price-desc':
          return parseFloat(b.precio_ud) - parseFloat(a.precio_ud);
        
        case 'distance':
          if (!searchFilters.userLocation) return 0;
          
          const coordsA = getValidCoordinates(a.coordenates_vendedor);
          const coordsB = getValidCoordinates(b.coordenates_vendedor);
          
          if (!coordsA && !coordsB) return 0;
          if (!coordsA) return 1;
          if (!coordsB) return -1;
          
          const distanceA = calculateDistance(
            searchFilters.userLocation.lat, searchFilters.userLocation.lng,
            coordsA.lat, coordsA.lng
          );
          const distanceB = calculateDistance(
            searchFilters.userLocation.lat, searchFilters.userLocation.lng,
            coordsB.lat, coordsB.lng
          );
          
          return distanceA - distanceB;
        
        case 'newest':
          return new Date(b.created_at || b.fecha_creacion || 0) - new Date(a.created_at || a.fecha_creacion || 0);
        
        case 'relevance':
        default:
          // Relevancia basada en coincidencia de búsqueda
          if (!searchFilters.searchText.trim()) return 0;
          
          const searchTerm = searchFilters.searchText.toLowerCase();
          const titleMatchA = a.titulo?.toLowerCase().includes(searchTerm);
          const titleMatchB = b.titulo?.toLowerCase().includes(searchTerm);
          
          if (titleMatchA && !titleMatchB) return -1;
          if (!titleMatchA && titleMatchB) return 1;
          
          return 0;
      }
    });

    return filtered;
  }, [offers, searchFilters]);

  // Función para actualizar filtros
  const updateFilter = (key, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

 // const updatePriceRange = (type, value) => {
   // setSearchFilters(prev => ({
     // ...prev,
     // priceRange: {
       // ...prev.priceRange,
       // [type]: value
      //}
    //}));
  //};

  // Función para limpiar filtros
  const clearFilters = () => {
    setSearchFilters(prev => ({
      ...prev,
      searchText: '',
      sortBy: 'relevance',
      priceRange: { min: '', max: '' },
      productType: 'all',
      availableOnly: false
    }));
  };

  const handleClick = (offer) =>{
    if(store.ofertas.some(ofertas => ofertas.id === offer.id)===true){
      navigate(`/oferta/${offer.id}`)
    }
    dispatch({
      type:"add_oferta",
      payload:offer.offer_serialize
    })
    navigate(`/oferta/${offer.id}`)
  }

  return (
    <>
      <style>{beautifulStyles}</style>
      
      <div className="campo-container">
        <div className="container-fluid px-4">
          
          {/* BARRA DE BÚSQUEDA AVANZADA */}
          <div className="tarjeta-bella mb-4">
            <div className="search-header mb-4">
              <h3 className="search-title">🔍 Encuentra tu Cosecha Perfecta</h3>
              <p className="search-subtitle">Busca por producto, ubicación o precio</p>
            </div>

            {/* Búsqueda por texto */}
            <div className="search-main mb-4">
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="¿Qué productos buscas? (tomates, trigo, aceitunas...)"
                  value={searchFilters.searchText}
                  onChange={(e) => updateFilter('searchText', e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🌾</span>
              </div>
            </div>

            {/* Filtros en una fila */}
            <div className="search-filters">
              <div className="filter-row">
                
                {/* Ordenar por */}
                <div className="filter-group">
                  <label className="filter-label">📊 Ordenar por:</label>
                  <select
                    value={searchFilters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="filter-select"
                  >
                    <option value="relevance">🎯 Relevancia</option>
                    <option value="price-asc">💰 Precio: Menor a Mayor</option>
                    <option value="price-desc">💎 Precio: Mayor a Menor</option>
                    <option value="distance">📍 Cercanía</option>
                    <option value="newest">🆕 Más Recientes</option>
                  </select>
                </div>

                {/* Tipo de producto */}
                <div className="filter-group">
                  <label className="filter-label">🌱 Tipo:</label>
                  <select
                    value={searchFilters.productType}
                    onChange={(e) => updateFilter('productType', e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">Todos los productos</option>
                    <option value="cereales">🌾 Cereales</option>
                    <option value="frutas">🍎 Frutas</option>
                    <option value="verduras">🥬 Verduras</option>
                    <option value="aceites">🫒 Aceites y Semillas</option>
                    <option value="otros">🌱 Otros</option>
                  </select>
                </div>

                {/* Rango de precios */}
                <div className="filter-group price-range">
                  <label className="filter-label">💰 Precio (€):</label>
                  <div className="price-inputs">
                    <input
                      type="number"
                      placeholder="Min"
                      value={searchFilters.priceRange.min}
                      onChange={(e) => updatePriceRange('min', e.target.value)}
                      className="price-input"
                      min="0"
                      step="0.01"
                    />
                    <span className="price-separator">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={searchFilters.priceRange.max}
                      onChange={(e) => updatePriceRange('max', e.target.value)}
                      className="price-input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Solo disponibles */}
                <div className="filter-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={searchFilters.availableOnly}
                      onChange={(e) => updateFilter('availableOnly', e.target.checked)}
                      className="filter-checkbox"
                    />
                    <span className="checkbox-text">🟢 Solo disponibles</span>
                  </label>
                </div>

                {/* Botón limpiar */}
                <div className="filter-group">
                  <button
                    onClick={clearFilters}
                    className="clear-filters-btn"
                    title="Limpiar todos los filtros"
                  >
                    🧹 Limpiar
                  </button>
                </div>
              </div>
            </div>

            {/* Resumen de resultados */}
            <div className="search-results-summary">
              <span className="results-count">
                📊 {filteredAndSortedOffers.length} productos encontrados
                {searchFilters.searchText && ` para "${searchFilters.searchText}"`}
              </span>
              {searchFilters.userLocation && searchFilters.sortBy === 'distance' && (
                <span className="location-info">
                  📍 Ordenados por cercanía a tu ubicación
                </span>
              )}
            </div>
          </div>

          {/* SECCIÓN DE OFERTAS */}
          <div className="tarjeta-bella ofertas-seccion">
            <div className="ofertas-header">
              <h2 className="ofertas-titulo">
                Cosecha Fresca Disponible
              </h2>
              <br />
              <span className="contador-ofertas">
                🌱 {filteredAndSortedOffers.length} productos frescos del campo
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
                {filteredAndSortedOffers.length === 0 ? (
                  <div className="text-center p-5" style={{color: 'var(--campo-verde)'}}>
                    <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🔍</div>
                    <h4>No se encontraron productos</h4>
                    <p style={{color: 'var(--oliva-verde)', fontSize: '1.1rem', fontStyle: 'italic'}}>
                      Prueba con otros términos de búsqueda o ajusta los filtros
                    </p>
                    <button onClick={clearFilters} className="btn btn-outline-success mt-3">
                      🧹 Limpiar filtros y ver todos
                    </button>
                  </div>
                ) : (
                  filteredAndSortedOffers.map((offer) => {
                    const coordinates = getValidCoordinates(offer.coordenates_vendedor);
                    let distance = null;
                    
                    // Calcular distancia si tenemos ubicación del usuario
                    if (searchFilters.userLocation && coordinates) {
                      distance = calculateDistance(
                        searchFilters.userLocation.lat,
                        searchFilters.userLocation.lng,
                        coordinates.lat,
                        coordinates.lng
                      );
                    }
                    
                    return (
                      <div key={offer.id} className="oferta-tarjeta">
                        {coordinates ? (
                          <div className="mapa-contenedor">
                            <div className="mapa-overlay">
                              📍 Finca ubicada en campo español
                              {distance && (
                                <div className="distance-info">
                                  🚗 A {distance.toFixed(1)} km de ti
                                </div>
                              )}
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

                        <div className="oferta-contenido"  >
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
          </div>
        </div>
      </div>
    </>
  );
};

//onClick={handleClick(offer)}