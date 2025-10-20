import React from "react"
import { useParams } from "react-router-dom";

const Reviews = () => {
    const { role } = useParams();



    return (
        <>
            {role === 'mentor' &&
                <h2>Aqui renderiza reseñas de {role}</h2>
            }
            {role === 'student' &&
                <h2>Aqui renderiza reseñas de {role}</h2>
            }

        </>
    )
}

export default Reviews