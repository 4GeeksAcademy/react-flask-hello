// AboutUs.jsx
import "./aboutus.css";
import SilviaImg from "./img/Silvia.png";
import AlbertoImg from "./img/Alberto.jpg";
import AdrianImg from "./img/Adrian.png";


export const AboutUs = () => {
  return (
    <>
       <section className="about-company">
        <h2>Sobre Nuestra Empresa GameStore</h2>
        <p>
          En <strong>GameStore</strong> nos dedicamos a ofrecer productos y
          servicios de alta calidad enfocados en la experiencia del cliente.
        </p>
        <p>
          Nuestra misión es brindar soluciones innovadoras y personalizadas en
          el ámbito tecnológico y del entretenimiento. Creemos en la
          transparencia, el compromiso y la mejora continua como pilares
          fundamentales de nuestro trabajo diario.
        </p>
      </section>
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
            src={AdrianImg}
            alt="Adrian"
          />
          <div className="caption">
            <h4>Adrian Lombarte</h4>
              <p>
                Experto en ventas con más de 10 años de experiencia ayudando a
                nuestros clientes a encontrar la mejor solución para sus
                necesidades. Su enfoque está en la atención personalizada y el
                crecimiento sostenible.
              </p>
          </div>
        </a>
      </div>
         <div className="image-with-caption">
        <a
          href="https://link.space/@Betoluchenco"
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
            <h4>Luis Alberto</h4>
              <p>
                Responsable del soporte técnico 24/7. Se asegura de que todos
                nuestros sistemas funcionen de manera óptima, ofreciendo
                asistencia inmediata y soluciones rápidas para mantener a
                nuestros clientes siempre conectados.
              </p>
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
            src={SilviaImg}
            alt="Silvia"
          />
          <div className="caption">
            <h4>Silvia Perez</h4>
              <p>
                Gerente general encargada de la dirección estratégica de la
                empresa. Su liderazgo asegura que el equipo trabaje alineado con
                la visión y valores de la compañía, impulsando la innovación y
                la excelencia en cada proyecto.
              </p>
          </div>
        </a>
      </div>
      </div>
    </>
  );
};
