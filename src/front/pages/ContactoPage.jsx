import React, { useState } from "react";
import "../../styles/contactoPage.css";

const ContactoPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el correo
    console.log("Formulario enviado:", formData);
    alert("Tu mensaje ha sido enviado correctamente.");
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
  };

  return (
    <div className="contacto-page container mt-5">
      <section className="cpHero text-center py-5">
        <h1 className="display-4 tittle">Contáctanos</h1>
        <p className="lead">¿Tienes preguntas? ¡Estamos aquí para ayudarte!</p>
      </section>

      <section className="formulario my-5">
        <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="asunto" className="form-label">Asunto</label>
            <input
              type="text"
              className="form-control"
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">Mensaje</label>
            <textarea
              className="form-control"
              id="mensaje"
              name="mensaje"
              rows="4"
              value={formData.mensaje}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-dark w-100">Enviar mensaje</button>
        </form>
      </section>
    </div>
  );
};

export default ContactoPage;
