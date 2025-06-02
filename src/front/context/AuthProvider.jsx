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
        const token = sessionStorage.getItem('access_token')
        if (token) {
            setStore((preStore) => ({
                ...preStore,
                access_token: token
            }))
        }
    }

    const getProfile = () => {
        const token = sessionStorage.getItem('access_token')
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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