import { useEffect, useState } from "react";
import ConsejoModal from "../components/ConsejoModal";
import { Productos } from "../components/Prouductos";

export function Perros() {
  const [showModal, setShowModal] = useState(true); 

  return (
    <div className="container mt-4 mb-2">
      <h1 className="mb-4 text-decoration-underline">Productos para perros <i class="fa-solid fa-bone"></i></h1>
      <ConsejoModal tipo="perros" show={showModal} onClose={() => setShowModal(false)} />
      <h2 className="text-primary text-decoration-underline">Comida</h2>
      <Productos></Productos>
      <h2 className="text-warning text-decoration-underline mt-3" >Juguetes</h2>
      <Productos></Productos>
      <h2 className="text-danger text-decoration-underline mt-3">Accesorios</h2>
      <Productos></Productos>
      <h2 className="text-success text-decoration-underline mt-3 " >Cuidados</h2>
      <Productos></Productos>
    </div>
  );
}
