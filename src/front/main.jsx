import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes.jsx"
import { StoreProvider } from "./hooks/useGlobalReducer"
import { BackendURL } from "./components/BackendURL"
import { GoogleOAuthProvider } from "@react-oauth/google"

const Main = () => {
  if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "")
      return (
            <React.StrictMode>
                    <BackendURL />
                          </React.StrictMode>
                              )

                                const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ""

                                  return (
                                      <React.StrictMode>
                                            <GoogleOAuthProvider clientId={googleClientId}>
                                                    <StoreProvider>
                                                              <RouterProvider router={router} />
                                                                      </StoreProvider>
                                                                            </GoogleOAuthProvider>
                                                                                </React.StrictMode>
                                                                                  )
                                                                                  }

                                                                                  ReactDOM.createRoot(document.getElementById("root")).render(<Main />)
