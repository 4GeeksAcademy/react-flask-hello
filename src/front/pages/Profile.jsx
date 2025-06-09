import axios from 'axios'
import react, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

export const Profile = () => {

    const URLBACK = import.meta.env.VITE_BACKEND_URL
    const [user, setUser] = useState(null)
    const [token] = useState(localStorage.getItem('token'))

    useEffect(() => {

        if (!token) {
            Navigate('/login')
            return
        }

        const fetchProfile = async () => {
            try {
                const resp = await axios.get(`${URLBACK}/api/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(resp.data.user)
                setUser(resp.data.user)
            }
            catch (error) {
                console.error('Error al traer los datos del usuario', error)
            }
        }
        fetchProfile()

    }, [token])

    if (!user) return <p>Cargando perfil...</p>

    return (
        <>
            <div>
                <h1>Perfil</h1>
                <p>Nombre: {user.first_name}</p>
                <p>Apellido: {user.last_name}</p>
                <p>Email: {user.email}</p>
                <p>Direccion: {user.address}</p>

                <h1>Mi carrito de compras</h1>
                {user.shopping_cart.length === 0 ? (
                    <p>No has agregado productos al carrito</p>
                ) : (
                    <ul>
                        {user.shopping_cart.map(product => (
                            <li key={product.id}>
                                <p>{product.product_name}</p> - ${product.price}
                                <br />
                                <em>{product.description}</em>``
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </>
    )
}