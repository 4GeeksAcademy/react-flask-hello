import React from 'react';

const IntroView = () => {
  return (
    <div className="jumbotron container mb-5">
  <div className="jumbotron d-flex align-items-center">
    <div className="jumbotron-content">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 style={{ textAlign: "left", fontSize: "5rem" }}>
              <strong>Powerful <span style={{"color":"#FD5812"}}>components</span> for your website</strong>
            </h1>
            <ol style={{ textAlign: "left", fontSize: "1.3rem", marginTop: "20px" }}>
              <li>Hundreds of quality components & templates</li>
              <li>All consistent, well-documented, reliable</li>
              <li>Super simple, 1-minute installation</li>
              <li>Easy theming and customization</li>
            </ol>
          
            <div className="d-flex">
              <a href="#learn" type="button" className="btn btn-info mx-3 text-white" > <strong>How to use it</strong></a>
              <a href="#plans" type="button" className="btn btn-warning text-white"  style={{ backgroundColor: '#FD5812'}}> <strong>Pricing</strong></a>
            </div>
          </div>
          <div className="col-md-6">
            <img src="https://img.freepik.com/vector-gratis/ilustracion-concepto-equipo-ui-ux_114360-11703.jpg?w=2000&t=st=1694632172~exp=1694632772~hmac=ce191f67379da31d2830de1fd1823e9c38aadee48c13488b21f9915fcfa2bc23" alt="Descripción de la imagen" style={{ width: "120%" }} />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  );
};

export default IntroView;