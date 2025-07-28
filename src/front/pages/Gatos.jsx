import { useEffect, useState } from "react";
import ConsejoModal from "../components/ConsejoModal";

export function Gatos() {
  const [showModal, setShowModal] = useState(true); // mostrar al cargar

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Productos para gatos</h1>
      <ConsejoModal tipo="gatos" show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
