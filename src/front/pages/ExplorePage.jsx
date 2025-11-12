import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import "./ExplorePage.css";
import productServices from "../services/product.services";
import { ProductCard } from "../components/ProductCard";

export const ExplorePage = () => {
  const navigate = useNavigate();
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

