//* 👆 🤟🏼 ❇️ Riki for the group success 8_Abril 👊 */

import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envío aquí
  };

  return (
    <form onSubmit={handleSubmit} className="landing-contact-form">
      <input 
        type="text" 
        placeholder="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <textarea
        placeholder="Mensaje"
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactForm;