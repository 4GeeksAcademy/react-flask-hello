import React from "react";
import "./ListOfService.css"
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const ListOfService = () => {
    const { store } = useGlobalReducer();
    return (
        <>
            {store.services.map((service, index) => (
                <div key={index} className="boxService container"> {/* Box Service */}
                    <div className="serviceTitle row"> {/* Name Service */}
                        <h2>{service.name}</h2> {/* añadido */}
                    </div>
                    <div> {/* Description */}
                        <h4>Description:</h4>
                        <span>{service.description}</span> {/* añadido */}
                    </div>
                    <div className="row"> {/* Category and Price */}
                        <div className="col-8">
                            <h5>Category:</h5>
                            <span>{service.category}</span> {/* añadido */}
                        </div>
                        <div className="col-4">
                            <h5>Price:</h5>
                            <span>{service.price}</span> {/* añadido */}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

//Agregar Filtro busqueda creado por Angel

//Nose si agregarle CSS margin-left al "<h4>Description"

//Agregar Margin entre cada dato