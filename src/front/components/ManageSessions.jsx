import React from "react"
import { useParams } from "react-router-dom";

const ManageSessions = () => {
    const { role } = useParams();



    return (
        <>
            
           
                <h2>Aqui renderiza Gestiona sessiones de {role}</h2>
           

        </>
    )
}

export default ManageSessions



