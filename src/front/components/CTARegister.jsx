import React from "react";
import { useNavigate } from "react-router-dom";

const CTARegister = () => {

  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="container cta-section text-center py-5  text-white my-5 rounded-4 col-sm-12 col-md-12 col-lg-12">

      <h2 className="tittle-CTA mb-3">¿Listo para comenzar tu camino?</h2>
      <p className="lead mb-4">
        Únete a <strong>MentorMatch</strong> y da el siguiente paso en tu desarrollo profesional.
      </p>
      <a
        className="bottom-register btn btn-light fw-bold px-5 py-2"
        variant="light"
        size="lg"
        onClick={handleRegisterClick}
      >
        Regístrate ahora
      </a>
    </div>

  );
};

export default CTARegister;