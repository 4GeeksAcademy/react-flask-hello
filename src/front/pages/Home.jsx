import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { APIProvider, useMap, Map } from '@vis.gl/react-google-maps';
import {AdvancedMarker} from '@vis.gl/react-google-maps';

const beautifulStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
  
  :root {
    --campo-verde: #2d5016;
    --trigo-dorado: #f4d03f;
    --tierra-marron: #8b4513;
    --cielo-azul: #87ceeb;
    --sol-naranja: #ff8c42;
    --oliva-verde: #6b8e23;
    --lavanda: #e6e6fa;
    --rosa-primavera: #ffb3ba;
    --crema: #fef9e7;
  }

  * {
    box-sizing: border-box;
  }

  .campo-container {
    background: 
      linear-gradient(135deg, 
        #fef9e7 0%, 
        #f8f4e6 20%, 
        #e8f5e8 40%, 
        #e6f3ff 60%, 
        #fff8dc 80%, 
        #fef9e7 100%
      );
    min-height: 100vh;
    position: relative;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }

  .campo-container::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f4d03f' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm15 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 1;
  }

  .campo-header {
    background: 
      linear-gradient(135deg, rgba(45, 80, 22, 0.95) 0%, rgba(107, 142, 35, 0.9) 100%),
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f4d03f' fill-opacity='0.1'%3E%3Cpath d='M50 10c22.091 0 40 17.909 40 40S72.091 90 50 90 10 72.091 10 50 27.909 10 50 10zm0 5c19.33 0 35 15.67 35 35S69.33 85 50 85 15 69.33 15 50 30.67 15 50 15z'/%3E%3C/g%3E%3C/svg%3E");
    padding: 4rem 0;
    text-align: center;
    color: white;
    position: relative;
    z-index: 10;
    margin-bottom: 3rem;
    box-shadow: 0 8px 32px rgba(45, 80, 22, 0.3);
  }

  .campo-header::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-top: 20px solid var(--oliva-verde);
  }

  .titulo-principal {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    position: relative;
  }

  .titulo-principal::before {
    content: '🌾';
    position: absolute;
    left: -60px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3rem;
    animation: wheat-sway 3s ease-in-out infinite;
  }

  .titulo-principal::after {
    content: '🌾';
    position: absolute;
    right: -60px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3rem;
    animation: wheat-sway 3s ease-in-out infinite reverse;
  }

  @keyframes wheat-sway {
    0%, 100% { transform: translateY(-50%) rotate(-5deg); }
    50% { transform: translateY(-50%) rotate(5deg); }
  }

  .subtitulo {
    font-size: 1.4rem;
    font-weight: 300;
    opacity: 0.95;
    font-style: italic;
  }

  .tarjeta-bella {
    background: 
      linear-gradient(145deg, 
        rgba(255, 255, 255, 0.95) 0%, 
        rgba(254, 249, 231, 0.95) 100%
      );
    border: 2px solid rgba(244, 208, 63, 0.2);
    border-radius: 25px;
    box-shadow: 
      0 20px 40px rgba(0,0,0,0.1),
      0 0 0 1px rgba(255,255,255,0.8),
      inset 0 1px 0 rgba(255,255,255,0.9);
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    z-index: 5;
  }

  .tarjeta-bella::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, 
      var(--campo-verde) 0%, 
      var(--trigo-dorado) 25%, 
      var(--oliva-verde) 50%, 
      var(--sol-naranja) 75%, 
      var(--campo-verde) 100%
    );
  }

  .tarjeta-bella:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 
      0 30px 60px rgba(0,0,0,0.15),
      0 0 0 1px rgba(244, 208, 63, 0.4),
      inset 0 1px 0 rgba(255,255,255,1);
    border-color: var(--trigo-dorado);
  }

  .formulario-seccion {
    padding: 3rem;
    position: relative;
  }

  .formulario-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
  }

  .formulario-titulo {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--campo-verde);
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
  }

  .formulario-titulo::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--trigo-dorado), transparent);
  }

  .formulario-descripcion {
    color: var(--oliva-verde);
    font-size: 1.2rem;
    font-style: italic;
    margin-bottom: 0;
  }

  .campo-formulario {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .grupo-campo {
    position: relative;
  }

  .etiqueta-campo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    font-weight: 600;
    color: var(--campo-verde);
    margin-bottom: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .input-campo {
    width: 100%;
    padding: 1.2rem 1.5rem;
    border: 2px solid rgba(107, 142, 35, 0.2);
    border-radius: 15px;
    font-size: 1.1rem;
    font-family: 'Inter', sans-serif;
    background: 
      linear-gradient(145deg, 
        rgba(255, 255, 255, 0.9) 0%, 
        rgba(254, 249, 231, 0.7) 100%
      );
    transition: all 0.3s ease;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
  }

  .input-campo:focus {
    outline: none;
    border-color: var(--trigo-dorado);
    box-shadow: 
      0 0 0 4px rgba(244, 208, 63, 0.2),
      inset 0 2px 4px rgba(0,0,0,0.05);
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 1);
  }

  .input-campo::placeholder {
    color: rgba(107, 142, 35, 0.6);
    font-style: italic;
  }

  .boton-principal {
    background: 
      linear-gradient(135deg, 
        var(--campo-verde) 0%, 
        var(--oliva-verde) 100%
      );
    border: none;
    padding: 1.5rem 4rem;
    border-radius: 50px;
    color: white;
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 
      0 8px 25px rgba(45, 80, 22, 0.3),
      inset 0 1px 0 rgba(255,255,255,0.2);
    display: block;
    margin: 0 auto;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .boton-principal::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  .boton-principal:hover::before {
    left: 100%;
  }

  .boton-principal:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
      0 15px 35px rgba(45, 80, 22, 0.4),
      inset 0 1px 0 rgba(255,255,255,0.3);
  }

  .ofertas-seccion {
    padding: 6rem;
    padding-top:1rem
    position: relative;
  }

  .ofertas-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
  }

  .ofertas-titulo {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: 700;
    color: var(--campo-verde);
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
  }

  .ofertas-titulo::before {
    content: '🛒';
    position: absolute;
    left: -50px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2.5rem;
    animation: basket-bounce 2s ease-in-out infinite;
  }

  @keyframes basket-bounce {
    0%, 100% { transform: translateY(-50%); }
    50% { transform: translateY(-70%); }
  }

  .contador-ofertas {
    background: var(--trigo-dorado);
    color: var(--campo-verde);
    padding: 8px;
    border-radius: 25px;
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 4px 15px rgba(244, 208, 63, 0.3);
  }

  .ofertas-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 2rem;
    max-height: 70vh;
    overflow-y: auto;
    padding-right: 1rem;
  }

  .ofertas-grid::-webkit-scrollbar {
    width: 12px;
  }

  .ofertas-grid::-webkit-scrollbar-track {
    background: rgba(244, 208, 63, 0.1);
    border-radius: 10px;
  }

  .ofertas-grid::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, var(--trigo-dorado), var(--sol-naranja));
    border-radius: 10px;
    border: 2px solid rgba(255,255,255,0.3);
  }

  .oferta-tarjeta {
    background: 
      linear-gradient(145deg, 
        rgba(255, 255, 255, 0.95) 0%, 
        rgba(254, 249, 231, 0.95) 100%
      );
    border: 2px solid rgba(244, 208, 63, 0.3);
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    box-shadow: 
      0 8px 32px rgba(0,0,0,0.1),
      inset 0 1px 0 rgba(255,255,255,0.8);
  }

  .oferta-tarjeta::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      var(--rosa-primavera) 0%, 
      var(--trigo-dorado) 50%, 
      var(--rosa-primavera) 100%
    );
  }

  .oferta-tarjeta:hover {
    transform: translateY(-8px) rotateX(2deg);
    box-shadow: 
      0 20px 45px rgba(0,0,0,0.15),
      inset 0 1px 0 rgba(255,255,255,1);
    border-color: var(--trigo-dorado);
  }

  .mapa-contenedor {
    height: 220px;
    position: relative;
    background: linear-gradient(135deg, var(--cielo-azul), var(--lavanda));
  }

  .mapa-overlay {
    position: absolute;
    top: 15px;
    left: 15px;
    background: 
      linear-gradient(135deg, 
        rgba(255, 255, 255, 0.95) 0%, 
        rgba(244, 208, 63, 0.9) 100%
      );
    color: var(--campo-verde);
    padding: 10px 18px;
    border-radius: 25px;
    font-weight: 600;
    font-size: 0.9rem;
    z-index: 1000;
    box-shadow: 
      0 4px 15px rgba(0,0,0,0.2),
      inset 0 1px 0 rgba(255,255,255,0.8);
    border: 1px solid rgba(244, 208, 63, 0.3);
    animation: location-pulse 3s ease-in-out infinite;
  }

  @keyframes location-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .oferta-contenido {
    padding: 2rem;
  }

  .oferta-titulo {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--campo-verde);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .oferta-descripcion {
    color: var(--oliva-verde);
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-style: italic;
  }

  .oferta-precio {
    background: 
      linear-gradient(135deg, 
        var(--sol-naranja) 0%, 
        var(--trigo-dorado) 100%
      );
    color: white;
    padding: 12px 24px;
    border-radius: 30px;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 1.3rem;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 
      0 6px 20px rgba(255, 140, 66, 0.4),
      inset 0 1px 0 rgba(255,255,255,0.3);
    position: relative;
    overflow: hidden;
  }

  .oferta-precio::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
    animation: price-shine 4s ease-in-out infinite;
  }

  @keyframes price-shine {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .acciones-sidebar {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .acciones-titulo {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    font-weight: 700;
    text-align: center;
    color: var(--campo-verde);
    margin-bottom: 2rem;
    position: relative;
  }

  .acciones-titulo::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--trigo-dorado), transparent);
  }

  .boton-accion {
    padding: 2.5rem 2rem;
    border-radius: 20px;
    text-decoration: none;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 1.2rem;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    border: 2px solid transparent;
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }

  .boton-accion::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s;
  }

  .boton-accion:hover::before {
    left: 100%;
  }

  .btn-comprar {
    background: 
      linear-gradient(135deg, 
        var(--campo-verde) 0%, 
        var(--oliva-verde) 100%
      );
    color: white;
    margin-bottom: 1.5rem;
  }

  .btn-comprar:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 15px 35px rgba(45, 80, 22, 0.4);
    color: white;
    text-decoration: none;
  }

  .btn-vender {
    background: 
      linear-gradient(135deg, 
        var(--sol-naranja) 0%, 
        var(--trigo-dorado) 100%
      );
    color: white;
  }

  .btn-vender:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 15px 35px rgba(255, 140, 66, 0.4);
    color: white;
    text-decoration: none;
  }

  .caracteristicas-tarjeta {
    background: 
      linear-gradient(145deg, 
        rgba(255, 255, 255, 0.9) 0%, 
        rgba(232, 245, 232, 0.9) 100%
      );
    border: 2px solid rgba(107, 142, 35, 0.2);
    border-radius: 20px;
    padding: 2rem;
    margin-top: 2rem;
    box-shadow: 
      0 8px 25px rgba(0,0,0,0.08),
      inset 0 1px 0 rgba(255,255,255,0.8);
  }

  .caracteristicas-titulo {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--campo-verde);
    text-align: center;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .caracteristicas-lista {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .caracteristicas-lista li {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 0;
    color: var(--oliva-verde);
    font-size: 1rem;
    border-bottom: 1px solid rgba(107, 142, 35, 0.1);
    transition: all 0.3s ease;
  }

  .caracteristicas-lista li:hover {
    color: var(--campo-verde);
    transform: translateX(8px);
    background: rgba(244, 208, 63, 0.05);
    padding-left: 8px;
    border-radius: 8px;
  }

  .caracteristicas-lista li:last-child {
    border-bottom: none;
  }

  .caracteristicas-lista li span:first-child {
    font-size: 1.5rem;
    width: 30px;
    text-align: center;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    color: var(--campo-verde);
  }

  .campo-spinner {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(244, 208, 63, 0.2);
    border-top: 4px solid var(--trigo-dorado);
    border-radius: 50%;
    animation: campo-spin 1.5s linear infinite;
    margin-bottom: 2rem;
    box-shadow: 0 0 20px rgba(244, 208, 63, 0.3);
  }

  @keyframes campo-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    color: var(--oliva-verde);
    text-align: center;
    font-style: italic;
  }

  .alerta-login {
    background: 
      linear-gradient(135deg, 
        rgba(135, 206, 235, 0.1) 0%, 
        rgba(230, 230, 250, 0.1) 100%
      );
    border: 2px solid rgba(135, 206, 235, 0.3);
    border-radius: 20px;
    padding: 3rem;
    text-align: center;
    box-shadow: 
      0 8px 25px rgba(0,0,0,0.08),
      inset 0 1px 0 rgba(255,255,255,0.8);
  }

  .alerta-login h3 {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--campo-verde);
    margin-bottom: 1rem;
  }

  .alerta-login p {
    color: var(--oliva-verde);
    font-size: 1.2rem;
    margin-bottom: 2rem;
    font-style: italic;
  }

  .boton-login {
    background: 
      linear-gradient(135deg, 
        var(--cielo-azul) 0%, 
        var(--lavanda) 100%
      );
    color: var(--campo-verde);
    padding: 1.2rem 2.5rem;
    border-radius: 25px;
    text-decoration: none;
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    display: inline-block;
    box-shadow: 
      0 6px 20px rgba(135, 206, 235, 0.4),
      inset 0 1px 0 rgba(255,255,255,0.8);
    border: 1px solid rgba(135, 206, 235, 0.3);
  }

  .boton-login:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 
      0 10px 25px rgba(135, 206, 235, 0.6),
      inset 0 1px 0 rgba(255,255,255,1);
    color: var(--campo-verde);
    text-decoration: none;
  }

  .sin-coordenadas {
    background: 
      linear-gradient(135deg, 
        rgba(255, 193, 7, 0.1) 0%, 
        rgba(255, 140, 66, 0.1) 100%
      );
    border: 2px solid rgba(255, 193, 7, 0.3);
    border-radius: 15px;
    padding: 1.5rem;
    text-align: center;
    color: var(--campo-verde);
    font-weight: 500;
    margin: 1rem;
    box-shadow: 
      0 4px 15px rgba(255, 193, 7, 0.2),
      inset 0 1px 0 rgba(255,255,255,0.6);
  }

  @media (max-width: 768px) {
    .titulo-principal {
      font-size: 2.5rem;
    }
    
    .titulo-principal::before,
    .titulo-principal::after {
      display: none;
    }
    
    .campo-formulario {
      grid-template-columns: 1fr;
    }
    
    .ofertas-grid {
      grid-template-columns: 1fr;
    }
    
    .acciones-sidebar {
      padding: 2rem;
    }
  }

  .icono-cultivo {
    font-size: 1.8rem;
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
  }
