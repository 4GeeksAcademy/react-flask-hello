import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { get_products } from "../data/products";

export default function ProductList() {

  const [product, setProduct] = useState({})

  useEffect(() => {


  }, [])


  return (
    <div className="container py-4">
      <h2 className="mb-4">Nuestros productos</h2>
      <div className="row">
        {/* {productos.map((producto) => (
          <div key={producto.id} className="col-12 col-sm-6 col-md-4 mb-4">
            <ProductCard producto={producto} />
          </div>
        ))} */}
      </div>
    </div>
  );
}

