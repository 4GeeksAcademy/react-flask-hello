import React from "react"
import { useParams } from "react-router-dom";
import UploadAvatar from "./UploadAvatar";
import { div } from "framer-motion/client";

const Configuration = () => {
    const { role } = useParams();



    return (
        <>
            {role === 'mentor' &&
                <div className="my-4">
                    <h2 >Configura tu cuenta</h2>
                    <UploadAvatar />
                </div>
            }
            {role === 'student' &&
                <h2>Aqui renderiza Configuracion de {role}</h2>
            }

        </>
    )
}

export default Configuration