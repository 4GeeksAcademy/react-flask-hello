import { useEffect, useState } from "react";
import ConsejoModal from "../components/ConsejoModal";
import { Productos } from "../components/Prouductos";

export function Perros() {
  const apiUrl = import.meta.env.VARIABLE_RENDER + "/api/product";
  console.log(apiUrl)
  const [showModal, setShowModal] = useState(true);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sample-service-name-w6uw.onrender.com/api/product")
      .then((res) => {
        console.log(res)
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })

      .then((data) => {
        console.log(data)
        const productosPerro = data.products.filter(
          (producto) => producto.pet_type?.id === 1
        );
        setProductos(productosPerro);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error en GET:", err);
        setLoading(false);
      });
  }, []);


  const getProductosPorCategoria = (categoria) =>
    productos.filter((producto) => producto.category === categoria);

  return (
    <div className="container mt-4 mb-2">
      <h1 className="mb-4 text-decoration-underline">
        Productos para perros <i className="fa-solid fa-bone"></i>
      </h1>

      <ConsejoModal tipo="perros" show={showModal} onClose={() => setShowModal(false)} />

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <>
          <h2 className="text-primary text-decoration-underline">Comida</h2>
          <Productos productos={getProductosPorCategoria("comida")} />

          <h2 className="text-warning text-decoration-underline mt-3">Juguetes</h2>
          <Productos productos={getProductosPorCategoria("juguetes")} />

          <h2 className="text-danger text-decoration-underline mt-3">Accesorios</h2>
          <Productos productos={getProductosPorCategoria("accesorios")} />

          <h2 className="text-success text-decoration-underline mt-3">Cuidados</h2>
          <Productos productos={getProductosPorCategoria("cuidados")} />
        </>
      )}
    </div>
  );
}


