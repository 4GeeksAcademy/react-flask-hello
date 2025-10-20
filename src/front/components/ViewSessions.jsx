import React from "react"
import { useParams } from "react-router-dom";

const ViewSessions = () => {
    const { role } = useParams();



    return (
        <>
           
                <h2>Aqui renderiza Ver Sessiones de {role}</h2>
            
                
            

        </>
    )
}

export default ViewSessions