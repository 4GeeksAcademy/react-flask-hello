import { useState, useEffect, useRef } from "react";
import './Styles/Logo.css';
import axios from "axios";

const LogoFrame = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false); // Nuevo estado para cargar
    const fileInputRef = useRef(null);

    // Cargar el logo desde localStorage al montar
    useEffect(() => {
        const savedLogo = localStorage.getItem("logoApp");
        if (savedLogo) {
            setImage(savedLogo); // base64 sigue siendo válido como src de <img>
        }
    }, []);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        
        if (file) {
            // Mostrar el estado de carga
            setLoading(true);

            // Convertir el archivo a base64
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result;
                setImage(base64); // Mostrar la imagen en la interfaz
                localStorage.setItem("logoApp", base64); // Guardar en localStorage

                // Enviar al backend usando FormData como antes
                const formData = new FormData();
                formData.append('logo', file);

                try {
                    const response = await axios.post(
                        import.meta.env.VITE_BACKEND_URL + 'api/post_logos', 
                        formData,
                        {
                            withCredentials: true,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    );
                    console.log(response.data.message);
                } catch (error) {
                    console.error("Error al guardar el logo:", error);
                } finally {
                    setLoading(false); // Detener el estado de carga
                }
            };

            reader.readAsDataURL(file); // Esto dispara el onloadend
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="logo-frame" onClick={handleClick}>
            {/* Botón invisible de subida */}
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
            />

            {/* Mostrar el logo o texto por defecto */}
            {!image ? (
                <p className="add-logo-text">Add your logo</p>
            ) : (
                <img src={image} alt="Logo" />
            )}

            {/* Mostrar el estado de carga */}
            {loading && (
                <div className="loading-spinner">
                    Uploading...
                </div>
            )}
        </div>
    );
};

export default LogoFrame;
