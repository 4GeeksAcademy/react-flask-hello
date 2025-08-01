import logoB from "../assets/img/logoB.svg";


export const Footer = () => (
  <footer style={{ backgroundColor: "#003366" }} className="text-white py-3">
    <div className="container">
      <div className="row text-center text-md-start align-items-center">
        

        <div className="col-md-4 mb-3 mb-md-0">
          <h5 className="mb-0 d-flex align-items-center">
            <img src={logoB} alt="Logo" width={200} />
          </h5>
        </div>

    
        <div className="col-md-4 mb-3 mb-md-0">
          <h6 className="fw-bold">Ubicación</h6>
          <p className="mb-0 small">
            Avenida Única, calle 10B este Parque Industrial, edificio 5011<br />
            Ciudad del Saber
          </p>
        </div>

        
        <div className="col-md-4">
          <h6 className="fw-bold">Horarios</h6>
          <p className="mb-0 small">
            Lun a Vier: 8:00 am - 6:00 pm<br />
            Sábados: 10:00 am - 4:00 pm
          </p>
        </div>
      </div>
    </div>
  </footer>
);
