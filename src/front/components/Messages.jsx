import React from "react"
import { useParams } from "react-router-dom";

const Messages = () => {
    const { role } = useParams();



    return (
        <>
            {role === 'mentor' &&
                <h2>Aqui renderiza Mensajes {role}</h2>
            }
            {role === 'student' &&
                <h2>Aqui renderiza Mensajes de {role}</h2>
            }

        </>
    )
}

export default Messages