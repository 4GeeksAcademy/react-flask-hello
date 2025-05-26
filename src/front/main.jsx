import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Global styles for your application
import { RouterProvider } from "react-router-dom";  // Import RouterProvider to use the router
import { router } from "./routes";  // Import the router configuration
import { StoreProvider } from './hooks/useGlobalReducer';  // Import the StoreProvider for global state management
import { AuthProvider } from './context/AuthContext';
// import { BackendURL } from './components/BackendURL';

const Main = () => {
    
    // if(! import.meta.env.VITE_BACKEND_URL ||  import.meta.env.VITE_BACKEND_URL == "") return (
    //     <React.StrictMode>
    //          <BackendURL/ >
    //     </React.StrictMode>
    //    );
    return (
        <React.StrictMode>  
            <StoreProvider> 
                <AuthProvider> 
                    <RouterProvider router={router} />
                </AuthProvider>
            </StoreProvider>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