`;

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
        const res = await fetch(`${backendUrl}/api/user/ofertas`);
        
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
      const response = await fetch(`${backendUrl}/api/user/ofertas`, {
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
      const updatedOffers = await fetch(`${backendUrl}/api/user/ofertas`);
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
    <>
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
                      
                      <div className="grupo-campo" style={{gridColumn: '1 / -1'}}>
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
                      
                      <div className="grupo-campo" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <input
                          name="esta_realizada"
                          type="checkbox"
                          checked={form.esta_realizada}
                          onChange={handleChange}
                          disabled={submitting}
                          id="esta_realizada"
                        />
                        <label htmlFor="esta_realizada" className="etiqueta-campo" style={{margin: 0}}>
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
                      <div className="text-center p-5" style={{color: 'var(--campo-verde)'}}>
                        <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🌾</div>
                        <h4>Temporada de Siembra</h4>
                        <p style={{color: 'var(--oliva-verde)', fontSize: '1.1rem', fontStyle: 'italic'}}>
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
                    to="/login" 
                    className="boton-principal"
                    style={{display: 'inline-block', textDecoration: 'none'}}
                  >
                    🔍 Explorar Toda la Cosecha
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
                    <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🛒</div>
                    <div style={{fontSize: '1.6rem', fontWeight: '700', marginBottom: '0.5rem'}}>COMPRAR</div>
                    <div style={{fontSize: '1rem', opacity: '0.9'}}>Productos frescos del agricultor</div>
                    <div style={{fontSize: '0.9rem', opacity: '0.8', marginTop: '0.5rem'}}>
                      Sin intermediarios • Precios justos
                    </div>
                  </div>
                </Link>
                
                <Link to="/login" className="boton-accion btn-vender">
                  <div>
                    <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🌾</div>
                    <div style={{fontSize: '1.6rem', fontWeight: '700', marginBottom: '0.5rem'}}>VENDER</div>
                    <div style={{fontSize: '1rem', opacity: '0.9'}}>Tu cosecha directamente</div>
                    <div style={{fontSize: '0.9rem', opacity: '0.8', marginTop: '0.5rem'}}>
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
                        <strong>Comercio directo</strong><br/>
                        <small>Del campo a tu mesa sin intermediarios</small>
                      </div>
                    </li>
                    <li>
                      <span>🌿</span>
                      <div>
                        <strong>Productos de temporada</strong><br/>
                        <small>Frescos y recién cosechados</small>
                      </div>
                    </li>
                    <li>
                      <span>💰</span>
                      <div>
                        <strong>Precios transparentes</strong><br/>
                        <small>Justos para agricultor y comprador</small>
                      </div>
                    </li>
                    <li>
                      <span>📍</span>
                      <div>
                        <strong>Trazabilidad completa</strong><br/>
                        <small>Conoce el origen de tus alimentos</small>
                      </div>
                    </li>
                    <li>
                      <span>🤝</span>
                      <div>
                        <strong>Comunidad agrícola</strong><br/>
                        <small>Apoya a los productores locales</small>
                      </div>
                    </li>
                    <li>
                      <span>🌍</span>
                      <div>
                        <strong>Sostenibilidad</strong><br/>
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
    </>
  );
};