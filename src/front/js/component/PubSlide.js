import React from "react";

const PubSlide = () => {
  return (
    <div className="pub-slide my-5">
      <div
        id="carouselExampleCaptions"
        className="carousel slide pub-slide-home"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="inner">
          <div className="carousel-item active">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/800px-Cidade_Maravilhosa.jpg"
              className="d-block w-100"
              alt="First Slide"
            />
            <div className="carousel-caption d-md-block">
              <h2 className="title-slide">Brasil</h2>
              <p className="trip-desc">
                Ven a relajarte en las playas de Brasil y bailar al ritmo de las olas.
              </p>
              <span className="normal-price">Precio normal:: 1 200.00$</span>
              <br />
              <span className="prenium-price">Precio premium: 1 000.00$</span>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://www.marcovasco.fr/blog/wp-content/uploads/2017/07/Machu-Picchu-Perou-1014x487.jpg"
              className="d-block w-100"
              alt="Second Slide"
            />
            <div className="carousel-caption d-md-block">
              <h2 className="title-slide">Peru</h2>
              <p className="trip-desc">
                Ven a descubrir los misterios del Imperio Inca y la belleza de sus montañas y paisajes.
              </p>
              <span className="normal-price">Precio normal: 1 200.00$</span>
              <br />
              <span className="prenium-price">Precio premium: 1 000.00$</span>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://www.economy.com.bo/asset/thumbnail,992,558,center,center/media/economy/images/2021/11/30/2021113018453670867.jpg"
              className="d-block w-100"
              alt="Third Slide"
            />
            <div className="carousel-caption d-md-block">
              <h2 className="title-slide">Colombia</h2>
              <p className="trip-desc">
                Descubre las bellezas de Colombia y sus paisajes.
              </p>
              <span className="normal-price">Precio normal: 1 200.00$</span>
              <br />
              <span className="prenium-price">Precio premium: 1 000.00$</span>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default PubSlide;
