import { useEffect, useState } from "react";
import ConsejoModal from "../components/ConsejoModal";

export function Perros() {
  const [showModal, setShowModal] = useState(true); // mostrar al cargar

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Productos para perros</h1>
      <ConsejoModal tipo="perros" show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
