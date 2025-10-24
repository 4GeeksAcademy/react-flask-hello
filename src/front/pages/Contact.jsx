import React, { useState } from "react";
import imagenBack from "../assets/fondo-concierto.jpg"

export const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", form);
    alert("Gracias por contactarnos :)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="signup-page-container">
      <div className="imagen-background">
        <img src={imagenBack} alt="imagen fondo" />
      </div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card form-evet rounded-4">
              <div className="card-body p-4">
                <h2 className="text-center mb-4">Contáctanos</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="fw-bold form-label">Nombre completo</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Juan Pérez"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="fw-bold form-label">Correo electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="fw-bold form-label">Asunto</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      placeholder="Consulta sobre eventos"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="fw-bold form-label">Mensaje</label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="4"
                      placeholder="Escribe tu mensaje aquí..."
                      required
                    ></textarea>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Enviar mensaje
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
