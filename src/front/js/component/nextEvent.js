import React from "react"
import '../../styles/nextEvent.css'
const nextEvent = () => {
  return (
    <div className="contSuperior" style={{minHeight:"400px"}}>
     <div style={{ textAlign: "center" }} className="col-12">
            <h1>Eventos</h1>
            <div className="divider divider-default m-3"></div>
          </div>
      <div id="header" className="card">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h3><b>Title</b></h3>
              <div className="row">
                <div className="col">
                  <p id="eventTitle"><a href="registrarse">The colombian Game</a></p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p id="eventTitle">Torneo Juvenil Las Palmas</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p id="eventTitle">The Last Game</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p id="eventTitle">The Premium Tournament</p>
                </div>
              </div>
            </div>
            <div className="col">
              <h3>Fecha del evento</h3>
              <div className="row">
                <div className="col">
                  <p>06 Oct 2023</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p>13 Oct 2023</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p>01 Nov 2023</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p>03 Nov 2023</p>
                </div>
              </div>
            </div>
            <div className="col">
              <h3>Day</h3>
              <div className="row">
                <div className="col">
                  <p>Friday</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p>Friday</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p>Wednesday</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p>Friday</p>
                </div>
              </div>
            </div>
            <div className="col">
              <h3>Ubicación</h3>
              <div className="row">
                <div className="col">
                  <p>Medellin,Abtioquia,Colombia</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p>Mazatlán,sinaloa,Mexico</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p>Los Mochis,Sinaloa,Mexico</p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p>San José,Costa Rica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default nextEvent;
