import React from "react";
import "../../styles/intercambio.css";
import BannerIntercambio from "../component/intercambio/BannerIntercambio";

const Intercambio = () => {
  return (
    <div className="contenedor container-fluid p-0">
      <div className="colorFondo row col-md-12 m-0">
        <div
          className="img-intercambio col-md-4"
          style={{
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "45%",
            borderTopRightRadius: "0",
            borderBottomRightRadius: "45%",
          }}
        ></div>
        <BannerIntercambio />
      </div>
      <div class="containerButton">
        <a href="#" class="button ">
          Intercambiar
        </a>
      </div>
    </div>
  );
};

export default Intercambio;

/* import React from "react";

import Banner from "../component/intercambio/Banner";
import BannerInverso from "../component/intercambio/BannerInverso";

const Intercambio = () => {
  return (
    <div className="div container-fluid">
      <div className="div row">
        <Banner />
      </div>
      <div className="div row">
        <BannerInverso />
      </div>
    </div>
  );
};

export default Intercambio;
 */
