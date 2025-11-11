import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { ProductCard } from "../components/ProductCard";
import "./ExplorePage.css";
import productServices from "../services/product.services";

export const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products,setProducts] = useState([])

  useEffect(() => {
    productServices.recibirProductos().then(data => {
      console.log(data.producto[0])
      setProducts(data.producto)
    })
  },[])

  
  const filteredProducts = products.filter(product =>
    product.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1>Explorar Productos</h1>
        <SearchBar onSearch={setSearchTerm} />
      </div>

      <div className="products-grid">
        {products && filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      
    </div>
  );
};