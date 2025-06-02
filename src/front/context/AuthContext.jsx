import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Verifica si hay token en localStorage
        const token = localStorage.getItem("token");
        if (token) setUser({ token });
    }, []);
    const login = (token) => {
        localStorage.setItem("token", token);
        setUser({ token });
    };
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);