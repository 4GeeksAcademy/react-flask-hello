// Importamos los proveedores de usuario y eventos
import { UserProvider } from "./UserContext";
import { EventProvider } from "./EventContext";

// Este componente agrupa todos los contextos en uno solo
export const StoreProvider = ({ children }) => {
    return (
        <UserProvider>
            <EventProvider>
                {children} {/* Todos los componentes hijos podran acceder al estado*/}
            </EventProvider>
        </UserProvider>
    );
};