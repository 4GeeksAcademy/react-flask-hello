import "./home.css"

export const Home = () => {

  const images = [
    {
      src: "https://boliviajuegosdigitales.com/wp-content/uploads/2023/09/s1das.jpg",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },
    {
      src: "https://gamestorechile.com/files/images/thumbs/productos_300x400_1702678327-lords-of-the-fallen-deluxe-edition-xbox-series-xs-0.jpg",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },
    {
      src: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/02/metroid-prime-remastered-ficha-2954954.jpg",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },
    {
      src: "https://www.thecuriosityshop.es/cdn/shop/products/ciudadelas_4.jpg?v=1492678534",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },
      {
      src: "https://www.juegoscrisis.com/wp-content/uploads/HDP.png",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },
    {
      src: "https://static.carrefour.es/hd_510x_/crs/cdn_static/catalog/hd/857892_00_1.jpg",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },
    {
      src: "https://m.media-amazon.com/images/I/51Wqw4uXSLL.jpg",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },
        {
      src: "https://s3.us-east-2.amazonaws.com/ccp-prd-s3-uploads/2018/11/22/e17684391b88d44fc0e76d9b68edc36f38b2ee05.jpeg",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },
    {
      src: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_107511265?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },

    {
      src: "https://m.media-amazon.com/images/I/71jutUjvo8L.jpg",
      title: "Título descriptivo del vídeo en curso",
      subtitle: "2019 16+ 114 minutos",
    },

   // Puedes añadir más objetos aquí
  ];

  return (
    <div className="carousel">
      <h1>¡Ofertas!</h1>
      <div className="main">
        <section className="carousel-section overflow-x-auto cursor-pointer">
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
