import { useEffect, useState } from "react";
import { get_products } from "../data/products";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export default function ProductList() {

  const [product, setProduct] = useState([])
  const { dispatch, isAuthenticated, loading } = useGlobalReducer();
  const navigate = useNavigate();

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

  const hanledAddToCart = (item) => {
    if (!isAuthenticated) {
      alert("Por favor, inicia sesión para añadir productos al carrito.");
      navigate('/login')
      return;
    }
    console.log("Producto añadido al carrito:", item);
    dispatch({ type: "agregar_al_carrito", payload: item });
  }

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
                <img
                  src="https://picsum.photos/200"
                  className="card-img-top"
                  alt={item.product_name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.product_name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text"><strong>Precio:</strong> ${item.price}</p>
                </div>
                <div className="card-footer text-center">
                  <button className="btn btn-dark" onClick={() => hanledAddToCart(item)} disabled={loading}>Añadir al carrito</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

