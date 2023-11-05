import React, { useState } from "react";
import '../../styles/contacto.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    sendCopy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("URL_DEL_BACKEND", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indica que estás enviando datos en formato JSON
        },
        body: JSON.stringify(formData), // Convierte el objeto formData a JSON
      });

      if (response.ok) {
        // El envío fue exitoso, puedes mostrar un mensaje de éxito al usuario
        console.log("Mensaje enviado con éxito");
      } else {
        // Puedes manejar errores aquí
        console.error("Error al enviar el mensaje");
      }
    } catch (error) {
      // Puedes manejar errores aquí
      console.error("Error al enviar el mensaje", error);
    }
  };

  return (
    <div>
      <form className="formContact" onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="name">Nombre</label>
          <input 
            type="text"
            id="name"
            name="name"
            className="fcContact form-control white-background-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">Dirección de correo eléctronico</label>
          <input
            type="email"
            id="email"
            name="email"
            className="fcContact form-control white-background-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="message">Mensaje</label>
          <textarea
            className="fcContact form-control white-background-input"
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            id="sendCopy"
            name="sendCopy"
            checked={formData.sendCopy}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="sendCopy">
            Envíame una copia de este mensaje
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
