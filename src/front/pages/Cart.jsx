import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_TU_CLAVE_PUBLICA') // ⚠️ Reemplaza con tu clave real

const Cart = () => {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState(() => {
    const localCarrito = localStorage.getItem('carrito')
    return localCarrito ? JSON.parse(localCarrito) : {}
  })

  useEffect(() => {
    fetch('https://fluffy-space-spoon-v6q9vgr5vqjx2w5vx-3001.app.github.dev/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error(err))
  }, []) 

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  const addCarrito = (producto) => {
    setCarrito(prev => {
      const updated = { ...prev }
      if (updated[producto.id]) {
        updated[producto.id].cantidad += 1
      } else {
        updated[producto.id] = { ...producto, cantidad: 1 }
      }
      return updated
    })
  }

  const incrementar = (id) => {
    setCarrito(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        cantidad: prev[id].cantidad + 1
      }
    }))
  }

  const decrementar = (id) => {
    setCarrito(prev => {
      const updated = { ...prev }
      updated[id].cantidad -= 1
      if (updated[id].cantidad === 0) delete updated[id]
      return updated
    })
  }

  const vaciarCarrito = () => {
    setCarrito({})
  }

  const totalCantidad = Object.values(carrito).reduce((acc, item) => acc + item.cantidad, 0)
  const totalPrecio = Object.values(carrito).reduce((acc, item) => acc + item.cantidad * item.precio, 0)

  const handleCheckout = async () => {
    const stripe = await stripePromise
    const response = await fetch('https://fluffy-space-spoon-v6q9vgr5vqjx2w5vx-3001.app.github.dev/crear-sesion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: Object.values(carrito) })
    })

    const data = await response.json()
    stripe.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <div className="container my-4">
      <h1>Carrito</h1>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Cantidad</th>
            <th>Acción</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(carrito).map(prod => (
            <tr key={prod.id}>
              <th scope="row">{prod.id}</th>
              <td>{prod.title}</td>
              <td>{prod.cantidad}</td>
              <td>
                <button className="btn btn-info btn-sm me-2" onClick={() => incrementar(prod.id)}>+</button>
                <button className="btn btn-danger btn-sm" onClick={() => decrementar(prod.id)}>-</button>
              </td>
              <td>$ {prod.precio * prod.cantidad}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            {totalCantidad === 0 ? (
              <th colSpan="5">Carrito vacío - comience a comprar!</th>
            ) : (
              <>
                <th colSpan="2">Total productos</th>
                <td>{totalCantidad}</td>
                <td>
                  <button className="btn btn-danger btn-sm me-2" onClick={vaciarCarrito}>Vaciar todo</button>
                  <button className="btn btn-success btn-sm" onClick={handleCheckout}>Pagar</button>
                </td>
                <td><strong>$ {totalPrecio}</strong></td>
              </>
            )}
          </tr>
        </tfoot>
      </table>

      <div className="row">
        {productos.map(prod => (
          <div className="col-12 col-md-4 mb-3" key={prod.id}>
            <div className="card h-100">
              <img src={prod.thumbnailUrl} className="card-img-top" alt={prod.title} />
              <div className="card-body">
                <h5 className="card-title">{prod.title}</h5>
                <p className="card-text">${prod.precio}</p>
                <button className="btn btn-dark" onClick={() => addCarrito(prod)}>Comprar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart
