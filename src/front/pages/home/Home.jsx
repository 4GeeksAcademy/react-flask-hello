import "./home.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Games } from "../../components/games/Games";




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
    {
      src: "https://4kwallpapers.com/images/wallpapers/frank-woods-call-of-2560x1080-19693.jpg",
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

    <div className="w-full max-w-screen-2xl mx-auto relative bg-gray-900">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        customTransition="all .5"
        transitionDuration={500}
        className="rounded-lg overflow-hidden"
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

      <div class="h-22 bg-gray-900 text-white px-6 py-4 w-full mx-auto ease-in-out ">
        <h2 class="text-2xl font-bold mb-2 text-center sm:text-xl md:text-3xl">¡Oferta de Bienvenida!</h2>
        <p class="text-lg text-center sm:text-base md:text-xl">20% de descuento en juegos por registrarte</p>
      </div>

      <div>
        <Games />
      </div>
    </div>
  );

}