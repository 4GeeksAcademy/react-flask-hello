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

    // Disparar evento para notificar a otros componentes
    window.dispatchEvent(new Event('logoReset'));

    return DEFAULT_LOGO;
};

const LogoFrame = () => {
    const [image, setImage] = useState(DEFAULT_LOGO);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "";
    const componentId = useRef(Date.now()); // ID único para este montaje del componente
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [apiAvailable, setApiAvailable] = useState(true); // Controlar si la API está disponible

    console.log(`LogoFrame ${componentId.current} rendering, token:`, !!localStorage.getItem("access_token"));

    // Verificar autenticación
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsAuthenticated(!!token);
    }, []);

    // Función para cargar el logo desde la API
    const loadLogoFromApi = async () => {
        if (!apiAvailable) return null;

        const token = localStorage.getItem("access_token");
        if (!token) return null;

        console.log(`LogoFrame ${componentId.current} intentando cargar logo desde API`);

        try {
            const response = await axios.get(`${baseUrl}api/get_logo`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'blob' // Para recibir la imagen como blob
            });

            // Solo procesar si obtuvimos datos válidos
            if (response.data && response.data.size > 0) {
                console.log(`LogoFrame ${componentId.current} logo recibido de API, tamaño:`, response.data.size);

                // Verificar el tipo de contenido
                const contentType = response.headers['content-type'] || 'image/png';
                console.log("Tipo de contenido:", contentType);

                // Crear URL para la imagen recibida
                const blob = new Blob([response.data], { type: contentType });
                const imageUrl = URL.createObjectURL(blob);

                console.log("URL creada:", imageUrl);

                // Actualizar userData en localStorage
                const userData = JSON.parse(localStorage.getItem("userData")) || {};
                userData.logo_url = imageUrl;

                // Si el servidor devuelve la URL en la nube, guardarla también
                if (response.headers['logo-cloud-url']) {
                    userData.logo_cloud_url = response.headers['logo-cloud-url'];
                }

                localStorage.setItem("userData", JSON.stringify(userData));

                return imageUrl;
            }
        } catch (error) {
            console.log(`LogoFrame ${componentId.current} error cargando logo desde API:`, error);

            // Si obtenemos un error 404, la API probablemente no está implementada todavía
            if (error.response && error.response.status === 404) {
                console.log(`LogoFrame ${componentId.current} API de logo no disponible (404)`);
                setApiAvailable(false);
            }

            return null;
        }

        return null;
    };

    // Función para cargar el logo desde diferentes fuentes
    const loadLogo = async () => {
        console.log(`LogoFrame ${componentId.current} loadLogo called`);

        // Verificar el estado de autenticación
        const token = localStorage.getItem("access_token");
        const isAuthNow = !!token;

        // Actualizar estado de autenticación
        setIsAuthenticated(isAuthNow);

        // Si no está autenticado, usar logo por defecto
        if (!isAuthNow) {
            console.log(`LogoFrame ${componentId.current} no autenticado, usando logo por defecto`);
            setImage(DEFAULT_LOGO);
            return;
        }

        // 1. Intentar cargar desde localStorage primero
        try {
            const userData = JSON.parse(localStorage.getItem("userData") || "{}");
            console.log(`LogoFrame ${componentId.current} userData:`, userData);

            // Si hay un logo personalizado en localStorage, usarlo inmediatamente
            if (userData.logo_url && userData.logo_url !== DEFAULT_LOGO) {
                console.log(`LogoFrame ${componentId.current} usando logo personalizado de localStorage`);
                setImage(userData.logo_url);

                // Aunque tenemos un logo local, intentaremos cargar desde API en segundo plano
                // por si hay una versión más reciente, solo si la API está disponible
                if (apiAvailable) {
                    loadLogoFromApi().then(apiLogo => {
                        if (apiLogo) {
                            console.log(`LogoFrame ${componentId.current} actualizando logo desde API`);
                            setImage(apiLogo);
                        }
                    });
                }

                return;
            }
        } catch (error) {
            console.error(`LogoFrame ${componentId.current} error procesando userData:`, error);
        }

        // 2. Si no hay logo en localStorage o es el predeterminado, intentar cargar desde API
        if (apiAvailable) {
            try {
                console.log(`LogoFrame ${componentId.current} intentando cargar desde API`);
                const apiLogo = await loadLogoFromApi();

                if (apiLogo) {
                    console.log(`LogoFrame ${componentId.current} logo cargado desde API`);
                    setImage(apiLogo);
                    return;
                }
            } catch (error) {
                console.error(`LogoFrame ${componentId.current} error cargando desde API:`, error);
            }
        }

        // 3. Si no se pudo cargar de ninguna fuente, usar el predeterminado
        console.log(`LogoFrame ${componentId.current} usando logo predeterminado`);
        setImage(DEFAULT_LOGO);

        // Actualizar userData con el logo por defecto
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        userData.logo_url = DEFAULT_LOGO;
        localStorage.setItem("userData", JSON.stringify(userData));
    };

    // Cargar logo cuando se monta el componente o cambia isAuthenticated
    useEffect(() => {
        console.log(`LogoFrame ${componentId.current} useEffect por cambio en isAuthenticated:`, isAuthenticated);
        loadLogo();
    }, [isAuthenticated]);

    // Manejar eventos para actualizaciones dinámicas
    useEffect(() => {
        console.log(`LogoFrame ${componentId.current} configurando event listeners`);

        // Eventos para actualizaciones dinámicas
        const handleLogoReset = () => {
            console.log(`LogoFrame ${componentId.current} evento logoReset`);
            setImage(DEFAULT_LOGO);
        };

        const handleLogin = () => {
            console.log(`LogoFrame ${componentId.current} evento userLoggedIn`);
            const token = localStorage.getItem("access_token");
            setIsAuthenticated(!!token);
            setTimeout(() => {
                loadLogo();
            }, 100);
        };

        const handleStorageChange = (e) => {
            console.log(`LogoFrame ${componentId.current} evento storage:`, e);
            const token = localStorage.getItem("access_token");
            setIsAuthenticated(!!token);

            if (!e || e.key === "access_token" || e.key === "userData") {
                setTimeout(() => {
                    loadLogo();
                }, 100);
            }
        };

        // Registrar listeners
        window.addEventListener('logoReset', handleLogoReset);
        window.addEventListener('userLoggedIn', handleLogin);
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('forceLogoLoad', loadLogo);

        // Cleanup
        return () => {
            console.log(`LogoFrame ${componentId.current} limpiando event listeners`);
            window.removeEventListener('logoReset', handleLogoReset);
            window.removeEventListener('userLoggedIn', handleLogin);
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('forceLogoLoad', loadLogo);
        };
    }, [isAuthenticated]);

    // Función para subir el logo al backend
    const uploadLogoToBackend = async (file, imageDataUrl) => {
        if (!apiAvailable) return imageDataUrl;

        const token = localStorage.getItem('access_token');
        if (!token) {
            throw new Error("No hay token de autenticación");
        }

        console.log(`LogoFrame ${componentId.current} subiendo logo a backend:`, `${baseUrl}api/post_logo`);

        // Crear FormData
        const formData = new FormData();
        formData.append('logo', file);

        try {
            const response = await axios.post(
                `${baseUrl}api/post_logo`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log(`LogoFrame ${componentId.current} respuesta del servidor:`, response.data);

            // Si el servidor devuelve una URL, actualizarla en userData
            if (response.data && response.data.logo_url) {
                const userData = JSON.parse(localStorage.getItem("userData") || "{}");
                userData.logo_cloud_url = response.data.logo_url;
                localStorage.setItem("userData", JSON.stringify(userData));
            }

            // La imagen local ya se ha guardado, así que seguimos usándola
            return imageDataUrl;
        } catch (error) {
            console.error(`LogoFrame ${componentId.current} error subiendo logo:`, error);

            // Si obtenemos un error 404, la API probablemente no está implementada todavía
            if (error.response && error.response.status === 404) {
                console.log(`LogoFrame ${componentId.current} API de logo no disponible (404)`);
                setApiAvailable(false);
            }

            return imageDataUrl; // Seguir usando la imagen local
        }
    };

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
                console.log(`LogoFrame ${componentId.current} nuevo logo cargado localmente`);
                setImage(result);

                // Guardar temporalmente en localStorage
                try {
                    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
                    userData.logo_url = result;
                    localStorage.setItem("userData", JSON.stringify(userData));

                    // Intentar subir al backend si está disponible
                    if (apiAvailable) {
                        try {
                            await uploadLogoToBackend(file, result);
                            console.log(`LogoFrame ${componentId.current} logo subido exitosamente al backend`);
                        } catch (uploadError) {
                            console.error(`LogoFrame ${componentId.current} error subiendo al backend:`, uploadError);
                            setError("Logo guardado localmente, pero hubo un error al guardarlo en el servidor.");
                        }
                    }

                    // Disparar eventos de cambio
                    window.dispatchEvent(new StorageEvent('storage', {
                        key: 'userData'
                    }));

                    window.dispatchEvent(new CustomEvent('logoChanged', {
                        detail: { logo_url: result }
                    }));
                } catch (error) {
                    console.error(`LogoFrame ${componentId.current} error guardando:`, error);
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
                    key={`img-${image}`}
                    onError={(e) => {
                        console.error("Error cargando imagen:", e);
                        e.target.src = DEFAULT_LOGO; // Fallback al logo por defecto
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