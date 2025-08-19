// AboutUs.jsx
import "./aboutus.css";
import SilviaImg from "./img/Silvia.png";
import AlbertoImg from "./img/Alberto.jpg";
import AdrianImg from "./img/Adrian.png";

import { Instagram } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Twitter } from 'lucide-react';





export const AboutUs = () => {
  return (

    <div className="contain">
      <div className="title">
        <h1>SOBRE NOSOTROS</h1>

      </div>
      <div className="description-1">
        <div className="contain-img">
          <img className="img-1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLN1GbAMxeKUlI_8Iqn4TtDF2e_w3RmBBH-g&s" alt="" />

        </div>
        <div className="contain-text">
          <h5>Lideres desde 1991</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae culpa praesentium
            consequatur beatae quia ipsam assumenda iure repellat harum adipisci debitis, amet voluptatibus veniam illum
            dolorum aut numquam. Soluta, eaque?</p>

        </div>
      </div>
      <div className="description-2">
        <div className="contain-text-2">
          <h5>Lideres desde 1991</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae culpa praesentium
            consequatur beatae quia ipsam assumenda iure repellat harum adipisci debitis, amet voluptatibus veniam illum
            dolorum aut numquam. Soluta, eaque?</p>

        </div>
        <div className="contain-img-2">
          <img className="img-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLN1GbAMxeKUlI_8Iqn4TtDF2e_w3RmBBH-g&s" alt="" />


        </div>
      </div>
      <div className="title-2">
        <h1>EQUIPO</h1>
      </div>
      <div className="contain-team">
      
        <div className="card-team">
          <div className="card-img">
            <img src={SilviaImg} alt="" />
          </div>
          <div className="description-card">
            <p>Silvia</p>
            <p>Front-End</p>
          </div>
          <div className="contain-social">
            <div>
              <Instagram color="#ffffff" />

            </div>
            <div>
              <Facebook color="#ffffff" />

            </div>
            <div>
              <Mail color="#ffffff" />

            </div>
            <div>
              <Twitter color="#ffffff" />

            </div>

          </div>
        </div>
        <div className="card-team">
          <div className="card-img">
            <img src={AlbertoImg} alt="" />
          </div>
          <div className="description-card">
            <p>Alberto</p>
            <p>Back-End</p>
          </div>
          <div className="contain-social">
            <div>
              <Instagram color="#ffffff" />

            </div>
            <div>
              <Facebook color="#ffffff" />

            </div>
            <div>
              <Mail color="#ffffff" />

            </div>
            <div>
              <Twitter color="#ffffff" />

            </div>

          </div>
        </div>
        <div className="card-team">
          <div className="card-img">
            <img src={SilviaImg} alt="" />
          </div>
          <div className="description-card">
            <p>Adrian Beneroso</p>
            <p>Full-Stack</p>
          </div>
          <div className="contain-social">
            <div>
              <Instagram color="#ffffff" />

            </div>
            <div>
              <Facebook color="#ffffff" />

            </div>
            <div>
              <Mail color="#ffffff" />

            </div>
            <div>
              <Twitter color="#ffffff" />

            </div>

          </div>
        </div>


      </div>


    </div>

  );
};
