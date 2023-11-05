import React from "react";
import { PersonalInfoProfile } from "../component/personal-Info";



export const SectionProfile = () => {
  return (
    <>
      <ul style={{ marginLeft: '400px' }} className="nav" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="trades-tab-pane" aria-selected="true">Mis intercambios</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="wishList-tab-pane" aria-selected="false">Mi lista de deseos</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#datos-tab-pane" type="button" role="tab" aria-controls="info-tab-pane" aria-selected="false">Mis datos</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="myFeed-tab-pane" aria-selected="false">Mis publicaciones</button>
        </li>
      </ul>




      <div className="tab-content" id="myTabContent">

        {/* AQUI VAN LOS INTERCAMBIOS QUE SE HAN HECHO             */}
        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
          <div>
            <h1>Mis intercambios
            </h1>
          </div>
        </div>
        {/* AQUI VA LA WISH LIST */}

        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">Mi lista de deseos</div>


        {/* AQUI VAN LOS DATOS DE LOS USUARIOS */}
        <div className="tab-pane fade" id="datos-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">


          <div style={{ marginLeft: '50px' }}>
            <PersonalInfoProfile />
          </div>

          ‹
        </div>




        <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabIndex="0">Mis publicaciones</div>
      </div>
    </>
  );
}
