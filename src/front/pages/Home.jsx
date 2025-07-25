import videoBackground from "../assets/video.mp4";
import imagenBack from "../assets/fondo-cantante.jpg"

export const Home = () => {

    return (
        <div className="home-page-container">
            <h1>ESTO ES EL HOME</h1>
            <div className="imagen-background">
                <img src={imagenBack} alt="imagen fondo" />
            </div>
        </div>
    );

};