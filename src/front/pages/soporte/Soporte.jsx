import "./soporte.css";
export const Soporte = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="SoportePage">
      <main className="SoporteMain">
        <section id="Soporte" className="Soporte">
          <div className="Soporte__container">
            <h2 className="Soporte__title">Soporte</h2>
            <p className="Soporte__intro">
              Envíanos tu consulta y te responderemos lo antes posible.
            </p>

            <form onSubmit={handleSubmit} className="Soporte__form" noValidate>
              <div className="Soporte__field">
                <label htmlFor="username" className="Soporte__label">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Escribe tu nombre"
                  className="Soporte__input"
                />
              </div>

              <div className="Soporte__field">
                <label htmlFor="email" className="Soporte__label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="nombre@ejemplo.com"
                  required
                  className="Soporte__input"
                />
              </div>

              <div className="Soporte__field">
                <label htmlFor="message" className="Soporte__label">
                  Escribe tu mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Deja un comentario..."
                  className="Soporte__textarea"
                  required
                />
              </div>

              <div className="Soporte__actions">
                <button type="submit" className="Soporte__button">Enviar</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="Footer">
      </footer>
    </div>
  );
}
