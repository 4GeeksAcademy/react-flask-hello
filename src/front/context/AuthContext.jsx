import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // ✅ Recuperar el token sin parsear si lo guardaste como string plano
        const token = localStorage.getItem("token");
        if (token) setUser({ token });
    }, []);

    const login = (token) => {
        // ✅ Guardar directamente como string (no usar JSON.stringify)
        localStorage.setItem("token", token);
        setUser({ token });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
