import ProductCard from "../components/ProductCard";

const productos = [
  {
    id: 1,
    nombre: "Sudadera Negra",
    precio: 39.99,
    imagen: "https://via.placeholder.com/200x150?text=Sudadera"
  },
  {
    id: 2,
    nombre: "Camiseta Blanca",
    precio: 24.99,
    imagen: "https://via.placeholder.com/200x150?text=Camiseta"
  },
  {
    id: 3,
    nombre: "Zapatillas Urbanas",
    precio: 59.99,
    imagen: "https://via.placeholder.com/200x150?text=Zapatillas"
  }
];

export default function ProductList() {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Nuestros productos</h2>
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.id} className="col-12 col-sm-6 col-md-4 mb-4">
            <ProductCard producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
}

