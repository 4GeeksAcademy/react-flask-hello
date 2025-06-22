import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/tarifas.css";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";
const Tarifas = () => {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const [eleccionSeleccionada, setEleccionSeleccionada] = useState(null);
  const { store, dispatch } = useGlobalReducer();
  const imagenPorDefecto = "https://img.freepik.com/fotos-premium/pareja-deportiva-relajarse-mostrador-bar-gimnasio-despues-entrenamiento-fisico_266732-28571.jpg";

  const opciones = store.tarifas

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (tipo) {
      const plan = opciones.find(op => op.id === tipo.toLowerCase());
      if (plan) setEleccionSeleccionada(plan);
    }
  }, [tipo]);

  const handleSelectPlan = () => {
    setEleccionSeleccionada(eleccionSeleccionada);
    localStorage.setItem("tarifa", JSON.stringify(eleccionSeleccionada));
    window.scrollTo(0, 0);
    dispatch({
      type: "set_tarifa",
      payload: eleccionSeleccionada
    });
    navigate("/checkout");
  };

  return (
    <div className="tarifas-container">
      <h1 className="titulo-tarifas">Tarifas</h1>

      <div className="grid-opciones">
        {opciones.map((plan, i) => (
          <div
            key={i}
            className={`opciones-item ${eleccionSeleccionada?.id === plan.id ? "activo" : ""}`}
            onClick={() => setEleccionSeleccionada(plan)}
          >
            {plan.nombre}
          </div>
        ))}
      </div>

      {!eleccionSeleccionada && (
        <div className="imagen-por-defecto">
          <img src={imagenPorDefecto} alt="Imagen por defecto" />
        </div>
      )}

      {eleccionSeleccionada && (
        eleccionSeleccionada.id === "dmpc" ? (
          <div className="detalle-opciones detalle-dmpc">
            <div className="columna-dmpc imagen-lateral">
              <img
                src="https://img.freepik.com/foto-gratis/retrato-mujer-sonriente-forma-sosteniendo-manzana-bascula-sobre-fondo-blanco_662251-2931.jpg"
                alt="Imagen lateral izquierda"
                className="imagen-basic"
              />
            </div>

            <div className="columna-dmpc centro-dmpc">
              <div className="cabecera-dmpc">
                <h2>{eleccionSeleccionada.nombre}</h2>
                <h3 className="precio-tarifa">{eleccionSeleccionada.precio}</h3>
              </div>
              <p className="descripcion-tarifa">{eleccionSeleccionada.descripcion}</p>

              <div className="grid-beneficios">
                {[
                  ...opciones[0].beneficios,
                  ...opciones[1].beneficios,
                  ...eleccionSeleccionada.beneficios
                ].map((item, i) => (
                  <div key={i} className="item-beneficio"> {item}</div>
                ))}
              </div>
            </div>

            <div className="columna-dmpc imagen-lateral">
              <img
                src={eleccionSeleccionada.imagenes[0]}
                alt="Imagen lateral derecha"
                className="imagen-basic"
              />
            </div>
          </div>
        ) : (
          <div className="detalle-opciones detalle-basic">
            <div className="columna-basic">
              <h2>{eleccionSeleccionada.nombre}</h2>
              <p className="descripcion-tarifa">{eleccionSeleccionada.descripcion}</p>
              <h3 className="precio-tarifa">{eleccionSeleccionada.precio}</h3>
              <ul className="lista-beneficios">
                {eleccionSeleccionada.beneficios.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="columna-basic imagen-central">
              <img
                src={eleccionSeleccionada.imagenes[0]}
                alt={`Imagen ${eleccionSeleccionada.nombre}`}
                className="imagen-basic"
              />
            </div>

            {eleccionSeleccionada.exclusiones && (
              <div className="columna-basic exclusiones">
                <h4>Este plan NO incluye:</h4>
                <ul className="lista-exclusiones">
                  {eleccionSeleccionada.exclusiones.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

              </div>
            )}


          </div>
        )
      )}
      <div className="d-flex justify-content-center mt-4">

        <button onClick={handleSelectPlan} className="btn-comprar-tarifa">
          Comprar {eleccionSeleccionada?.nombre}
        </button>

      </div>
    </div>
  );
};

export default Tarifas;
