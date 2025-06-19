import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/tarifas.css";

const Tarifas = () => {
  const { tipo } = useParams();
  const [eleccionSeleccionada, setEleccionSeleccionada] = useState(null);

  const imagenPorDefecto = "https://img.freepik.com/fotos-premium/pareja-deportiva-relajarse-mostrador-bar-gimnasio-despues-entrenamiento-fisico_266732-28571.jpg";

  const opciones = [
    {
      id: "basic",
      nombre: "Tarifa Basic",
      descripcion: "Ideal para quienes quieren empezar a moverse. Incluye planes básicos de entrenamiento.",
      precio: "45€/mes",
      beneficios: [
        "Acceso al gimnasio en horario limitado",
        "Plan de entrenamiento general",
        "Acceso eventos deportivos"
      ],
      exclusiones: [
        "Seguimiento nutricional",
        "Clases dirigidas",
        "Asesoramiento personalizado",
        "Acceso a todos los eventos",
        "Invitacion amigos/familiares"
      ],
      imagenes: [
        "https://img.freepik.com/foto-gratis/peso-saludable-cuidado-masculino-atletico_1139-695.jpg"
      ]
    },
    {
      id: "premium",
      nombre: "Tarifa Premium",
      descripcion: "Incluye entrenamiento y nutrición personalizados.",
      precio: "55€/mes",
      beneficios: [
        "Acceso completo al gimnasio sin restricciones horarias",
        "Planes de nutrición personalizados y tabla deportiva",
        "Seguimiento mensual con entrenador",
        "Acceso a clases dirigidas"
      ],
      exclusiones: [
        "Sesiones semanales personalizadas",
        "Acceso prioritario a eventos",
        "Descuentos en productos asociados",
        "Invitacion amigos/familiares"
      ],
      imagenes: [
        "https://img.freepik.com/foto-gratis/mujer-joven-cinta-metrica-cocina_1303-24778.jpg"
      ]
    },
    {
      id: "dmpc",
      nombre: "Tarifa DMPC",
      descripcion: "Acceso completo a todos los servicios y asesoramientos.",
      precio: "65€/mes",
      beneficios: [
        "Todo lo incluido en Premium",
        "Asesoramiento continuo (entrenamiento, nutrición y bienestar)",
        "Sesiones semanales personalizadas",
        "Acceso prioritario a eventos y talleres",
        "Descuentos en productos asociados"
      ],
      exclusiones: [
        "Sin clases ilimitadas 24h",
        "Sin entrenador personal permanente",
        "Sin acceso VIP a instalaciones premium"
      ],
      imagenes: [
        "https://img.freepik.com/foto-gratis/primer-plano-instructor-gimnasia-escribiendo-diario_23-2147827460.jpg?uid=R94462527&ga=GA1.1.2118358263.1748545776&semt=ais_hybrid&w=740"
      ]
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (tipo) {
      const plan = opciones.find(op => op.id === tipo.toLowerCase());
      if (plan) setEleccionSeleccionada(plan);
    }
  }, [tipo]);

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

    </div>
  );
};

export default Tarifas;
