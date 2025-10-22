import React from "react"
import { useParams } from "react-router-dom";

const Services = () => {
    const { role } = useParams();



    return (
        <>
            
                <h2>Aqui renderiza servicios de {role}</h2>
            
          

        </>
    )
}

export default Services