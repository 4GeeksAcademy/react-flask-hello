import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Global styles for your application
import { RouterProvider } from "react-router-dom";  // Import RouterProvider to use the router
import { router } from "./routes";  // Import the router configuration
import { StoreProvider } from './hooks/useGlobalReducer';  // Import the StoreProvider for global state management
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';

const Main = () => {

    return (
        <React.StrictMode>
            <Suspense
                fallback={
                    <div className='d-flex justify-content-center align-items-center' style={{ width: "100vh", height: "100vh" }}>
                        <div>
                            <div class="spinner-grow text-warning" role="status">
                                <span class="visually-hidden"></span>
                            </div>
                            <div class="spinner-grow text-success" role="status">
                                <span class="visually-hidden"></span>
                            </div>
                            <div class="spinner-grow text-light" role="status">
                                <span class="visually-hidden"></span>
                            </div>
                        </div>
                    </div>}>
                {/* Provide global state to all components */}
                <StoreProvider>
                    {/* Set up routing for the application */}
                    <RouterProvider router={router}>
                    </RouterProvider>
                </StoreProvider>
            </Suspense>
        </React.StrictMode>
    );
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
