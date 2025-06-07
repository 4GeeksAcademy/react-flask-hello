import { createContext, useState } from "react";

// Importamos desde React lo necesario para contexto y estado
import { createContext, useState, useContext } from "react";

// Creamos un nuevo contexto para los eventos
const EvenContext = createContext();

// Este componente maneja la lista de eventos y la hace disponible globalmente
export const EvenProvider = ({ children}) => {
    const [events, setEvents] = useState([]); // Lista de eventos

    return (
        // Proveeemos los eventos y la funcion para modificarlos
        <EventContext.Provider value={{ events, setEvents }}>
            {children}                 
        </EventContext.Provider>
    );
};
export const useEvents = () => useContext(EvenContext);