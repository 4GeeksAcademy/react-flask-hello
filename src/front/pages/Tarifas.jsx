import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/tarifas.css";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
const Tarifas = () => {

  const { tipo } = useParams();
  const [eleccionSeleccionada, setEleccionSeleccionada] = useState(null);
  const imagenPorDefecto = "https://img.freepik.com/fotos-premium/pareja-deportiva-relajarse-mostrador-bar-gimnasio-despues-entrenamiento-fisico_266732-28571.jpg";
  const { store, dispatch } = useGlobalReducer();


  const opciones = store.tarifas || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (tipo) {
      const plan = opciones.find(op => op.id === tipo.toLowerCase());
      if (plan) setEleccionSeleccionada(plan);
    }
  }, [tipo]);

  const handleSelectPlan = (plan) => {
    setEleccionSeleccionada(plan);
    window.scrollTo(0, 0);
    dispatch({
      type: "set_tarifa",
      payload: plan
    });
  };

    return (
      <div className="tarifas-container">
        <h1 className="titulo-tarifas">Tarifas</h1>

        <div className="grid-opciones">
          {opciones.map((plan, i) => (
            <div
              key={i}
              className={`opciones-item ${eleccionSeleccionada?.id === plan.id ? "activo" : ""}`}
              onClick={() => handleSelectPlan(plan)}
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
          <div className="detalle-opciones">
            <h2>{eleccionSeleccionada.nombre}</h2>
            <div className="imagenes-grid">
              {eleccionSeleccionada.imagenes.map((img, i) => (
                <img key={i} src={img} alt={`Imagen ${i + 1}`} />
              ))}
            </div>
            <p>{eleccionSeleccionada.descripcion}</p>
            <Link to={'/checkout'} className="btn btn-success"> Comprar {eleccionSeleccionada.nombre} </Link>
          </div>
        )}
      </div>
    );
  };

  export default Tarifas;
