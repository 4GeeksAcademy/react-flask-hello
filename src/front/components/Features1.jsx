import React from "react";
import "./Features1.css";
import { Link } from "react-router-dom";

export const Features1 = () => {
  return (
    <section className="features1">
      <div className="features1-container">
        <div className="features1-images">
          <img src="https://cdn-icons-png.flaticon.com/512/3594/3594363.png" alt="Shopping icon 1" />
          <img src="https://cdn-icons-png.flaticon.com/512/8118/8118910.png" alt="Shopping icon 2" />
          <img src="https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/1024px/1f6cd.png" alt="Shopping icon 3" />
          <img src="https://img.freepik.com/vector-premium/muestra-abierta-plantilla-icono-tienda_917138-797.jpg?semt=ais_hybrid&w=740&q=80" alt="Shopping list concept" />
        </div>

        <div className="features1-content">
          <h2>Tu completa experiencia de compra</h2>
          <p>
            Desde la busqueda al pago , hemos prestado atención a cada detalle.
          </p>

          <ul>
            <li>
              <span className="number">1</span>
              <div>
                <h4>Busca Productos</h4>
                <p>Explora el catálogo y encuentra lo que buscas.</p>
              </div>
            </li>

            <li>
              <span className="number">2</span>
              <div>
                <h4>Utiliza un QR para compartir el producto</h4>
                <p>Comparte por placer o para expandir tu comercio.</p>
              </div>
            </li>

            <li>
              <span className="number">3</span>
              <div>
                <h4>Pagos Seguros</h4>
                <p>Completa tus compras con la seguridad que mereces.</p>
              </div>
            </li>
          </ul>
          <Link className="btn btn-danger" to="/explorar">Empieza a comprar</Link>
          
          
        </div>
      </div>
    </section>
  );
};
