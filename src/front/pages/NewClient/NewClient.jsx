import React from "react";
import "./NewClient.css"
import { ClientForm } from "../../components/ClientForm/ClientForm";

export const NewClient = () => {
  return (
    <>
      {/* Contenido */}
      <div className="container mt-5">
        <div className="row">
          < ClientForm />{/* Formulario cliente*/}
        </div>
      </div>
    </>
  );
};