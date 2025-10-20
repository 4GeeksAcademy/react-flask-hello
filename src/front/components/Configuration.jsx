import React from "react"
import { useParams } from "react-router-dom";

const Configuration = () => {
    const { role } = useParams();



    return (
        <>
            {role === 'mentor' &&
                <h2>Aqui renderiza Configuracion de {role}</h2>
            }
            {role === 'student' &&
                <h2>Aqui renderiza Configuracion de {role}</h2>
            }

        </>
    )
}

export default Configuration