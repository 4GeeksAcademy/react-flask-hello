
import React, { useContext, useState, useEffect } from "react";



export const TabList = () => {
  return (
    <div className="nav1">
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            className="nav-item nav-link active"
            id="nav-home-tab"
            data-toggle="tab"
            href="#nav-reseñas"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Reseñas <span className="badge badge-light">9</span>
          </a>
          <a
            className="nav-item nav-link nav-link-midle"
            id="nav-profile-tab"
            data-toggle="tab"
            href="#nav-vistas"
            role="tab"
            aria-controls="nav-vistas"
            aria-selected="false"
          >
            Vistas <span className="badge badge-light">9</span>
          </a>
          <a
            className="nav-item nav-link "
            id="nav-contact-tab"
            data-toggle="tab"
            href="#nav-porVer"
            role="tab"
            aria-controls="nav-porVer"
            aria-selected="false"
          >
            Por ver <span className="badge badge-light">9</span>
          </a>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-reseñas"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          {/* {/ * COMPONENTE RESEÑAS * /} */}
        </div>
        <div
          className="tab-pane fade"
          id="nav-vistas"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          {/* {/ * COMPONENTE LISTA VISTAS * /} */}
        </div>
        <div
          className="tab-pane fade"
          id="nav-porVer"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          {/* {/ * COMPONENTE LISTA POR VER * /} */}
        </div>
      </div>
    </div>
  );
};

