import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'

const Stock = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetch('/api/') // Asegúrate de tener esta ruta implementada
      .then(res => res.json())
      .then(data => setProductos(data))
  }, [])

  const fotos = [
    {
      id: 1,
      titulo: "My Crazy dog Spark!",
      fecha: "08/26",
      likes: 204,
      imagen: "https://waterdogspain.com/wp-content/uploads/2023/11/spanish_water_dog_1638705614_2721982440044397483_198876414.jpg",
      descripcion: "This is an example of a very good photo that you can post on instagram"
    },
    {
      id: 2,
      titulo: "Turko",
      fecha: "08/26",
      likes: 26985,
      imagen: "https://pamipe.com/wp-content/uploads/2022/10/Perro-de-agua-espan%CC%83ol-2.jpg",
      descripcion: "Another beautiful dog ready for Instagram!"
    },
    {
      id: 3,
      titulo: "Simba",
      fecha: "06/100",
      likes: 1580,
      imagen: "https://waterdogspain.com/wp-content/uploads/2023/11/spanish_water_dog_1491515525_1487262483110757851_198876414.jpg",
      descripcion: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
      id: 4,
      titulo: "Header",
      fecha: "",
      likes: 0,
      imagen: "https://www.smartdog.es/img/cms/BLOG/PERRO%20AGUA/PERRO%20DE%20AGUA%20RASTA.jpg",
      descripcion: "Another quick example text for the card."
    },
    // Puedes agregar más objetos aquí
  ]

  return (
    <>
      {/* Mosaico de Fotos */}
      <div className="container mt-5 mw-10">
        <div className="row">
          {fotos.map(foto => (
            <div className="post d-md-flex justify-content-md-center mb-4" key={foto.id}>
              <div className="card border-primary mb-3" style={{ maxWidth: '50rem' }}>
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h2>{foto.titulo}</h2>
                  {foto.fecha && <div className="contador d-flex justify-content-end">{foto.fecha}</div>}
                </div>
                <img
                  src={foto.imagen}
                  alt={foto.titulo}
                  className="card-img-top"
                  style={{ height: 'auto', width: '100%' }}
                />
                <div className="card-body text-primary">
                  {foto.likes > 0 && <h5 className="card-title">{foto.likes} Likes</h5>}
                  <p className="card-text">{foto.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Productos en Stock */}
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
    </>
  )
}

export default Stock
