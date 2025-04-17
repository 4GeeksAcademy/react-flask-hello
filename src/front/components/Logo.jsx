import { useState, useEffect, useRef } from "react";
import './Styles/Logo.css';
import axios from "axios";

// URL del logo por defecto
const DEFAULT_LOGO = "https://raw.githubusercontent.com/4GeeksAcademy/Spain_Coho_94_First_Proyect_Da_Da_Ja/refs/heads/main/src/front/assets/logo.png";

// Función para resetear el logo al predeterminado
export const resetLogoToDefault = () => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    userData.logo_url = DEFAULT_LOGO;
    userData.logo_cloud_url = null;
    localStorage.setItem("userData", JSON.stringify(userData));
    window.dispatchEvent(new Event('logoReset'));
    return DEFAULT_LOGO;
};

const LogoFrame = () => {
    const [image, setImage] = useState(DEFAULT_LOGO);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "";
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar autenticación cuando el componente se monta
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsAuthenticated(!!token);
    }, []);

    // Función principal para cargar el logo
    const loadLogo = async () => {
        const token = localStorage.getItem("access_token");
        
        // Si no hay token, usar logo por defecto
        if (!token) {
            setImage(DEFAULT_LOGO);
            return;
        }
        
        setIsAuthenticated(true);
        
        // 1. Intentar cargar desde localStorage primero
        try {
            const userData = JSON.parse(localStorage.getItem("userData") || "{}");
            
            // Si hay un logo personalizado en localStorage, usarlo
            if (userData.logo_url && userData.logo_url !== DEFAULT_LOGO) {
                setImage(userData.logo_url);
                
                // Intentar actualizar desde la API en segundo plano
                loadLogoFromApi();
                return;
            }
        } catch (error) {
            console.error("Error al procesar userData:", error);
        }
        
        // 2. Intentar cargar desde API
        try {
            const apiLogo = await loadLogoFromApi();
            if (apiLogo) {
                setImage(apiLogo);
                return;
            }
        } catch (error) {
            console.error("Error cargando logo desde API:", error);
        }
        
        // 3. Si todo lo anterior falla, usar logo por defecto
        setImage(DEFAULT_LOGO);
        
        // Actualizar userData con el logo por defecto
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        userData.logo_url = DEFAULT_LOGO;
        localStorage.setItem("userData", JSON.stringify(userData));
    };

    // Función para cargar el logo desde la API
    const loadLogoFromApi = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) return null;
        
        try {
            // Añadir timestamp para evitar caché
            const timestamp = new Date().getTime();
            // ¡IMPORTANTE! Asegúrate de que la ruta sea exactamente igual que en el backend
            const apiUrl = `${baseUrl}/api/get_logo?t=${timestamp}`;
                
            console.log("Intentando cargar logo desde:", apiUrl);
                
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'image/*'
                },
                responseType: 'blob'
            });
            
            // Procesar respuesta solo si es válida
            if (response.data && response.data.size > 0) {
                console.log("Logo recibido de API, tamaño:", response.data.size);
                // Crear URL para la imagen recibida
                const contentType = response.headers['content-type'] || 'image/png';
                const blob = new Blob([response.data], { type: contentType });
                const imageUrl = URL.createObjectURL(blob);
                
                // Actualizar userData en localStorage
                const userData = JSON.parse(localStorage.getItem("userData") || "{}");
                userData.logo_url = imageUrl;
                localStorage.setItem("userData", JSON.stringify(userData));
                
                return imageUrl;
            }
        } catch (error) {
            console.error("Error al cargar logo desde API:", error);
            return null;
        }
        
        return null;
    };

    // Cargar logo cuando cambia el estado de autenticación
    useEffect(() => {
        loadLogo();
    }, [isAuthenticated]);

    // Manejar eventos para actualizaciones dinámicas
    useEffect(() => {
        // Eventos para actualizaciones dinámicas
        const handleLogoReset = () => setImage(DEFAULT_LOGO);
        
        const handleLogin = () => {
            const token = localStorage.getItem("access_token");
            setIsAuthenticated(!!token);
            setTimeout(loadLogo, 100);
        };
        
        const handleStorageChange = (e) => {
            if (!e || e.key === "access_token" || e.key === "userData") {
                const token = localStorage.getItem("access_token");
                setIsAuthenticated(!!token);
                setTimeout(loadLogo, 100);
            }
        };
        
        // Registrar listeners
        window.addEventListener('logoReset', handleLogoReset);
        window.addEventListener('userLoggedIn', handleLogin);
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('forceLogoLoad', loadLogo);
        
        // Cleanup
        return () => {
            window.removeEventListener('logoReset', handleLogoReset);
            window.removeEventListener('userLoggedIn', handleLogin);
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('forceLogoLoad', loadLogo);
        };
    }, []);

    // Manejar la carga del archivo
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        
        if (file) {
            setIsUploading(true);
            setError(null);
            
            // Vista previa local inmediata
            const reader = new FileReader();
            reader.onload = async (e) => {
                const result = e.target.result;
                setImage(result);
                
                // Guardar en localStorage
                try {
                    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
                    userData.logo_url = result;
                    localStorage.setItem("userData", JSON.stringify(userData));
                    
                    // Subir al backend
                    try {
                        const formData = new FormData();
                        formData.append('logo', file);
                        
                        // ¡IMPORTANTE! Asegúrate de que la ruta sea exactamente igual que en el backend
                        const uploadUrl = `${baseUrl}api/post_logo`;
                        console.log("Intentando subir logo a:", uploadUrl);
                            
                        const response = await axios.post(
                            uploadUrl,
                            formData,
                            {
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`
                                }
                            }
                        );
                        
                        console.log("Respuesta del servidor:", response.data);
                        
                        // Si el servidor devuelve una URL, guardarla
                        if (response.data && response.data.logo_url) {
                            userData.logo_cloud_url = response.data.logo_url;
                            localStorage.setItem("userData", JSON.stringify(userData));
                        }
                    } catch (uploadError) {
                        console.error("Error al subir logo al servidor:", uploadError);
                        setError("Logo guardado localmente, pero hubo un error al guardarlo en el servidor.");
                    }
                    
                    // Notificar cambios
                    window.dispatchEvent(new StorageEvent('storage', { key: 'userData' }));
                } catch (error) {
                    console.error("Error al guardar logo:", error);
                    setError("Error al guardar el logo.");
                }
                
                setIsUploading(false);
            };
            
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            fileInputRef.current.click();
        }
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
                <img
                    src={image}
                    alt="Logo"
                    className="logo-image"
                    key={`img-${Date.now()}`}
                    onError={(e) => {
                        console.error("Error cargando imagen:", e.target.src);
                        e.target.src = DEFAULT_LOGO;
                    }}
                />
            ) : (
                <p className="add-logo-text">Add your logo</p>
            )}
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default LogoFrame;