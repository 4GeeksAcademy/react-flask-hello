// AboutUs.jsx
import "./aboutus.css";
import silviaImg from "./img/silvia.jpg";
import AlbertoImg from "./img/Alberto.jpg";

export const AboutUs = () => {
  return (
    <>
      <div className="container">
      <div className="image-with-caption">
        <a
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="image-link"
        >
          <img
            className="item1"
            src={silviaImg}
            alt="Silvia"
          />
          <div className="caption">
            <h4>Adrian</h4>
            <p>Experto en ventas.</p>
          </div>
        </a>
      </div>
         <div className="image-with-caption">
        <a
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="image-link"
        >
          <img
            className="item1"
            src={AlbertoImg}
            alt="Alberto"
          />
          <div className="caption">
            <h4>Alberto</h4>
            <p>Soporte24/7.</p>
          </div>
        </a>
        </div>
        <div className="image-with-caption">
        <a
          href="https://www.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="image-link"
        >
          <img
            className="item1"
            src={silviaImg}
            alt="Silvia"
          />
          <div className="caption">
            <h4>Silvia</h4>
            <p>Gerente.</p>
          </div>
        </a>
      </div>
      </div>
    </>
  );
};
