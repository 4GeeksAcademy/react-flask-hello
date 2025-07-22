import "./home.css"

export const Home = () => {

  const images = [
    {
      src: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },
    {
      src: "https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },
    {
      src: "https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },
    {
      src: "https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },
      {
      src: "https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },
      
    // Puedes añadir más objetos aquí
  ];

  return (
    <div className="carousel">
      <h1>¡Ofertas!</h1>
      <div className="main">
        <span className="scroll-left scroll-chevron">←</span>
        <span className="scroll-right scroll-chevron">→</span>
        <section className="carousel-section">
          <div className="carousel__container">
            {images.map((image, index) => (
              <div className="carousel-item" key={index}>
                <img
                  className="carousel-item__img"
                  src={image.src}
                  alt="People"
                />
                <div className="carousel-item__details">
                  <p className="carousel-item__details--title">
                    {image.title}
                  </p>
                  <p className="carousel-item__details--subtitle">
                    {image.subtitle}
                  </p>
                  <div className="carousel-item__details--icons">
                    <i className="fa fa-2x fa-play-circle"></i>
                    <i className="fa fa-2x fa-plus-circle"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
