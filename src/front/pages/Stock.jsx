import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'

const Stock = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch('/api/productos') // Asegúrate de tener esta ruta implementada
      .then(res => res.json())
      .then(data => setProductos(data))
  }, [])

  return (
    <div className="container my-5">
      <h2 className="mb-4">🛍️ Productos en Stock</h2>
      <div className="row">
        {productos.map(prod => (
          <div className="col-md-4 mb-4" key={prod.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={prod.image_url}
                className="card-img-top"
                alt={prod.product_name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{prod.product_name}</h5>
                <p className="card-text text-muted">{prod.description}</p>
                <p className="fw-bold">💶 {prod.price_per_unit} €</p>
                <div className="mt-auto d-flex justify-content-end">
                  <button className="btn btn-outline-primary">
                    <FaShoppingCart /> Añadir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stock
