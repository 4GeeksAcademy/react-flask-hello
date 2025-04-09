import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SeleccionarNegocio.css"


export const SeleccionarNegocio = () => {
  const [buscarNegocio, setBuscarNegocio] = useState ("");

  const negociosRe = [
    "Dentista La Sonrisa",
    "Mecanico Sobre Ruedas",
    "Cafeteria Flow",
    "Consulta Psicologica Daniel"
  ];

  const filtrarNegocios = negociosRe.filter ( negocio =>
    negocio.toLowerCase().includes(buscarNegocio.toLowerCase())
  ); //Filtro de negocios
    return (
      <>
        <div>
          <h5>Buscador:</h5>
          <input type="text" value={buscarNegocio} onChange={(e) => setBuscarNegocio(e.target.value)} />
        </div>
        <div className="row">
          {filtrarNegocios.map((negocio) => (
            <Link to={`/negocios/${negocio.id}`} style={{ textDecoration: 'none' }}>
                <div className="m-2 border border-black card col-3">
                    <card className="m-2">
                        <h5>{negocio}</h5>
                    </card>
                </div>
            </Link>
          ))}
        </div>
      </>
    );
  };