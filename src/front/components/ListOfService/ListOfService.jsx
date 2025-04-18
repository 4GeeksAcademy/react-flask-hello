import React from "react";
import "./ListOfService.css"

export const ListOfService = () => {
    return (
        <>
            <div className="boxService container"> {/* Box Service */}
                <div className="serviceTitle row"> {/* Name Service */}
                    <h2>Rellenar (Nombre)</h2>
                </div>
                <div> {/* Description */}
                    <h4>Description:</h4>
                    <span>Rellenar (Descripción)</span>
                </div>
                <div className="row"> {/* Category and Price */}
                    <div className="col-8">
                        <h5>Category:</h5>
                        <span>Rellenar (Categoria)</span>
                    </div>
                    <div className="col-4">
                        <h5>Price:</h5>
                        <span>Rellenar (Precio)</span>
                    </div>
                </div>
            </div>
        </>
    );
};

//Agregar Filtro busqueda creado por Angel

//Enlazar con Formulario nuevo servicio

//Nose si agregarle CSS margin-left al "<h4>Description"

//Agregar Margin entre cada dato