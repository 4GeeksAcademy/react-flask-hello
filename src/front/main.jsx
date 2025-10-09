import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Global styles for your application
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";  // Import RouterProvider to use the router
import { StoreProvider } from './hooks/useGlobalReducer';  // Import the StoreProvider for global state management
import { BackendURL } from './components/BackendURL';
import { PublicLayout } from './pages/PublicLayout';
import { ProtectedLayout } from './pages/ProtectedLayout';
import { Home } from './pages/public_pages/Home';
import Auth from './pages/public_pages/Auth';
import AboutUs from './pages/public_pages/AboutUs';
import TodoPanel from './pages/protected_pages/TodoPanel';
import Dashboard from './pages/protected_pages/Dashboard';


const Main = () => {

    if (! import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "") return (
        <React.StrictMode>
            <BackendURL />
        </React.StrictMode>
    );
    return (
        <React.StrictMode>
            {/* Provide global state to all components */}
            <StoreProvider>
                {/* Set up routing for the application */}

                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<PublicLayout />} errorElement={<h1>Not found!</h1>} >
                            <Route path="" element={<Home />} />
                            <Route path="auth" element={<Auth />} />
                            <Route path="about-us" element={<AboutUs />} />
                        </Route>
                        <Route path="auth" element={<ProtectedLayout />} errorElement={<h1>Not found!</h1>} >
                            <Route path="todo-panel" element={<TodoPanel />} />
                            <Route path="dashboard" element={<Dashboard />} />

                        </Route>
                    </Routes>
                </BrowserRouter>

            </StoreProvider>
        </React.StrictMode>
    );
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
