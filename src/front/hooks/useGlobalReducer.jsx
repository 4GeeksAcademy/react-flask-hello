import { useContext, useReducer, createContext, useState, useEffect } from "react";
import storeReducer, { initialStore } from "../store"  

const StoreContext = createContext()

export function StoreProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setloading] = useState(true)

    useEffect (() => {
        const token = localStorage.getItem('token')

        setIsAuthenticated(!!token) 
        setloading(false)
        
    },[])

    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem('token')
            setIsAuthenticated(!!token)
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [])

    const login = (token) => {
        localStorage.setItem('token', token)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }

    
    const [store, dispatch] = useReducer(storeReducer, initialStore())
 
    return <StoreContext.Provider value={{ store, dispatch, isAuthenticated, loading, login, logout }}>
        {children}
    </StoreContext.Provider>
}


export default function useGlobalReducer() {
    const { dispatch, store, isAuthenticated, loading, login, logout } = useContext(StoreContext)
    return { dispatch, store, isAuthenticated, loading, login, logout };
}