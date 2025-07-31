import { useEffect, useState } from "react";
import { consejosPerros, consejosGatos } from "../data/consejos";

export default function ConsejoModal({ tipo, show, onClose }) {
  const [consejo, setConsejo] = useState("");

  useEffect(() => {
    if (show) {
      const consejos = tipo === "gatos" ? consejosGatos : consejosPerros;
      const randomIndex = Math.floor(Math.random() * consejos.length);
      setConsejo(consejos[randomIndex]);
    }
  }, [show, tipo]);

  if (!show) return null;

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-11/12 max-w-md text-center relative">
        <h2 className="text-xl font-bold mb-4"> ¡Consejo para {tipo}!</h2>
        <p className="text-black-700 mb-4 fs-4">{consejo}</p>
        <button
          className="btn btn-success text-dark mt-2"
          onClick={onClose}
        >
          ¡Gracias!
        </button>
      </div>
    </div>
  );
}
