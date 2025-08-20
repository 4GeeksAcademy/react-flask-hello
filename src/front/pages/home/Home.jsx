import "./home.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Games } from "../../components/games/Games";
import { Maps } from "../../components/maps/Maps";



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
              <div key={index} className="custom-carousel-height bg-indigo-500">
                <img src={i.src} alt="img" className="w-full h-full object-cover" />
              </div>
            )
          })
        }
      </Carousel>

      <div className="bg-white/10 backdrop-blur-md text-white px-6 py-6 rounded-lg shadow-lg mx-auto mt-6 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold mb-2 tracking-wide">🎮 ¡Bienvenida Gamer!</h2>
        <p className="text-lg text-gray-200">Regístrate y obtén <span className="font-bold text-indigo-300">20% de descuento</span> en tu primera compra</p>
      </div>
      <div>
        <Games />
      </div>
      <div className="mt-10" style={{ height: 500 }}>
        <Maps />
      </div>
    </div>
  );

}