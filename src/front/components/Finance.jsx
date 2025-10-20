import React from "react"
import { useParams } from "react-router-dom";

const Finance = () => {
    const { role } = useParams();



    return (
        <>
           
                <h2>Aqui renderiza finanzas de {role}</h2>
            
            
                
           

        </>
    )
}

export default Finance



