import { useEffect, useState } from "react";
import { get_products } from "../data/products";

export default function ProductList() {

  const [product, setProduct] = useState([])

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const products = await get_products();
        console.log("Productos obtenidos:", products);
        setProduct(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [])


  return (
    <div className="container py-4">
      <h2 className="mb-4">Nuestros productos</h2>
      <div className="row">
        {product.length === 0 ? (
          <div className="col-12">
            <p>No hay productos disponibles.</p>
          </div>
        ) : (
          product.map((item) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{item.product_name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text"><strong>Precio:</strong> ${item.price}</p>
                  {/* Agrega más campos si lo deseas */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

