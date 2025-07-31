import { Link } from "react-router-dom";

export const Carrito = () => {
  return (
    <div>
      <h1>Carrito de Compras</h1>
      <p>Esta es la página del carrito de compras.</p>
      <Link to="/">Volver a la página principal</Link>
    </div>
  );
};
