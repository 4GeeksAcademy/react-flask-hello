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
            const image_logo_url = URL.createObjectURL(file);
            setImage(image_logo_url);
            
            // Guardar la imagen en localStorage
            const reader = new FileReader();
            reader.onloadend = async function() {
                const base64data = reader.result;

                // Guardar en localStorage
                localStorage.setItem("logoApp", image_logo_url);

                // También guardar en la cookie (si es necesario)
                document.cookie = `logoApp=${image_logo_url}; path=/; max-age=${60 * 60 * 24 * 365}`;

                try {
                    // Enviar la imagen al backend
                    const response = await axios.post('api/post_logo', {
                        logo: file,
                        
                    },
                    console.log("Logo enviado al backend:", file),
                     {
                        withCredentials: true
                    });
                    console.log(response.data.message); // Mensaje de éxito del servidor
                } catch (error) {
                    console.error("Error al guardar el logo:", error);
                }
            };
            reader.readAsDataURL(file);
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
