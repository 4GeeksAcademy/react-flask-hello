import "./home.css"
import { ShoppingCart } from 'lucide-react';

export const Home = () => {

  const images = [
    {
      src: "https://boliviajuegosdigitales.com/wp-content/uploads/2023/09/s1das.jpg",
      title: "God of War: Ragnarok",
      subtitle: "25€ #¡oferta! #PS5",
    },
    {
      src: "https://gamestorechile.com/files/images/thumbs/productos_300x400_1702678327-lords-of-the-fallen-deluxe-edition-xbox-series-xs-0.jpg",
      title: "Lords of the Fallen",
      subtitle: "20€ #¡oferta! #Xbox",
    },
    {
      src: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/02/metroid-prime-remastered-ficha-2954954.jpg",
      title: "Metroid Prime",
      subtitle: "19,99€ #¡oferta! #Nintendo",
    },
    {
      src: "https://www.thecuriosityshop.es/cdn/shop/products/ciudadelas_4.jpg?v=1492678534",
      title: "Ciudadelas",
      subtitle: "10,95€ #¡oferta! #Juegosdemesa",
    },
    {
      src: "https://www.juegoscrisis.com/wp-content/uploads/HDP.png",
      title: "H.D.P (Hasta Donde Puedas)",
      subtitle: "15,99€ #¡oferta! #Juegosdemesa",
    },
    {
      src: "https://static.carrefour.es/hd_510x_/crs/cdn_static/catalog/hd/857892_00_1.jpg",
      title: "Crash Bandicoot: Nsane Trilogy",
      subtitle: "30€ #¡oferta! #NintendoSwitch",
    },
    {
      src: "https://m.media-amazon.com/images/I/51Wqw4uXSLL.jpg",
      title: "Fight Night: Champion",
      subtitle: "19,95€ #¡oferta! #Xbox360",
    },
    {
      src: "https://s3.us-east-2.amazonaws.com/ccp-prd-s3-uploads/2018/11/22/e17684391b88d44fc0e76d9b68edc36f38b2ee05.jpeg",
      title: "Uncharted:The Lost Legacy",
      subtitle: "10,99€ #¡oferta! #PS4",
    },
    {
      src: "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_107511265?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402",
      title: "Sonic Superstars",
      subtitle: "9,99€ #¡oferta! #NintendoSwitch"
    },

    {
      src: "https://m.media-amazon.com/images/I/71jutUjvo8L.jpg",
      title: "Ni Si, Ni No: sin Secretos",
      subtitle: "25€ #¡oferta! #Juegosdemesa",
    },

    // Puedes añadir más objetos aquí
  ];

  return (
    <div className="carousel">

      <div class="bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-500 text-white px-6 py-4 max-w-md mx-auto mt-10 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:scale-105 sm:max-w-sm md:max-w-lg lg:max-w-xl">
        <h2 class="text-2xl font-bold mb-2 text-center sm:text-xl md:text-3xl">¡Oferta de Bienvenida!🎮 </h2>
        <p class="text-lg text-center sm:text-base md:text-xl">20% de descuento en juegos por registrarte</p>
      </div>

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
                <div className="carousel-item__details ">
                  <p className="carousel-item__details--title">
                    {image.title}
                  </p>
                  <p className="carousel-item__details--subtitle">
                    {image.subtitle}
                  </p>
                  <div className="carousel-item__details--icons">
                    <ShoppingCart />
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
