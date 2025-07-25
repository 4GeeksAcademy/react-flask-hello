import "./Soporte.css";
export const Soporte = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section id="Soporte" className="Soporte">
      <div className="Soporte__container">
        <h2 className="Soporte__title">Soporte</h2>

        <form onSubmit={handleSubmit} className="Soporte__form" noValidate>
          <div className="Soporte__field">
            <label htmlFor="email" className="Soporte__label">Email</label>
            <input
              type="email" id="email" name="email" placeholder="nombre@ejemplo.com" required className="Soporte__input"
            />
          </div>

          <div className="Soporte__field">
            <label htmlFor="subject" className="Soporte__label">¿Qué problema tienes?</label>
            <input type="text" id="subject" name="subject" placeholder="Explica brevemente tu problema" className="Soporte__input"/>
          </div>

          <div className="Soporte__field">
            <label htmlFor="message" className="Soporte__label">Escribe tu mensaje</label>
            <textarea id="message" name="message" rows="6" placeholder="Deja un comentario..." className="Soporte__textarea" required/>
          </div>

          <div className="Soporte__actions">
            <button type="submit" className="Soporte__button">Enviar</button>
          </div>
        </form>
      </div>
    </section>
  );
};
