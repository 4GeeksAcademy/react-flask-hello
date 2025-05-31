import { createContext, useState, useContext } from "react";
// Crear un nuevo contexto
const UserContext = createContext();

// Este componente envuelve tu app y proporciona el estado del usuario
export const UserProvider = ({ children }) => {
    const [user, setUser] = useStates(null);// Estado para guardar la info del usuario

    return (
        // Proveemos el estado del usuario y la funcion para actualizarla
        <UserContext.Provider value={{ user, setUser}}>
            {children}
            </UserContext.Provider>

    );
};
export const useUser = () => useContext(UserContext);