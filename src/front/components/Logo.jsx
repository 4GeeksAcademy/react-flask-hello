import { useState, useEffect, useRef } from "react";
import './Styles/Logo.css';
import axios from "axios";

const LogoFrame = () => {
    const [image, setImage] = useState(null); 
    const fileInputRef = useRef(null); 

    useEffect(() => { 
        const savedLogo = localStorage.getItem("logoApp");
        if (savedLogo) {
            setImage(savedLogo);
        }
    }, []);
    
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        
        if (file) {
            // Crear URL temporal para mostrar la imagen
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            
            // Guardar la imagen en localStorage como URL temporal
            localStorage.setItem("logoApp", imageUrl);

            // Crear un FormData para enviar el archivo
            const formData = new FormData();
            formData.append('logo', file); // 'logo' es el campo que espera el backend

            try {
                // Enviar la imagen al backend
                const response = await axios.post(
                    import.meta.env.VITE_BACKEND_URL + 'api/post_logos', 
                    formData,
                    {
                        withCredentials: true, // Para que la cookie de sesión se envíe con la petición
                        headers: {
                            'Content-Type': 'multipart/form-data' // Asegúrate de que el backend pueda manejar este tipo de contenido
                        }
                    }
                );
                console.log(response.data.message); // Mensaje de éxito del servidor
            } catch (error) {
                console.error("Error al guardar el logo:", error);
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="logo-frame" onClick={handleClick}>
            {/* BOTÓN INVISIBLE DE SUBIDA */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
            />

            {/* VISTA DEL LOGO O TEXTO DEFAULT */}
            {!image ? (
                <p className="add-logo-text">Add your logo</p>
            ) : (
                <img src={image} alt="Logo" />
            )}
        </div>
    );
};

export default LogoFrame;
