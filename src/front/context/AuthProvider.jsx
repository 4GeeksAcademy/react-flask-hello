import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [store, setStore] = useState({
        access_token: null,
        user: null
    })

    const login = () => { }
    const register = () => { }
    const checkUser = () => {
        if (sessionStorage.getItem('access_token')) {
            setStore((preStore) => ({
                ...preStore,
                access_token: sessionStorage.getItem('access_token')
            }))
        }
    }

    const getProfile = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store?.access_token}`
            }
        })
            .then((response) => response.json())
            .then((response_json) => {
                setStore((preStore) => ({
                    ...preStore,
                    user: {
                        profile: response_json.profile
                    }
                }))
            })
    }

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <AuthContext.Provider value={{ store, login, register, getProfile }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)