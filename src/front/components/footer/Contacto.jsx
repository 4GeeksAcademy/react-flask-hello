import { useState } from "react";
import "./Contacto.css";

export const Contacto = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="contacto-trigger" onClick={() => setOpen(true)}>
        Contacto
      </button>

      {open && (
        <div className="contacto-backdrop" onClick={() => setOpen(false)}>
          <div
            className="contacto-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="contacto-close"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h2>Contáctanos</h2>
            <p>Para cualquier consulta, escríbenos a:</p>
            <ul>
              <li>Email: soporte24/7@gamestore.com</li>
              <li>Teléfono: +34 600 123 456</li>
              <li>Horario: Lunes–Viernes, 9:00–18:00</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
