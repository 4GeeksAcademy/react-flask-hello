import { useNavigate } from "react-router-dom";
import "./Styles/Navbar.css";
import LogoFrame from "./Logo";
import { useTheme } from '../Contexts/ThemeContext.jsx';
import { useState, useEffect } from "react";
import axios from "axios";

// URL del logo por defecto
const DEFAULT_LOGO = "https://raw.githubusercontent.com/4GeeksAcademy/Spain_Coho_94_First_Proyect_Da_Da_Ja/refs/heads/main/src/front/assets/logo.png";

// Función para resetear el logo al predeterminado
export const resetLogoToDefault = () => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    userData.logo_url = DEFAULT_LOGO;
    userData.logo_cloud_url = null;
    localStorage.setItem("userData", JSON.stringify(userData));
    
    // Esta parte es importante: disparar un evento para notificar a otros componentes
    window.dispatchEvent(new Event('logoReset'));
    
    return DEFAULT_LOGO;
};

const Navbar = () => {
  const { theme, toggleTheme, setTheme } = useTheme();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "";

  // Manejo reactivo del estado de login
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access_token"));
  const [userName, setUserName] = useState("");
  
  // Función para obtener datos del usuario desde el token
  const getUserDataFromToken = () => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    
    try {
      // Decodificar el token JWT (sin verificación)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decodificando token:", error);
      return null;
    }
  };
  
  // Función para cargar datos de usuario
  const loadUserData = () => {
    if (!isLoggedIn) return;
    
    // Intentar obtener del localStorage primero
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    console.log("userData en Navbar:", userData);
    
    // Primero intentar usar firstname y lastname si están disponibles
    if (userData.firstname) {
      const displayName = userData.firstname + (userData.lastname ? " " + userData.lastname : "");
      setUserName(displayName);
      return;
    }
    
    // Si no hay firstname, buscar por otros campos
    if (userData.name || userData.email || userData.username) {
      const name = userData.name || userData.username || userData.email;
      if (typeof name === 'string' && name !== '1') {
        setUserName(name);
        return;
      }
    }
    
    // Intentar obtener del token
    const tokenData = getUserDataFromToken();
    console.log("Token data en Navbar:", tokenData);
    
    if (tokenData) {
      // Buscar el nombre en diferentes propiedades
      const name = tokenData.name || tokenData.email || tokenData.username || tokenData.sub;
      
      // Verificar que no es solo un número o ID
      if (name && typeof name === 'string' && !/^\d+$/.test(name)) {
        setUserName(name);
        // Guardar en userData para futuras referencias
        userData.name = name;
        localStorage.setItem("userData", JSON.stringify(userData));
        return;
      }
    }
    
    // Si llegamos aquí, usar una opción por defecto segura
    setUserName(userData.email || "Usuario");
  };

  // Cargar tema guardado al iniciar
  useEffect(() => {
    // Recuperar tema guardado si existe
    const savedTheme = localStorage.getItem('userTheme');
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    
    // Priorizar tema guardado en userTheme, luego en userData
    const themeToUse = savedTheme || userData.theme || "light";
    
    if (setTheme && themeToUse) {
      console.log("Estableciendo tema desde localStorage:", themeToUse);
      setTheme(themeToUse);
      
      // Asegurarse de que ambos estén sincronizados
      localStorage.setItem('userTheme', themeToUse);
      
      // También actualizar en userData
      if (userData) {
        userData.theme = themeToUse;
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    }
  }, [setTheme]);

  // Manejar cambio de tema
  const handleThemeChange = (newTheme) => {
    // Si hay una función toggleTheme, usarla
    if (toggleTheme) {
      toggleTheme();
      
      // Obtener el nuevo tema después del toggle
      const updatedTheme = theme === "light" ? "dark" : "light";
      saveTheme(updatedTheme);
    } 
    // Si hay setTheme directo, usarlo con el nuevo tema
    else if (setTheme) {
      setTheme(newTheme);
      saveTheme(newTheme);
    }
  };
  
  // Función para guardar el tema en localStorage y userData
  const saveTheme = (newTheme) => {
    console.log("Guardando tema:", newTheme);
    // Guardar tema en localStorage
    localStorage.setItem('userTheme', newTheme);
    
    // También guardar en userData para persistencia
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      userData.theme = newTheme;
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error al guardar tema en userData:", error);
    }
  };

  // FUNCION DEL BOTON LOGOUT MEJORADA
  const LogoutButton = async () => {
    try {
      const token = localStorage.getItem("access_token");
      
      // Guardar el tema actual antes de cerrar sesión
      const currentTheme = localStorage.getItem('userTheme') || theme;
      console.log("Guardando tema actual antes de logout:", currentTheme);
      
      if (access_token) {
        // Notificar al backend sobre el logout (si tienes esta API disponible)
        try {
          await axios.post(`${baseUrl}api/logout`, {}, {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          });
        } catch (error) {
          console.log("Error al notificar logout al servidor:", error);
        }
      }
    } catch (error) {
      console.log("Error en el proceso de logout:", error);
    } finally {
      // Guardar tema actual antes de limpiar
      const currentTheme = localStorage.getItem('userTheme') || theme;
      
      // Restaurar logo por defecto
      resetLogoToDefault();
      
      // Eliminar token de acceso
      localStorage.removeItem("access_token");
      
      // Limpiar datos de usuario
      localStorage.removeItem("userData");
      
      // IMPORTANTE: Restaurar el tema que tenía el usuario
      if (currentTheme) {
        localStorage.setItem('userTheme', currentTheme);
        
        // También recrear userData con el tema guardado
        const newUserData = { 
          theme: currentTheme,
          logo_url: DEFAULT_LOGO  // Usar logo por defecto en logout
        };
        localStorage.setItem("userData", JSON.stringify(newUserData));
      }
      
      console.log('Token eliminado, tema preservado:', currentTheme);
      setIsLoggedIn(false);
      setUserName("");
      navigate("/login");
    }
  };

  // Escuchar eventos de inicio de sesión
  useEffect(() => {
    const handleLogin = () => {
      setIsLoggedIn(true);
      loadUserData();
      
      // También intentar cargar el tema del usuario
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      if (userData.theme && setTheme) {
        console.log("Estableciendo tema después de login:", userData.theme);
        setTheme(userData.theme);
      }
    };
    
    window.addEventListener('userLoggedIn', handleLogin);
    
    return () => {
      window.removeEventListener('userLoggedIn', handleLogin);
    };
  }, [setTheme]);

  // Cargar datos de usuario al iniciar sesión
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
      loadUserData();
    }
  }, [isLoggedIn]);

  // Monitorear cambios en localStorage
  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedInNow = !!localStorage.getItem("access_token");
      
      if (isLoggedInNow !== isLoggedIn) {
        setIsLoggedIn(isLoggedInNow);
        
        if (isLoggedInNow) {
          loadUserData();
          
          // Cargar tema si el usuario acaba de iniciar sesión
          const userData = JSON.parse(localStorage.getItem("userData") || "{}");
          if (userData.theme && setTheme) {
            console.log("Estableciendo tema después de cambio de estado:", userData.theme);
            setTheme(userData.theme);
          }
        }
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [isLoggedIn, setTheme]);

  return (
    <nav>
      <div className="nav-content">
        <div className="logo">
          <LogoFrame key={`logo-${isLoggedIn}-${Date.now()}`} />
        </div>

        <div className="nav_buttons">
          {!isLoggedIn && (
            <>
              <button className="nav-btn" onClick={() => navigate("/")}>Register</button>
              <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
            </>
          )}
          <button className="nav-btn" onClick={() => navigate("/home")}>Home</button>
          <button className="nav-btn" onClick={() => navigate("/settings")}>Settings</button>
          <button className="nav-btn" onClick={() => navigate("/cart")}>Cart</button>

          {/* BOTÓN DE CAMBIO DE TEMA */}
          <button
            onClick={() => handleThemeChange(theme === "light" ? "dark" : "light")}
            className="nav-btn"
            style={{
              backgroundColor: "var(--primary)",
              color: "white",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
          >
            {theme === "light" ? "Oscuro" : "Claro"}
          </button>
          
          {/* Saludo al usuario y logout */}
          {isLoggedIn && userName && (
            <div className="user-greeting">
              <div className="greeting-text">Hola, {userName}</div>
              <button className="logout-link" onClick={LogoutButton}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;