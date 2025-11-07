import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-center text-light"
    >
      {/* Logo */}
      <div className="mb-4">
        <img
          src="https://res.cloudinary.com/drv35m83m/image/upload/v1762508774/logo_MeetFit_transparente_arl18c.png"
          alt="MeetFit Logo"
          style={{ width: "140px", height: "140px" }}
        />
      </div>

      {/* Título */}
      <h1 className="fw-bold" style={{ color: "#f97316" }}>
        MeetFit
      </h1>

      {/* Botón de Login */}
      <div className="mt-5 w-100 px-5">
        <Button
          variant="warning"
          className="w-100 py-2 fw-bold"
          style={{
            backgroundColor: "#f97316",
            border: "none",
            color: "white",
            borderRadius: "10px",
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </Container>
  );
};
