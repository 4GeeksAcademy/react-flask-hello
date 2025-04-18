import { useState, useEffect, useRef } from "react";
import './Styles/Logo.css';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// URL del logo por defecto
const DEFAULT_LOGO = "https://placehold.co/600x400/EEE/31343C";

const LogoFrame = () => {
    // Estado para el logo y carga
    const [image, setImage] = useState(DEFAULT_LOGO);
    const [isUploading, setIsUploading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const fileInputRef = useRef(null);
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "";
    
    // Normalizar URL base
    const getApiUrl = (endpoint) => {
        let apiUrl = baseUrl;
        if (apiUrl.endsWith('/')) {
            apiUrl = apiUrl.slice(0, -1);
        }
        return `${apiUrl}${endpoint}`;
    };
    
    // Cargar el logo al iniciar
    useEffect(() => {
        const loadLogo = () => {
            // 1. Intentar cargar desde userData (localStorage)
            const userData = JSON.parse(localStorage.getItem("userData") || "{}");
            if (userData.logo_url) {
                setImage(userData.logo_url);
                return;
            }
            
            // 2. Si no hay en userData, intentar desde el token
            const token = localStorage.getItem("access_token");
            if (!token) {
                setImage(DEFAULT_LOGO);
                return;
            }
            
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.logo_url) {
                    setImage(decodedToken.logo_url);
                }
            } catch (error) {
                console.error("Error al decodificar token:", error);
                setImage(DEFAULT_LOGO);
            }
        };
        
        // Verificar si la URL del logo ha expirado y refrescarla si es necesario
        const refreshLogoUrlIfNeeded = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) return;
            
            try {
                const decodedToken = jwtDecode(token);
                
                // Si no hay logo o clave de objeto, no hay nada que refrescar
                if (!decodedToken.logo_url || !decodedToken.logo_object_key) {
                    return;
                }
                
                // Ver si está próxima a expirar (menos de 1 día)
                const logoUrl = new URL(decodedToken.logo_url);
                const expiry = logoUrl.searchParams.get('X-Amz-Expires');
                const dateStr = logoUrl.searchParams.get('X-Amz-Date');
                
                if (expiry && dateStr) {
                    const expirySeconds = parseInt(expiry);
                    
                    // Parsear fecha de formato AWS (YYYYMMDDTHHMMSSZ)
                    const year = dateStr.slice(0, 4);
                    const month = dateStr.slice(4, 6);
                    const day = dateStr.slice(6, 8);
                    const hour = dateStr.slice(9, 11);
                    const minute = dateStr.slice(11, 13);
                    const second = dateStr.slice(13, 15);
                    
                    const dateObj = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
                    const expiryDate = new Date(dateObj.getTime() + expirySeconds * 1000);
                    
                    // Si expira en menos de 1 día, refrescar
                    const oneDayFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000);
                    if (expiryDate < oneDayFromNow) {
                        await refreshLogoUrl();
                    }
                }
            } catch (error) {
                console.error("Error al verificar expiración del logo:", error);
            }
        };
        
        // Cargar logo inicial
        loadLogo();
        
        // Verificar si necesitamos refrescar la URL
        refreshLogoUrlIfNeeded();
        
        // Escuchar eventos para recargar
        window.addEventListener('userLoggedIn', loadLogo);
        window.addEventListener('userLoggedOut', () => setImage(DEFAULT_LOGO));
        window.addEventListener('logoChanged', (event) => {
            if (event.detail && event.detail.logo_url) {
                setImage(event.detail.logo_url);
            }
        });
        
        return () => {
            window.removeEventListener('userLoggedIn', loadLogo);
            window.removeEventListener('userLoggedOut', () => setImage(DEFAULT_LOGO));
            window.removeEventListener('logoChanged', (event) => {
                if (event.detail && event.detail.logo_url) {
                    setImage(event.detail.logo_url);
                }
            });
        };
    }, [baseUrl]);
    
    // Refrescar URL del logo
    const refreshLogoUrl = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) return;
        
        try {
            setIsRefreshing(true);
            
            const response = await axios.get(
                getApiUrl('/api/refresh_logo_url'),
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            if (response.data && response.data.logo_url) {
                console.log("URL del logo actualizada:", response.data.logo_url);
                
                // Actualizar la imagen con la nueva URL
                setImage(response.data.logo_url);
                
                // Actualizar token y userData
                if (response.data.access_token) {
                    localStorage.setItem("access_token", response.data.access_token);
                }
                
                const userData = JSON.parse(localStorage.getItem("userData") || "{}");
                userData.logo_url = response.data.logo_url;
                localStorage.setItem("userData", JSON.stringify(userData));
                
                // Notificar a otros componentes
                window.dispatchEvent(new CustomEvent('logoChanged', {
                    detail: { logo_url: response.data.logo_url }
                }));
            }
        } catch (error) {
            console.error("Error al refrescar URL del logo:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    // Subir nuevo logo
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        console.log("Archivo seleccionado:", file.name, "Tipo:", file.type);
        setIsUploading(true);
        
        const formData = new FormData();
        formData.append('logo', file);
        
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error("No hay token de autenticación");
            }
            
            const uploadUrl = getApiUrl('/api/post_logo');
            console.log("Subiendo logo a:", uploadUrl);
            
            const response = await axios.post(
                uploadUrl,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
            if (response.data && response.data.logo_url) {
                console.log("Logo subido, URL:", response.data.logo_url);
                
                // Actualizar la imagen con la URL del logo
                setImage(response.data.logo_url);
                
                // Actualizar token y userData
                if (response.data.access_token) {
                    localStorage.setItem("access_token", response.data.access_token);
                }
                
                const userData = JSON.parse(localStorage.getItem("userData") || "{}");
                userData.logo_url = response.data.logo_url;
                localStorage.setItem("userData", JSON.stringify(userData));
                
                // Notificar a otros componentes
                window.dispatchEvent(new CustomEvent('logoChanged', {
                    detail: { logo_url: response.data.logo_url }
                }));
            }
        } catch (error) {
            console.error("Error al subir logo:", error);
            console.error("Detalles:", error.response?.data || error.message);
            alert("Error al subir el logo. Intenta con un formato JPG, PNG o WebP.");
        } finally {
            setIsUploading(false);
        }
    };

    // Abrir selector de archivos
    const handleClick = () => {
        if (localStorage.getItem('access_token')) {
            fileInputRef.current.click();
        } else {
            alert("Debes iniciar sesión para cambiar el logo");
        }
    };

    return (
        <div className="logo-frame" onClick={handleClick}>
            <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/gif,image/svg+xml,image/webp"
                onChange={handleImageUpload}
                style={{ display: "none" }}
            />
            {isUploading ? (
                <p className="uploading-text">Subiendo...</p>
            ) : isRefreshing ? (
                <p className="uploading-text">Actualizando...</p>
            ) : (
                <img
                    src={image}
                    alt="Logo"
                    className="logo-image"
                    onError={() => setImage(DEFAULT_LOGO)}
                />
            )}
        </div>
    );
};

export default LogoFrame;