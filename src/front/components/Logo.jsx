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
    const [serverAvailable, setServerAvailable] = useState(true);

    // Verificar autenticación cuando el componente se monta
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsAuthenticated(!!token);
        
        // Verificar si el servidor está disponible
        checkServerAvailability();
    }, []);

    // Función para verificar si el servidor está disponible
    const checkServerAvailability = async () => {
        try {
            const pingUrl = baseUrl.endsWith('/') 
                ? `${baseUrl}ping` 
                : `${baseUrl}/ping`;
                
            console.log("Verificando disponibilidad del servidor:", pingUrl);
            
            const response = await fetch(pingUrl, { 
                method: 'GET',
                headers: { 'Accept': 'application/json' },
                mode: 'cors',
                timeout: 3000 // 3 segundos de timeout
            });
            
            if (response.ok) {
                console.log("Servidor disponible");
                setServerAvailable(true);
            } else {
                console.warn("Servidor responde con error:", response.status);
                setServerAvailable(false);
            }
        } catch (error) {
            console.warn("Servidor no disponible:", error);
            setServerAvailable(false);
        }
    };

    // Simplificar la función loadLogo para priorizar localStorage
    // Modificar la función loadLogo para que sea más robusta
const loadLogo = async () => {
    const token = localStorage.getItem("access_token");
    
    // Si no hay token, mostrar logo por defecto
    if (!token) {
        console.log("No hay token, usando logo por defecto");
        setImage(DEFAULT_LOGO);
        return;
    }
    
    console.log("Intentando cargar logo...");
    
    // 1. Intentar cargar desde localStorage primero
    try {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        
        // Verificar si hay un logo personalizado en localStorage
        if (userData.logo_url && userData.logo_url !== DEFAULT_LOGO) {
            console.log("Usando logo desde localStorage:", userData.logo_url.substring(0, 30) + "...");
            setImage(userData.logo_url);
            
            // Si el servidor está disponible, intentar actualizar en segundo plano
            if (serverAvailable) {
                console.log("Servidor disponible, actualizando desde API en segundo plano");
                loadLogoFromApi().then(apiLogo => {
                    if (apiLogo) {
                        console.log("Recibido logo actualizado de API");
                        // No es necesario hacer nada aquí porque loadLogoFromApi ya guarda en localStorage
                        // y dispara el evento 'logoUpdated'
                    }
                }).catch(err => {
                    console.error("Error en actualización en segundo plano:", err);
                });
            }
            return;
        } else {
            console.log("No hay logo en localStorage o es el logo por defecto");
        }
    } catch (error) {
        console.error("Error al procesar userData:", error);
    }
    
    // 2. Si no hay logo en localStorage y el servidor está disponible, intentar cargar desde API
    if (serverAvailable) {
        console.log("Intentando cargar desde API...");
        try {
            const apiLogo = await loadLogoFromApi();
            
            // Verificar nuevamente localStorage después de loadLogoFromApi
            const userData = JSON.parse(localStorage.getItem("userData") || "{}");
            
            if (userData.logo_url && userData.logo_url !== DEFAULT_LOGO) {
                console.log("Logo recibido de API, actualizando imagen");
                setImage(userData.logo_url);
                return;
            } else {
                console.log("No se recibió logo de API o es el logo por defecto");
            }
        } catch (error) {
            console.error("Error cargando logo desde API:", error);
        }
    } else {
        console.log("Servidor no disponible, no se puede cargar desde API");
    }
    
    // 3. Si todo lo anterior falla, usar logo por defecto
    console.log("Usando logo por defecto como último recurso");
    setImage(DEFAULT_LOGO);
};

// Mejorar loadLogoFromApi para ser más explícito con el manejo de respuestas
const loadLogoFromApi = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    
     try {
        const timestamp = new Date().getTime();
        const apiUrl = baseUrl.endsWith('/') 
            ? `${baseUrl}api/get_logo?url_only=true&t=${timestamp}` 
            : `${baseUrl}/api/get_logo?url_only=true&t=${timestamp}`;
            
        console.log("Solicitando URL del logo desde:", apiUrl);
            
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            timeout: 5000
        });
        
        console.log("Respuesta de API get_logo:", response.status, response.data);
        
        // Si la respuesta contiene una URL directa
        if (response.data && response.data.logo_url) {
            console.log("Logo URL recibida de API:", response.data.logo_url);
            
            // Actualizar userData en localStorage
            try {
                const userData = JSON.parse(localStorage.getItem("userData") || "{}");
                userData.logo_url = response.data.logo_url;
                userData.logo_cloud_url = response.data.logo_url;
                localStorage.setItem("userData", JSON.stringify(userData));
                
                // Notificar cambio
                window.dispatchEvent(new Event('logoUpdated'));
                
                return response.data.logo_url;
            } catch (storageError) {
                console.error("Error al actualizar localStorage:", storageError);
            }
        } else {
            console.log("API no devolvió URL de logo");
        }
        
        return null;
    } catch (error) {
        console.error("Error al cargar logo desde API:", error);
        
        // Si hay un error de conexión, marcar el servidor como no disponible
        if (error.code === 'ECONNABORTED' || error.message.includes('Network Error')) {
            setServerAvailable(false);
        }
        
        return null;
    }
};

