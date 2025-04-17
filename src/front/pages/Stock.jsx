import React, { useEffect, useState } from 'react'

const Stock = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    // Al cargar el componente, pedimos los productos al backend buys.py
    fetch('https://fluffy-space-spoon-v6q9vgr5vqjx2w5vx-3001.app.github.dev/api/productos/') 
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error cargando productos:', err))
  }, [])

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Nuestra Tienda</h1>
      <div className="row">
        {productos.map((prod) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={prod.id}>
            <div className="card h-100">
              <img 
                src={prod.image_url} 
                className="card-img-top" 
                alt={prod.product_name} 
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{prod.product_name}</h5>
                <p className="card-text">{prod.description}</p>
                <p className="card-text fw-bold">${prod.price_per_unit.toFixed(2)}</p>
                <button className="btn btn-primary mt-auto">
                  🛒 Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stock

