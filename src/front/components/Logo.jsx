import { useState, useEffect, useRef } from "react";
import './Styles/Logo.css';
import axios from "axios";

const LogoFrame = () => {
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        // Intentar cargar el logo desde localStorage primero
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData && userData.logo_url) {
            setImage(userData.logo_url);
        }
        
        // Luego intentar obtener desde el servidor (solo si hay token)
        const fetchLogo = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            
            try {
                const response = await axios.get(`${baseUrl}api/get_logo`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    responseType: 'blob' // Para recibir la imagen como blob
                });
                
                // Solo procesamos si obtuvimos datos válidos
                if (response.data.size > 0) {
                    // Crear URL para la imagen recibida
                    const imageUrl = URL.createObjectURL(response.data);
                    setImage(imageUrl);
                    
                    // Actualizar userData en localStorage
                    const userData = JSON.parse(localStorage.getItem("userData")) || {};
                    userData.logo_url = imageUrl;
                    localStorage.setItem("userData", JSON.stringify(userData));
                }
            } catch (error) {
                console.log("No se pudo cargar el logo:", error);
                // No mostramos error al usuario para este caso
            }
        };
        
        fetchLogo();
    }, [baseUrl]);

    // Maneja la carga del archivo
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        
        if (file) {
            setIsUploading(true);
            setError(null);
            
            // Mostrar una vista previa local inmediatamente
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
            
            try {
                // Subir el archivo al servidor
                const formData = new FormData();
                formData.append('logo', file); // Nombre del campo según el backend
                
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No hay token de autenticación");
                }
                
                console.log("Enviando logo a:", `${baseUrl}api/post_logo`);
                
                const response = await axios.post(
                    `${baseUrl}api/post_logo`,
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                            // No establecemos Content-Type para permitir que axios lo configure
                        }
                    }
                );

                console.log("Respuesta del servidor:", response.data);

                // Actualizar userData en localStorage (mantenemos la vista previa por ahora)
                const userData = JSON.parse(localStorage.getItem("userData")) || {};
                // Guardamos la URL de la vista previa temporalmente
                userData.logo_url = image;
                localStorage.setItem("userData", JSON.stringify(userData));
                
                // No intentamos obtener el logo justo después de subir para evitar problemas de caché o timing
                // La próxima vez que se cargue el componente lo obtendrá correctamente
                
            } catch (error) {
                console.error("Error al subir el logo:", error);
                setError("No se pudo subir el logo. Intenta de nuevo.");
                
                if (error.response) {
                    console.log("Respuesta de error:", error.response.data);
                    console.log("Estado HTTP:", error.response.status);
                }
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="logo-frame" onClick={handleClick}>
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
            />
            {isUploading ? (
                <p className="uploading-text">Subiendo...</p>
            ) : image ? (
                <img src={image} alt="Logo" className="logo-image" />
            ) : (
                <p className="add-logo-text">Add your logo</p>
            )}
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default LogoFrame;