// Agregar un nuevo efecto para manejar la autenticación y cargar el logo
useEffect(() => {
    // Función para verificar autenticación y cargar logo
    const checkAuthAndLoadLogo = () => {
        const token = localStorage.getItem("access_token");
        const isAuth = !!token;
        
        console.log("Verificando autenticación:", isAuth);
        setIsAuthenticated(isAuth);
        
        if (isAuth) {
            console.log("Usuario autenticado, cargando logo");
            loadLogo();
        } else {
            console.log("Usuario no autenticado, usando logo por defecto");
            setImage(DEFAULT_LOGO);
        }
    };
    
    // Verificar autenticación inicial
    checkAuthAndLoadLogo();
    
    // Configurar listeners para eventos de autenticación
    window.addEventListener('userLoggedIn', checkAuthAndLoadLogo);
    window.addEventListener('userLoggedOut', () => {
        console.log("Usuario cerró sesión");
        setIsAuthenticated(false);
        setImage(DEFAULT_LOGO);
    });
    
    // Cleanup
    return () => {
        window.removeEventListener('userLoggedIn', checkAuthAndLoadLogo);
        window.removeEventListener('userLoggedOut', () => {});
    };
}, []);

    // Manejar la carga del archivo - nueva implementación prioriza local
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        setIsUploading(true);
        setError(null);
        
        // Vista previa local inmediata
        const reader = new FileReader();
        reader.onload = async (e) => {
            const localImageUrl = e.target.result;
            
            // 1. Guardar inmediatamente en localStorage
            try {
                const userData = JSON.parse(localStorage.getItem("userData") || "{}");
                userData.logo_url = localImageUrl; // Guardamos la versión base64 local
                localStorage.setItem("userData", JSON.stringify(userData));
                console.log("Logo guardado localmente");
                
                // 2. Actualizar UI con la versión local
                setImage(localImageUrl);
                setIsUploading(false);
                
                // 3. Intentar subir al servidor en segundo plano
                if (serverAvailable) {
                    console.log("Intentando subir logo al servidor...");
                    
                    try {
                        const formData = new FormData();
                        formData.append('logo', file);
                        
                        // Aseguramos que la ruta sea correcta
                        const uploadUrl = baseUrl.endsWith('/') 
                            ? `${baseUrl}api/post_logo` 
                            : `${baseUrl}/api/post_logo`;
                        
                        console.log("Subiendo archivo:", file.name, "tipo:", file.type, "tamaño:", file.size);
                        for (let pair of formData.entries()) {
                            console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
                        }
                        
                        const response = await axios.post(
                            uploadUrl,
                            formData,
                            {
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                                    'Content-Type': 'multipart/form-data'
                                }
                            }
                        );
                        
                        console.log("Respuesta del servidor:", response.status, response.data);
                        
                        // Solo guardamos la URL en cloud_url, mantenemos la versión local como principal
                        if (response.status === 200 && response.data && response.data.logo_url) {
                            const userData = JSON.parse(localStorage.getItem("userData") || "{}");
                            userData.logo_cloud_url = response.data.logo_url;
                            localStorage.setItem("userData", JSON.stringify(userData));
                        }
                    } catch (uploadError) {
                        console.error("Error al subir logo al servidor:", uploadError);
                        // No mostramos error porque ya estamos usando la versión local
                    }
                }
                
                // Notificar cambios
                window.dispatchEvent(new StorageEvent('storage', { key: 'userData' }));
            } catch (error) {
                console.error("Error al guardar logo:", error);
                setError("Error al guardar el logo.");
                setIsUploading(false);
            }
        };
        
        reader.readAsDataURL(file);
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
                        
                        // Si el error es con una URL de la nube, buscar versión local
                        if (e.target.src.includes('fly.storage.tigris.dev') || e.target.src.includes('http')) {
                            console.log("Error cargando desde la nube, buscando versión local");
                            
                            const userData = JSON.parse(localStorage.getItem("userData") || "{}");
                            if (userData.logo_url && userData.logo_url.startsWith('data:image')) {
                                // Usar la versión base64 almacenada localmente
                                console.log("Usando versión base64 local");
                                e.target.src = userData.logo_url;
                                return;
                            }
                        }
                        
                        // Si todo falla, usar logo por defecto
                        console.log("Usando logo por defecto");
                        e.target.src = DEFAULT_LOGO;
                        
                        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
                        userData.logo_url = DEFAULT_LOGO;
                        localStorage.setItem("userData", JSON.stringify(userData));
                    }}
                />
            ) : (
                <p className="add-logo-text">Añade tu logo</p>
            )}
            {error && <p className="error-text">{error}</p>}
            {!serverAvailable && (
                <small className="server-status">
                    Modo sin conexión: los cambios se guardarán localmente
                </small>
            )}
        </div>
    );
};

export default LogoFrame;