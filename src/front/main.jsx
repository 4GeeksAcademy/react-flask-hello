import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' 
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider } from "react-router-dom";  
import { router } from "./routes";  
import { StoreProvider } from './hooks/useGlobalReducer';  

const Main = () => {
    return (
        <React.StrictMode>  
            <StoreProvider> 
                <RouterProvider router={router}>
                </RouterProvider>
            </StoreProvider>
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />)