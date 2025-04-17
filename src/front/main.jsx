import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./routes";
import { StoreProvider } from './hooks/useGlobalReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./hooks/i18n"


const Main = () => {
    
    return (
            <React.StrictMode>  
                <StoreProvider>  
                    <RouterProvider router={AppRoutes}>
                    </RouterProvider>
                </StoreProvider>
            </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)