// Estilos unificados para toda la aplicación del Mercado del Campo Español
export const beautifulStyles = `
/* ===== VARIABLES CSS GLOBALES ===== */
:root {
  /* Paleta de colores principal */
  --campo-verde: #2d5016;
  --campo-verde-claro: #4a7c2a;
  --campo-verde-oscuro: #1a2f0c;
  --oliva-verde: #6b8e23;
  --oliva-claro: #9acd32;
  --tierra-marron: #8b4513;
  --tierra-claro: #cd853f;
  --dorado-trigo: #daa520;
  --dorado-claro: #ffd700;
  --blanco-crema: #fdfdf8;
  --gris-claro: #f8f9fa;
  --gris-medio: #6c757d;
  --gris-oscuro: #343a40;
  --danger-color: #dc3545;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  
  /* Gradientes */
  --gradiente-campo: linear-gradient(135deg, var(--campo-verde), var(--oliva-verde));
  --gradiente-tierra: linear-gradient(135deg, var(--tierra-marron), var(--tierra-claro));
  --gradiente-dorado: linear-gradient(135deg, var(--dorado-trigo), var(--dorado-claro));
  --gradiente-suave: linear-gradient(135deg, var(--blanco-crema), var(--gris-claro));
  
  /* Sombras */
  --sombra-suave: 0 4px 15px rgba(45, 80, 22, 0.1);
  --sombra-media: 0 8px 25px rgba(45, 80, 22, 0.15);
  --sombra-fuerte: 0 12px 35px rgba(45, 80, 22, 0.2);
  --sombra-hover: 0 8px 30px rgba(45, 80, 22, 0.25);
  
  /* Tipografía */
  --fuente-principal: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  --fuente-titulo: 'Georgia', 'Times New Roman', serif;
  
  /* Espaciado */
  --espaciado-xs: 0.25rem;
  --espaciado-sm: 0.5rem;
  --espaciado-md: 1rem;
  --espaciado-lg: 1.5rem;
  --espaciado-xl: 2rem;
  --espaciado-xxl: 3rem;
  
  /* Bordes */
  --radio-pequeño: 8px;
  --radio-medio: 12px;
  --radio-grande: 20px;
  --radio-completo: 50px;
  
  /* Transiciones */
  --transicion-rapida: all 0.2s ease;
  --transicion-normal: all 0.3s ease;
  --transicion-lenta: all 0.5s ease;
}

/* ===== RESET Y BASE ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--fuente-principal);
  background: var(--gradiente-suave);
  color: var(--campo-verde);
  line-height: 1.6;
  font-size: 16px;
}

/* ===== CONTENEDORES PRINCIPALES ===== */
.campo-container {
  min-height: 100vh;
  background: var(--gradiente-suave);
  padding: var(--espaciado-lg) 0;
}

.container-fluid {
  max-width: 1400px;
  margin: 0 auto;
}

/* ===== HEADER PRINCIPAL ===== */
.campo-header {
  text-align: center;
  margin-bottom: var(--espaciado-xxl);
  padding: var(--espaciado-xl) var(--espaciado-lg);
  background: linear-gradient(135deg, var(--campo-verde), var(--oliva-verde), var(--dorado-trigo));
  border-radius: var(--radio-grande);
  color: white;
  box-shadow: var(--sombra-media);
  position: relative;
  overflow: hidden;
}

.campo-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: campo-brillo 6s ease-in-out infinite alternate;
  pointer-events: none;
}

.titulo-principal {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: var(--espaciado-md);
  font-family: var(--fuente-titulo);
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  position: relative;
  z-index: 1;
}

.subtitulo {
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  opacity: 0.95;
  font-weight: 400;
  font-style: italic;
  position: relative;
  z-index: 1;
}

/* ===== TARJETAS PRINCIPALES ===== */
.tarjeta-bella {
  background: white;
  border-radius: var(--radio-grande);
  padding: var(--espaciado-xl);
  margin-bottom: var(--espaciado-xl);
  box-shadow: var(--sombra-suave);
  border: 1px solid rgba(45, 80, 22, 0.1);
  transition: var(--transicion-normal);
  position: relative;
  overflow: hidden;
}

.tarjeta-bella::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradiente-campo);
  border-radius: var(--radio-grande) var(--radio-grande) 0 0;
}

.tarjeta-bella:hover {
  transform: translateY(-2px);
  box-shadow: var(--sombra-hover);
}

/* ===== SECCIÓN FORMULARIO ===== */
.formulario-seccion {
  background: linear-gradient(145deg, white, var(--blanco-crema));
}

.formulario-header {
  text-align: center;
  margin-bottom: var(--espaciado-xl);
  padding-bottom: var(--espaciado-lg);
  border-bottom: 2px solid var(--gris-claro);
}

.formulario-titulo {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--campo-verde);
  margin-bottom: var(--espaciado-sm);
  font-family: var(--fuente-titulo);
}

.formulario-descripcion {
  font-size: 1.1rem;
  color: var(--oliva-verde);
  font-style: italic;
}

.campo-formulario {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--espaciado-lg);
  align-items: start;
}

.grupo-campo {
  display: flex;
  flex-direction: column;
  gap: var(--espaciado-sm);
}

.etiqueta-campo {
  display: flex;
  align-items: center;
  gap: var(--espaciado-sm);
  font-weight: 600;
  color: var(--campo-verde);
  font-size: 1rem;
}

.etiqueta-campo span {
  font-weight: 600;
}

.input-campo {
  padding: var(--espaciado-md) var(--espaciado-lg);
  border: 2px solid var(--gris-claro);
  border-radius: var(--radio-medio);
  font-size: 1rem;
  transition: var(--transicion-normal);
  background: white;
  color: var(--campo-verde);
  font-family: var(--fuente-principal);
}

.input-campo:focus {
  outline: none;
  border-color: var(--oliva-verde);
  box-shadow: 0 0 0 3px rgba(107, 142, 35, 0.1);
  transform: translateY(-1px);
}

.input-campo::placeholder {
  color: var(--gris-medio);
  font-style: italic;
}

.input-campo:disabled {
  background: var(--gris-claro);
  color: var(--gris-medio);
  cursor: not-allowed;
}

/* ===== BOTONES ===== */
.boton-principal {
  background: var(--gradiente-campo);
  color: white;
  border: none;
  padding: var(--espaciado-md) var(--espaciado-xl);
  border-radius: var(--radio-completo);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transicion-normal);
  box-shadow: var(--sombra-suave);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--espaciado-sm);
  position: relative;
  overflow: hidden;
}

.boton-principal::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: var(--transicion-lenta);
}

.boton-principal:hover::before {
  left: 100%;
}

.boton-principal:hover {
  transform: translateY(-2px);
  box-shadow: var(--sombra-hover);
}

.boton-principal:active {
  transform: translateY(0);
}

.boton-principal:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* ===== SECCIÓN OFERTAS ===== */
.ofertas-seccion {
  background: var(--blanco-crema);
}

.ofertas-header {
  text-align: center;
  margin-bottom: var(--espaciado-xl);
  padding-bottom: var(--espaciado-lg);
  border-bottom: 2px solid var(--gris-claro);
}

.ofertas-titulo {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--campo-verde);
  margin-bottom: var(--espaciado-sm);
  font-family: var(--fuente-titulo);
}

.contador-ofertas {
  display: inline-block;
  background: var(--gradiente-dorado);
  color: var(--campo-verde);
  padding: var(--espaciado-sm) var(--espaciado-lg);
  border-radius: var(--radio-completo);
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: var(--sombra-suave);
}

.ofertas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--espaciado-xl);
}

/* ===== TARJETAS DE OFERTAS ===== */
.oferta-tarjeta {
  background: white;
  border-radius: var(--radio-grande);
  overflow: hidden;
  box-shadow: var(--sombra-suave);
  border: 1px solid rgba(45, 80, 22, 0.1);
  transition: var(--transicion-normal);
  position: relative;
}

.oferta-tarjeta:hover {
  transform: translateY(-5px);
  box-shadow: var(--sombra-hover);
}

.mapa-contenedor {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.mapa-overlay {
  position: absolute;
  top: var(--espaciado-sm);
  left: var(--espaciado-sm);
  right: var(--espaciado-sm);
  background: rgba(45, 80, 22, 0.9);
  color: white;
  padding: var(--espaciado-sm) var(--espaciado-md);
  border-radius: var(--radio-medio);
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 10;
  text-align: center;
}

.sin-coordenadas {
  height: 200px;
  background: var(--gradiente-tierra);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--espaciado-lg);
  font-weight: 500;
  font-size: 1rem;
}

.oferta-contenido {
  padding: var(--espaciado-xl);
}

.oferta-titulo {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--campo-verde);
  margin-bottom: var(--espaciado-md);
  display: flex;
  align-items: center;
  gap: var(--espaciado-sm);
}

.icono-cultivo {
  font-size: 1.5rem;
  display: inline-block;
}

.oferta-descripcion {
  color: var(--gris-oscuro);
  margin-bottom: var(--espaciado-lg);
  line-height: 1.5;
}

.oferta-precio {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--dorado-trigo);
}

/* ===== SIDEBAR ===== */
.acciones-sidebar {
  background: linear-gradient(145deg, white, var(--gris-claro));
  position: sticky;
  top: var(--espaciado-lg);
}

.acciones-titulo {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--campo-verde);
  text-align: center;
  margin-bottom: var(--espaciado-xl);
  font-family: var(--fuente-titulo);
}

.boton-accion {
  display: block;
  text-decoration: none;
  margin-bottom: var(--espaciado-lg);
  border-radius: var(--radio-grande);
  padding: var(--espaciado-xl);
  text-align: center;
  transition: var(--transicion-normal);
  box-shadow: var(--sombra-suave);
  position: relative;
  overflow: hidden;
}

.btn-comprar {
  background: var(--gradiente-campo);
  color: white;
}

.btn-vender {
  background: var(--gradiente-dorado);
  color: var(--campo-verde);
}

.boton-accion:hover {
  transform: translateY(-3px);
  box-shadow: var(--sombra-hover);
  text-decoration: none;
}

.btn-comprar:hover {
  color: white;
}

.btn-vender:hover {
  color: var(--campo-verde);
}

.caracteristicas-tarjeta {
  background: var(--blanco-crema);
  padding: var(--espaciado-xl);
  border-radius: var(--radio-grande);
  border: 1px solid rgba(45, 80, 22, 0.1);
}

.caracteristicas-titulo {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--campo-verde);
  margin-bottom: var(--espaciado-lg);
  text-align: center;
}

.caracteristicas-lista {
  list-style: none;
  padding: 0;
}

.caracteristicas-lista li {
  display: flex;
  align-items: flex-start;
  gap: var(--espaciado-md);
  margin-bottom: var(--espaciado-lg);
  padding: var(--espaciado-md);
  background: white;
  border-radius: var(--radio-medio);
  box-shadow: 0 2px 8px rgba(45, 80, 22, 0.05);
  transition: var(--transicion-normal);
}

.caracteristicas-lista li:hover {
  transform: translateX(5px);
  box-shadow: var(--sombra-suave);
}

.caracteristicas-lista li span {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.caracteristicas-lista li strong {
  color: var(--campo-verde);
  font-weight: 600;
}

.caracteristicas-lista li small {
  color: var(--gris-medio);
  font-size: 0.9rem;
}

/* ===== ALERTAS Y MENSAJES ===== */
.alerta-login {
  text-align: center;
  padding: var(--espaciado-xxl);
  background: var(--gradiente-suave);
  border-radius: var(--radio-grande);
  border: 2px solid var(--gris-claro);
}

.alerta-login h3 {
  font-size: 1.8rem;
  color: var(--campo-verde);
  margin-bottom: var(--espaciado-md);
}

.alerta-login p {
  color: var(--gris-oscuro);
  margin-bottom: var(--espaciado-xl);
  font-size: 1.1rem;
}

.boton-login {
  display: inline-block;
  background: var(--gradiente-campo);
  color: white;
  text-decoration: none;
  padding: var(--espaciado-md) var(--espaciado-xl);
  border-radius: var(--radio-completo);
  font-weight: 600;
  font-size: 1.1rem;
  transition: var(--transicion-normal);
  box-shadow: var(--sombra-suave);
}

.boton-login:hover {
  transform: translateY(-2px);
  box-shadow: var(--sombra-hover);
  color: white;
  text-decoration: none;
}

/* ===== LOADING Y ESTADOS ===== */
.loading-container {
  text-align: center;
  padding: var(--espaciado-xxl);
}

.campo-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--gris-claro);
  border-top: 4px solid var(--campo-verde);
  border-radius: 50%;
  animation: campo-spin 1s linear infinite;
  margin: 0 auto var(--espaciado-lg);
}

.loading-text {
  color: var(--oliva-verde);
  font-size: 1.1rem;
  font-style: italic;
}

/* ===== ANIMACIONES ===== */
@keyframes campo-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes campo-brillo {
  0% { opacity: 0.1; }
  100% { opacity: 0.3; }
}

@keyframes location-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* ===== ALERTAS BOOTSTRAP PERSONALIZADAS ===== */
.alert {
  border: none;
  border-radius: var(--radio-medio);
  padding: var(--espaciado-lg);
  margin-bottom: var(--espaciado-lg);
}

.alert-danger {
  background: rgba(220, 53, 69, 0.1);
  color: var(--danger-color);
  border: 2px solid rgba(220, 53, 69, 0.2);
}

.alert-success {
  background: rgba(40, 167, 69, 0.1);
  color: var(--success-color);
  border: 2px solid rgba(40, 167, 69, 0.2);
}

.alert-warning {
  background: rgba(255, 193, 7, 0.1);
  color: var(--warning-color);
  border: 2px solid rgba(255, 193, 7, 0.2);
}

.alert-info {
  background: rgba(23, 162, 184, 0.1);
  color: var(--info-color);
  border: 2px solid rgba(23, 162, 184, 0.2);
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1200px) {
  .titulo-principal {
    font-size: 3rem;
  }
  
  .ofertas-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .campo-container {
    padding: var(--espaciado-md) 0;
  }
  
  .tarjeta-bella {
    padding: var(--espaciado-lg);
    margin-bottom: var(--espaciado-lg);
  }
  
  .campo-formulario {
    grid-template-columns: 1fr;
    gap: var(--espaciado-md);
  }
  
  .ofertas-grid {
    grid-template-columns: 1fr;
    gap: var(--espaciado-lg);
  }
  
  .titulo-principal {
    font-size: 2.5rem;
  }
  
  .formulario-titulo,
  .ofertas-titulo {
    font-size: 1.8rem;
  }
  
  .acciones-titulo {
    font-size: 1.5rem;
  }
}

@media (max-width: 576px) {
  .container-fluid {
    padding-left: var(--espaciado-md);
    padding-right: var(--espaciado-md);
  }
  
  .tarjeta-bella {
    padding: var(--espaciado-md);
  }
  
  .titulo-principal {
    font-size: 2rem;
  }
  
  .boton-principal {
    padding: var(--espaciado-md);
    font-size: 1rem;
  }
  
  .oferta-tarjeta {
    margin: 0 auto;
    max-width: 100%;
  }
  
  .mapa-contenedor,
  .sin-coordenadas {
    height: 150px;
  }
}

/* ===== ACCESIBILIDAD ===== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ===== IMPRESIÓN ===== */
@media print {
  .campo-container {
    background: white;
  }
  
  .tarjeta-bella {
    box-shadow: none;
    border: 1px solid #ccc;
  }
  
  .boton-principal,
  .boton-accion,
  .boton-login {
    display: none;
  }
}

/* ===== UTILIDADES ADICIONALES ===== */
.text-center {
  text-align: center;
}

.d-flex {
  display: flex;
}

.justify-content-between {
  justify-content: space-between;
}

.justify-content-center {
  justify-content: center;
}

.align-items-center {
  align-items: center;
}

.align-items-start {
  align-items: flex-start;
}

.mb-4 {
  margin-bottom: var(--espaciado-xl);
}

.mt-4 {
  margin-top: var(--espaciado-xl);
}

.p-5 {
  padding: var(--espaciado-xxl);
}

/* ===== ESTADOS DE HOVER ESPECÍFICOS ===== */
.input-campo:hover {
  border-color: rgba(107, 142, 35, 0.5);
}

.oferta-tarjeta:hover .icono-cultivo {
  animation: campo-spin 2s ease-in-out infinite;
}

.caracteristicas-lista li:hover span {
  transform: scale(1.2);
  transition: var(--transicion-normal);
}

/* ===== ESTILOS PARA FORMULARIOS ESPECÍFICOS ===== */
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: var(--campo-verde);
  cursor: pointer;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* ===== ESTILOS PARA MAPAS ===== */
.gm-style-iw {
  background: var(--campo-verde) !important;
  color: white !important;
  border-radius: var(--radio-medio) !important;
}

.gm-style-iw-c {
  padding: var(--espaciado-md) !important;
}

/* ===== ESTILOS DE SCROLL PERSONALIZADOS ===== */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--gris-claro);
  border-radius: var(--radio-pequeno);
}

::-webkit-scrollbar-thumb {
  background: var(--oliva-verde);
  border-radius: var(--radio-pequeno);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--campo-verde);
}

/* ===== ESTILOS PARA ELEMENTOS ESPECÍFICOS ===== */
.row {
  margin: 0 -15px;
}

.col-xl-8,
.col-xl-4 {
  padding: 0 15px;
}

@media (min-width: 1200px) {
  .col-xl-8 {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
  
  .col-xl-4 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
}

.g-4 {
  gap: var(--espaciado-xl);
}

/* ===== PÁGINA DE BÚSQUEDA - HEADER Y CONTENEDOR ===== */
.search-header {
  text-align: center;
  margin-bottom: var(--espaciado-xl);
  padding: var(--espaciado-lg);
  background: var(--gradiente-campo);
  border-radius: var(--radio-grande);
  color: white;
  position: relative;
  overflow: hidden;
}

.search-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: campo-brillo 4s ease-in-out infinite alternate;
  pointer-events: none;
}

.search-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--espaciado-sm);
  font-family: var(--fuente-titulo);
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  position: relative;
  z-index: 1;
}

.search-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
  font-style: italic;
  position: relative;
  z-index: 1;
}

/* ===== BARRA DE BÚSQUEDA PRINCIPAL ===== */
.search-main {
  margin-bottom: var(--espaciado-xl);
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: var(--radio-completo);
  box-shadow: var(--sombra-media);
  border: 2px solid rgba(45, 80, 22, 0.1);
  overflow: hidden;
  transition: var(--transicion-normal);
}

.search-input-container:focus-within {
  border-color: var(--oliva-verde);
  box-shadow: var(--sombra-hover);
  transform: translateY(-1px);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: var(--espaciado-lg) var(--espaciado-xl);
  font-size: 1.1rem;
  color: var(--campo-verde);
  background: transparent;
  font-family: var(--fuente-principal);
}

.search-input::placeholder {
  color: var(--gris-medio);
  font-style: italic;
}

.search-icon {
  position: absolute;
  right: var(--espaciado-xl);
  font-size: 1.5rem;
  color: var(--oliva-verde);
  pointer-events: none;
  animation: search-float 3s ease-in-out infinite alternate;
}

@keyframes search-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
}

/* ===== FILTROS DE BÚSQUEDA ===== */
.search-filters {
  background: linear-gradient(135deg, var(--blanco-crema), white);
  border-radius: var(--radio-grande);
  padding: var(--espaciado-xl);
  border: 1px solid rgba(45, 80, 22, 0.1);
  box-shadow: var(--sombra-suave);
  position: relative;
}

.search-filters::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradiente-dorado);
  border-radius: var(--radio-grande) var(--radio-grande) 0 0;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--espaciado-lg);
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--espaciado-sm);
  position: relative;
}

.filter-label {
  font-weight: 600;
  color: var(--campo-verde);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: var(--espaciado-sm);
}

.filter-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: white;
  border: 2px solid var(--gris-claro);
  border-radius: var(--radio-medio);
  padding: var(--espaciado-md) var(--espaciado-xl) var(--espaciado-md) var(--espaciado-lg);
  font-size: 1rem;
  color: var(--campo-verde);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transicion-normal);
  position: relative;
  background-image: linear-gradient(45deg, transparent 50%, var(--oliva-verde) 50%), 
                    linear-gradient(135deg, var(--oliva-verde) 50%, transparent 50%);
  background-position: calc(100% - 20px) center, calc(100% - 15px) center;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
}

.filter-select:focus {
  outline: none;
  border-color: var(--oliva-verde);
  box-shadow: 0 0 0 3px rgba(107, 142, 35, 0.1);
  transform: translateY(-1px);
}

.filter-select:hover {
  border-color: rgba(107, 142, 35, 0.5);
  background-color: var(--blanco-crema);
}

/* ===== RANGO DE PRECIOS ===== */
.price-range {
  min-width: 250px;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: var(--espaciado-md);
}

.price-input {
  flex: 1;
  padding: var(--espaciado-md);
  border: 2px solid var(--gris-claro);
  border-radius: var(--radio-medio);
  font-size: 1rem;
  text-align: center;
  color: var(--campo-verde);
  font-weight: 500;
  transition: var(--transicion-normal);
  background: white;
}

.price-input:focus {
  outline: none;
  border-color: var(--oliva-verde);
  box-shadow: 0 0 0 2px rgba(107, 142, 35, 0.1);
  transform: translateY(-1px);
}

.price-input::placeholder {
  color: var(--gris-medio);
  font-weight: normal;
}

.price-separator {
  color: var(--gris-medio);
  font-weight: bold;
  font-size: 1.2rem;
}

/* ===== CHECKBOX PERSONALIZADO ===== */
.checkbox-group {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--espaciado-md);
  cursor: pointer;
  font-weight: 600;
  color: var(--campo-verde);
  margin: 0;
  user-select: none;
  transition: var(--transicion-normal);
}

.checkbox-label:hover {
  transform: translateY(-1px);
}

.filter-checkbox {
  width: 20px;
  height: 20px;
  accent-color: var(--campo-verde);
  cursor: pointer;
  transform: scale(1.2);
}

.checkbox-text {
  font-size: 1rem;
  white-space: nowrap;
}

/* ===== BOTÓN LIMPIAR FILTROS ===== */
.clear-filters-btn {
  background: transparent;
  border: 2px solid var(--gris-medio);
  color: var(--gris-medio);
  border-radius: var(--radio-completo);
  padding: var(--espaciado-md) var(--espaciado-lg);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transicion-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--espaciado-sm);
  font-size: 1rem;
  min-height: 50px;
  white-space: nowrap;
}

.clear-filters-btn:hover {
  border-color: var(--campo-verde);
  color: var(--campo-verde);
  transform: translateY(-2px);
  box-shadow: var(--sombra-suave);
  background: rgba(45, 80, 22, 0.05);
}

.clear-filters-btn:active {
  transform: translateY(0);
}

/* ===== RESUMEN DE RESULTADOS ===== */
.search-results-summary {
  margin-top: var(--espaciado-xl);
  padding: var(--espaciado-lg);
  background: var(--gradiente-dorado);
  border-radius: var(--radio-medio);
  display: flex;
  flex-direction: column;
  gap: var(--espaciado-sm);
  box-shadow: var(--sombra-suave);
  position: relative;
  overflow: hidden;
}

.search-results-summary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: var(--transicion-lenta);
}

.search-results-summary:hover::before {
  left: 100%;
}

.results-count {
  font-weight: 700;
  color: var(--campo-verde);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: var(--espaciado-sm);
}

.location-info {
  font-size: 0.95rem;
  color: var(--campo-verde);
  font-style: italic;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: var(--espaciado-sm);
}

/* ===== INFORMACIÓN DE DISTANCIA EN MAPAS ===== */
.distance-info {
  margin-top: var(--espaciado-xs);
  font-size: 0.85rem;
  background: rgba(255,255,255,0.2);
  padding: var(--espaciado-xs) var(--espaciado-sm);
  border-radius: var(--radio-pequeño);
  backdrop-filter: blur(5px);
}

/* ===== RESPONSIVE PARA BÚSQUEDA ===== */
@media (max-width: 992px) {
  .filter-row {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--espaciado-md);
  }
  
  .search-title {
    font-size: 1.8rem;
  }
  
  .price-range {
    min-width: 200px;
  }
}

@media (max-width: 768px) {
  .search-filters {
    padding: var(--espaciado-lg);
  }
  
  .filter-row {
    grid-template-columns: 1fr;
    gap: var(--espaciado-md);
  }
  
  .search-title {
    font-size: 1.6rem;
  }
  
  .search-input {
    padding: var(--espaciado-md) var(--espaciado-lg);
    font-size: 1rem;
  }
  
  .price-inputs {
    flex-direction: column;
    gap: var(--espaciado-sm);
  }
  
  .price-separator {
    transform: rotate(90deg);
  }
  
  .search-results-summary {
    text-align: center;
  }
  
  .results-count,
  .location-info {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .search-header {
    padding: var(--espaciado-md);
  }
  
  .search-title {
    font-size: 1.4rem;
  }
  
  .search-subtitle {
    font-size: 1rem;
  }
  
  .search-input {
    font-size: 0.95rem;
  }
  
  .filter-select,
  .price-input {
    font-size: 0.9rem;
  }
  
  .clear-filters-btn {
    width: 100%;
  }
}

/* ===== ESTADOS ESPECIALES ===== */
.filter-group.active .filter-select,
.filter-group.active .price-input {
  border-color: var(--oliva-verde);
  background: rgba(107, 142, 35, 0.05);
}

.search-input-container.searching {
  animation: busqueda-pulse 1.5s ease-in-out infinite;
}

.search-input-container.searching .search-icon {
  animation: campo-spin 2s linear infinite;
}

/* ===== BARRA DE BÚSQUEDA ===== */
.barra-busqueda {
  background: white;
  border-radius: var(--radio-completo);
  padding: var(--espaciado-sm);
  box-shadow: var(--sombra-media);
  border: 2px solid rgba(45, 80, 22, 0.1);
  margin-bottom: var(--espaciado-xl);
  position: relative;
  overflow: hidden;
  transition: var(--transicion-normal);
}

.barra-busqueda::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(107, 142, 35, 0.1), transparent);
  transition: var(--transicion-lenta);
}

.barra-busqueda:focus-within::before {
  left: 100%;
}

.barra-busqueda:focus-within {
  border-color: var(--oliva-verde);
  box-shadow: var(--sombra-hover);
  transform: translateY(-2px);
}

.contenedor-busqueda {
  display: flex;
  align-items: center;
  gap: var(--espaciado-md);
  position: relative;
  z-index: 1;
}

.icono-busqueda {
  font-size: 1.2rem;
  color: var(--oliva-verde);
  flex-shrink: 0;
  margin-left: var(--espaciado-md);
}

.input-busqueda {
  flex: 1;
  border: none;
  outline: none;
  padding: var(--espaciado-md) var(--espaciado-sm);
  font-size: 1rem;
  color: var(--campo-verde);
  background: transparent;
  font-family: var(--fuente-principal);
}

.input-busqueda::placeholder {
  color: var(--gris-medio);
  font-style: italic;
}

.boton-buscar {
  background: var(--gradiente-campo);
  color: white;
  border: none;
  border-radius: var(--radio-completo);
  padding: var(--espaciado-md) var(--espaciado-xl);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transicion-normal);
  display: flex;
  align-items: center;
  gap: var(--espaciado-sm);
  font-size: 1rem;
  box-shadow: 0 2px 10px rgba(45, 80, 22, 0.2);
  position: relative;
  overflow: hidden;
}

.boton-buscar::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: var(--transicion-normal);
}

.boton-buscar:hover::before {
  left: 100%;
}

.boton-buscar:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(45, 80, 22, 0.3);
}

.boton-buscar:active {
  transform: scale(0.98);
}

/* Barra de búsqueda compacta para páginas internas */
.barra-busqueda-compacta {
  max-width: 500px;
  margin: 0 auto var(--espaciado-lg);
}

.barra-busqueda-compacta .contenedor-busqueda {
  padding: var(--espaciado-sm);
}

.barra-busqueda-compacta .input-busqueda {
  padding: var(--espaciado-sm);
}

.barra-busqueda-compacta .boton-buscar {
  padding: var(--espaciado-sm) var(--espaciado-lg);
  font-size: 0.9rem;
}

/* Barra de búsqueda en header */
.header-busqueda {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(253, 253, 248, 0.95);
  backdrop-filter: blur(10px);
  padding: var(--espaciado-lg) 0;
  border-bottom: 1px solid rgba(45, 80, 22, 0.1);
}

/* Sugerencias de búsqueda */
.sugerencias-busqueda {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: var(--radio-medio);
  box-shadow: var(--sombra-media);
  border: 1px solid rgba(45, 80, 22, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: var(--espaciado-sm);
}

.sugerencia-item {
  padding: var(--espaciado-md) var(--espaciado-lg);
  border-bottom: 1px solid var(--gris-claro);
  cursor: pointer;
  transition: var(--transicion-rapida);
  display: flex;
  align-items: center;
  gap: var(--espaciado-md);
}

.sugerencia-item:hover {
  background: var(--gris-claro);
  color: var(--campo-verde);
}

.sugerencia-item:last-child {
  border-bottom: none;
}

.sugerencia-icono {
  color: var(--oliva-verde);
  font-size: 1rem;
}

.sugerencia-texto {
  flex: 1;
}

.sugerencia-categoria {
  font-size: 0.8rem;
  color: var(--gris-medio);
  font-style: italic;
}

/* Filtros de búsqueda avanzada */
.filtros-busqueda {
  background: white;
  border-radius: var(--radio-grande);
  padding: var(--espaciado-xl);
  margin-bottom: var(--espaciado-xl);
  box-shadow: var(--sombra-suave);
  border: 1px solid rgba(45, 80, 22, 0.1);
}

.filtros-titulo {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--campo-verde);
  margin-bottom: var(--espaciado-lg);
  display: flex;
  align-items: center;
  gap: var(--espaciado-sm);
}

.filtros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--espaciado-lg);
}

.filtro-grupo {
  display: flex;
  flex-direction: column;
  gap: var(--espaciado-sm);
}

.filtro-etiqueta {
  font-weight: 600;
  color: var(--campo-verde);
  font-size: 0.9rem;
}

.filtro-select {
  padding: var(--espaciado-sm) var(--espaciado-md);
  border: 2px solid var(--gris-claro);
  border-radius: var(--radio-medio);
  background: white;
  color: var(--campo-verde);
  font-size: 0.9rem;
  transition: var(--transicion-normal);
}

.filtro-select:focus {
  outline: none;
  border-color: var(--oliva-verde);
  box-shadow: 0 0 0 2px rgba(107, 142, 35, 0.1);
}

.filtro-rango {
  display: flex;
  align-items: center;
  gap: var(--espaciado-sm);
}

.filtro-rango input {
  flex: 1;
  padding: var(--espaciado-sm);
  border: 2px solid var(--gris-claro);
  border-radius: var(--radio-medio);
  font-size: 0.9rem;
}

.filtro-rango span {
  color: var(--gris-medio);
  font-weight: 500;
}

.limpiar-filtros {
  background: transparent;
  border: 2px solid var(--gris-medio);
  color: var(--gris-medio);
  border-radius: var(--radio-completo);
  padding: var(--espaciado-sm) var(--espaciado-lg);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transicion-normal);
  margin-top: var(--espaciado-lg);
}

.limpiar-filtros:hover {
  border-color: var(--campo-verde);
  color: var(--campo-verde);
}

/* ===== FILTROS DE ORDENACIÓN AVANZADOS ===== */
.filtros-ordenacion {
  background: linear-gradient(135deg, white, var(--blanco-crema));
  border-radius: var(--radio-grande);
  padding: var(--espaciado-xl);
  margin-bottom: var(--espaciado-xl);
  box-shadow: var(--sombra-suave);
  border: 1px solid rgba(45, 80, 22, 0.1);
  position: relative;
  overflow: hidden;
}

.filtros-ordenacion::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradiente-dorado);
  border-radius: var(--radio-grande) var(--radio-grande) 0 0;
}

.ordenacion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--espaciado-lg);
  padding-bottom: var(--espaciado-md);
  border-bottom: 1px solid var(--gris-claro);
}

.ordenacion-titulo {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--campo-verde);
  display: flex;
  align-items: center;
  gap: var(--espaciado-sm);
}

.resultados-count {
  font-weight: 600;
  color: var(--campo-verde);
  background: var(--gradiente-dorado);
  padding: var(--espaciado-sm) var(--espaciado-lg);
  border-radius: var(--radio-completo);
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(218, 165, 32, 0.3);
}

/* Contenedor principal de ordenación */
.ordenacion-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--espaciado-lg);
  align-items: end;
}

.ordenar-grupo {
  display: flex;
  flex-direction: column;
  gap: var(--espaciado-sm);
}

.ordenar-etiqueta {
  font-weight: 600;
  color: var(--campo-verde);
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: var(--espaciado-sm);
}

/* Select personalizado con estilo rural */
.ordenar-select-wrapper {
  position: relative;
  display: inline-block;
}

.ordenar-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: white;
  border: 2px solid var(--gris-claro);
  border-radius: var(--radio-medio);
  padding: var(--espaciado-md) var(--espaciado-xl) var(--espaciado-md) var(--espaciado-lg);
  font-size: 1rem;
  color: var(--campo-verde);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transicion-normal);
  min-width: 200px;
  background-image: none;
}

.ordenar-select:focus {
  outline: none;
  border-color: var(--oliva-verde);
  box-shadow: 0 0 0 3px rgba(107, 142, 35, 0.1);
  transform: translateY(-1px);
}

.ordenar-select:hover {
  border-color: rgba(107, 142, 35, 0.5);
  background: var(--blanco-crema);
}

/* Flecha personalizada para select */
.ordenar-select-wrapper::after {
  content: '🌾';
  position: absolute;
  right: var(--espaciado-md);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 1.2rem;
  transition: var(--transicion-normal);
}

.ordenar-select-wrapper:hover::after {
  transform: translateY(-50%) rotate(10deg);
}

/* Botones de vista (grid/lista) */
.vista-botones {
  display: flex;
  background: var(--gris-claro);
  border-radius: var(--radio-medio);
  padding: 2px;
  gap: 2px;
}

.boton-vista {
  background: transparent;
  border: none;
  padding: var(--espaciado-sm) var(--espaciado-md);
  border-radius: calc(var(--radio-medio) - 2px);
  cursor: pointer;
  transition: var(--transicion-normal);
  color: var(--gris-medio);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
}

.boton-vista:hover {
  color: var(--campo-verde);
  background: rgba(45, 80, 22, 0.1);
}

.boton-vista.activo {
  background: white;
  color: var(--campo-verde);
  box-shadow: var(--sombra-suave);
  font-weight: 600;
}

/* Filtros rápidos con chips */
.filtros-rapidos {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaciado-sm);
  margin-top: var(--espaciado-lg);
  padding-top: var(--espaciado-lg);
  border-top: 1px solid var(--gris-claro);
}

.filtro-chip {
  background: var(--gradiente-suave);
  border: 2px solid var(--gris-claro);
  border-radius: var(--radio-completo);
  padding: var(--espaciado-sm) var(--espaciado-lg);
  cursor: pointer;
  transition: var(--transicion-normal);
  font-size: 0.9rem;
  color: var(--campo-verde);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: var(--espaciado-sm);
  user-select: none;
}

.filtro-chip:hover {
  border-color: var(--oliva-verde);
  transform: translateY(-1px);
  box-shadow: var(--sombra-suave);
}

.filtro-chip.activo {
  background: var(--gradiente-campo);
  color: white;
  border-color: var(--campo-verde);
}

.filtro-chip.activo:hover {
  color: white;
}

.chip-remove {
  background: rgba(255,255,255,0.3);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  cursor: pointer;
  transition: var(--transicion-rapida);
}

.chip-remove:hover {
  background: rgba(255,255,255,0.5);
}

/* Rango de precios visual */
.rango-precio {
  display: flex;
  flex-direction: column;
  gap: var(--espaciado-md);
}

.rango-inputs {
  display: flex;
  align-items: center;
  gap: var(--espaciado-md);
}

.rango-input {
  flex: 1;
  padding: var(--espaciado-sm) var(--espaciado-md);
  border: 2px solid var(--gris-claro);
  border-radius: var(--radio-medio);
  font-size: 0.9rem;
  text-align: center;
  color: var(--campo-verde);
  font-weight: 500;
}

.rango-separador {
  color: var(--gris-medio);
  font-weight: bold;
}

.rango-slider {
  position: relative;
  height: 6px;
  background: var(--gris-claro);
  border-radius: 3px;
  margin: var(--espaciado-md) 0;
}

.rango-track {
  height: 100%;
  background: var(--gradiente-campo);
  border-radius: 3px;
  position: absolute;
}

/* Ordenación por cercanía */
.ordenar-ubicacion {
  display: flex;
  align-items: center;
  gap: var(--espaciado-md);
  padding: var(--espaciado-md);
  background: var(--blanco-crema);
  border-radius: var(--radio-medio);
  border: 1px solid rgba(45, 80, 22, 0.1);
  margin-top: var(--espaciado-md);
}

.ubicacion-toggle {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.ubicacion-toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--gris-claro);
  transition: var(--transicion-normal);
  border-radius: 30px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: var(--transicion-normal);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

input:checked + .toggle-slider {
  background: var(--gradiente-campo);
}

input:checked + .toggle-slider:before {
  transform: translateX(30px);
}

.ubicacion-texto {
  flex: 1;
  color: var(--campo-verde);
  font-weight: 500;
}

/* Botón de limpiar filtros mejorado */
.limpiar-filtros {
  background: transparent;
  border: 2px solid var(--gris-medio);
  color: var(--gris-medio);
  border-radius: var(--radio-completo);
  padding: var(--espaciado-sm) var(--espaciado-lg);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transicion-normal);
  display: flex;
  align-items: center;
  gap: var(--espaciado-sm);
  font-size: 0.9rem;
  justify-self: center;
}

.limpiar-filtros:hover {
  border-color: var(--campo-verde);
  color: var(--campo-verde);
  transform: translateY(-1px);
  box-shadow: var(--sombra-suave);
}

/* Estados de filtros activos */
.filtros-activos {
  background: var(--gradiente-dorado);
  color: var(--campo-verde);
}

.filtros-activos .ordenacion-titulo::after {
  content: '●';
  color: var(--success-color);
  margin-left: var(--espaciado-sm);
  animation: campo-brillo 2s ease-in-out infinite alternate;
}

/* Responsive para filtros */
@media (max-width: 992px) {
  .ordenacion-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--espaciado-md);
  }
  
  .ordenacion-header {
    flex-direction: column;
    gap: var(--espaciado-md);
    align-items: stretch;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .filtros-ordenacion {
    padding: var(--espaciado-lg);
  }
  
  .ordenacion-container {
    grid-template-columns: 1fr;
    gap: var(--espaciado-md);
  }
  
  .filtros-rapidos {
    justify-content: center;
  }
  
  .vista-botones {
    justify-self: center;
    width: fit-content;
  }
  
  .ordenar-select {
    min-width: 100%;
  }
  
  .rango-inputs {
    flex-direction: column;
    gap: var(--espaciado-sm);
  }
  
  .rango-separador {
    transform: rotate(90deg);
  }
}

/* Resultados de búsqueda - Header mejorado */
.resultados-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--espaciado-lg);
  padding: var(--espaciado-lg);
  background: linear-gradient(135deg, var(--blanco-crema), white);
  border-radius: var(--radio-medio);
  border: 1px solid rgba(45, 80, 22, 0.1);
  box-shadow: var(--sombra-suave);
}

/* No hay resultados */
.sin-resultados {
  text-align: center;
  padding: var(--espaciado-xxl);
  color: var(--gris-medio);
}

.sin-resultados-icono {
  font-size: 4rem;
  margin-bottom: var(--espaciado-lg);
  opacity: 0.5;
}

.sin-resultados h3 {
  color: var(--campo-verde);
  margin-bottom: var(--espaciado-md);
}

.sin-resultados p {
  font-style: italic;
  margin-bottom: var(--espaciado-lg);
}

/* Búsqueda rápida en móvil */
@media (max-width: 768px) {
  .barra-busqueda {
    margin-bottom: var(--espaciado-lg);
  }
  
  .contenedor-busqueda {
    flex-direction: column;
    gap: var(--espaciado-sm);
  }
  
  .boton-buscar {
    width: 100%;
    justify-content: center;
  }
  
  .filtros-grid {
    grid-template-columns: 1fr;
    gap: var(--espaciado-md);
  }
  
  .resultados-header {
    flex-direction: column;
    gap: var(--espaciado-md);
    text-align: center;
  }
  
  .sugerencias-busqueda {
    position: fixed;
    top: auto;
    bottom: 0;
    left: var(--espaciado-md);
    right: var(--espaciado-md);
    border-radius: var(--radio-grande) var(--radio-grande) 0 0;
    max-height: 50vh;
  }
}

/* Animaciones específicas para búsqueda */
@keyframes busqueda-pulse {
  0%, 100% { 
    box-shadow: 0 0 0 0 rgba(107, 142, 35, 0.4);
  }
  50% { 
    box-shadow: 0 0 0 10px rgba(107, 142, 35, 0);
  }
}

.buscando .boton-buscar {
  animation: busqueda-pulse 1.5s ease-in-out infinite;
}

.buscando .boton-buscar::after {
  content: '⏳';
  margin-left: var(--espaciado-sm);
}

/* Estados de carga para búsqueda */
.resultados-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--espaciado-xxl);
  gap: var(--espaciado-lg);
}

.busqueda-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--gris-claro);
  border-top: 3px solid var(--campo-verde);
  border-radius: 50%;
  animation: campo-spin 1s linear infinite;
}

/* FOCUS VISIBLE PARA ACCESIBILIDAD */
.boton-principal:focus-visible,
.boton-accion:focus-visible,
.input-campo:focus-visible,
.input-busqueda:focus-visible,
.boton-buscar:focus-visible {
  outline: 3px solid var(--campo-verde);
  outline-offset: 2px;
}
`;