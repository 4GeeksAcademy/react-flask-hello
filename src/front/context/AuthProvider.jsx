import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [store, setStore] = useState({
        access_token: null,
        user: null
    })

    const login = (token, userData) => {
        sessionStorage.setItem("access_token", token);
        sessionStorage.setItem("role", userData.role);
        console.log(userData);

        setStore({
            access_token: token,
            user: {
                role: userData.role,
                profile: userData
            }
        });
    }
    const logout = () => {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("role");

        setStore({
            access_token: null,
            user: null
        });
    }
    const checkUser = () => {
        const token = sessionStorage.getItem("access_token");
        if (token) {
            setStore((prevStore) => ({
                ...prevStore,
                access_token: token
            }));
            getProfile();
        }
    }

    const getProfile = async () => {
        const token = sessionStorage.getItem("access_token");
        const role = sessionStorage.getItem("role");
        if (!token || !role) {
            logout()
            return;
        }

        const endpointMap = {
            admin: "admin",
            teacher: "teacher",
            student: "student"
        };

        const profileEndpoint = endpointMap[role];
        if (!profileEndpoint) {
            console.warn("Rol desconocido, cerrando sesión");
            logout();
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${profileEndpoint}/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.warn("Token vencido, cerrando sesión");
                    logout();
                }
                return;
            }

            const userData = await response.json();
            setStore((prevStore) => ({
                ...prevStore,
                user: {
                    role: role,
                    profile: userData
                }
            }));
        } catch (err) {
            console.error("Error en getProfile:", err);
            logout();
        }
    }

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <AuthContext.Provider value={{ store, setStore, login, logout, getProfile }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)