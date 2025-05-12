import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Global styles for your application
import { RouterProvider } from "react-router-dom";  // Import RouterProvider to use the router
import { router } from "./routes";  // Import the router configuration
import { StoreProvider } from './hooks/useGlobalReducer';  // Import the StoreProvider for global state management
import { BackendURL } from './components/BackendURL';
import { ReactTogether } from 'react-together'

const Main = () => {
    console.log(import.meta.env.VITE_API_KEY, "HERE IT ISSSS!!!")
    if(! import.meta.env.VITE_BACKEND_URL ||  import.meta.env.VITE_BACKEND_URL == "") return (
        <React.StrictMode>
              <BackendURL/ >
        </React.StrictMode>
        );
    return (
        <React.StrictMode>
            {/* Provide global state to all components */}
            <StoreProvider>
                {/* Set up routing for the application */}
                <RouterProvider router={router}>
                </RouterProvider>
            </StoreProvider>
        </React.StrictMode>
    );
}

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(



    <ReactTogether
    sessionParams={{
        apiKey: import.meta.env.VITE_API_KEY,
  
        // The options below will make every user immediately join session 'hello-world'
        name: 'hello-world',
        password: 'super-secret!!',
      }} >

        <Main />
    </ReactTogether>

)
