export const beautifulStyles = `
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
.search-header {
  text-align: center;
  margin-bottom: 2rem;
}

.search-title {
  color: var(--campo-verde);
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

.search-subtitle {
  color: var(--oliva-verde);
  font-size: 1.1rem;
  font-style: italic;
  margin: 0;
}

/* Input principal de búsqueda */
.search-main {
  margin-bottom: 1.5rem;
}

.search-input-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem 1rem 3.5rem;
  border: 3px solid rgba(107, 142, 35, 0.3);
  border-radius: 25px;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(107, 142, 35, 0.1);
}

.search-input:focus {
  outline: none;
  border-color: var(--campo-verde);
  box-shadow: 0 6px 25px rgba(45, 80, 22, 0.2);
  transform: translateY(-2px);
}

.search-input::placeholder {
  color: rgba(107, 142, 35, 0.7);
  font-style: italic;
}

.search-icon {
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.4rem;
  pointer-events: none;
}

/* Contenedor de filtros */
.search-filters {
  border-top: 2px solid rgba(107, 142, 35, 0.1);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: end;
  justify-content: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 140px;
}

.filter-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--campo-verde);
  margin-bottom: 0.3rem;
  white-space: nowrap;
}

.filter-select {
  padding: 0.6rem 0.8rem;
  border: 2px solid rgba(107, 142, 35, 0.3);
  border-radius: 12px;
  background: white;
  font-size: 0.95rem;
  color: var(--campo-verde);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: var(--campo-verde);
  box-shadow: 0 0 10px rgba(107, 142, 35, 0.2);
}

.filter-select:hover {
  border-color: var(--oliva-verde);
}

/* Grupo de rango de precios */
.price-range .price-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-input {
  width: 70px;
  padding: 0.6rem 0.5rem;
  border: 2px solid rgba(107, 142, 35, 0.3);
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
  background: white;
  transition: all 0.2s ease;
}

.price-input:focus {
  outline: none;
  border-color: var(--campo-verde);
  box-shadow: 0 0 8px rgba(107, 142, 35, 0.2);
}

.price-separator {
  color: var(--oliva-verde);
  font-weight: bold;
  font-size: 1.1rem;
}

/* Checkbox group */
.checkbox-group {
  justify-content: center;
  margin-top: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  background: rgba(107, 142, 35, 0.05);
  border: 2px solid rgba(107, 142, 35, 0.2);
  transition: all 0.2s ease;
  margin: 0;
}

.checkbox-label:hover {
  background: rgba(107, 142, 35, 0.1);
  border-color: var(--oliva-verde);
}

.filter-checkbox {
  width: 18px;
  height: 18px;
  accent-color: var(--campo-verde);
  cursor: pointer;
}

.checkbox-text {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--campo-verde);
  white-space: nowrap;
}

/* Botón limpiar filtros */
.clear-filters-btn {
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  margin-top: 0.5rem;
}

.clear-filters-btn:hover {
  transform: translateY(-2px);

`;