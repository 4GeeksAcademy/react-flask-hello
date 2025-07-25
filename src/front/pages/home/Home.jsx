import "./home.css"
import { ShoppingCart } from 'lucide-react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export const Home = () => {
  const images = [
    {
      src: "https://www.xtrafondos.com/wallpapers/god-of-war-ragnarok-11256.jpg",
    },
    {
      src: "https://4kwallpapers.com/images/wallpapers/the-super-mario-2880x1800-10955.jpg",
     
    },
    {
      src: "https://images.alphacoders.com/137/1374992.jpg",
           
    },
    {
    src: "https://images4.alphacoders.com/595/595710.jpg",
    },
    // Puedes añadir más objetos aquí para el nuevo carousel
  ];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className="w-full relative">
      <Carousel
        responsive={responsive}
      >
        {
          images.map((i, index) => {
            return (
              <div key={index} className="h-64  bg-indigo-500">
                <img src={i.src} alt="img" className="w-full h-full object-cover" />
              </div>
            )
          })
        }
      </Carousel>
      <div class="h-24 bg-gradient-to-r from-indigo-800 text-white px-6 py-4 w-full mx-auto ease-in-out ">
        <h2 class="text-2xl font-bold mb-2 text-center sm:text-xl md:text-3xl">¡Oferta de Bienvenida!</h2>
        <p class="text-lg text-center sm:text-base md:text-xl">20% de descuento en juegos por registrarte</p>
      </div>
    </div>
  );
}
