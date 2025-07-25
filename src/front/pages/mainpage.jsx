import React from "react";

export const MainPage = () => {
  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      {/* Logo */}
      <div
        className="p-4 mb-3 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "#e0e0e0",
          width: "100%",
          maxWidth: "400px",
          height: "200px",
          borderRadius: "8px",
        }}
      >
        <h4 className="text-center mb-4">LOGO</h4>
      </div>

      {/* Sign Up */}
      <div
        className="p-4 mb-3"
        style={{
          backgroundColor: "#e0e0e0",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
        }}
      >
        <button className="btn btn-secondary d-block mx-auto">Sign Up</button>
      </div>

      {/* Sign In */}
      <div
        className="p-4 mb-3"
        style={{
          backgroundColor: "#e0e0e0",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
        }}
      >
        <button className="btn btn-secondary d-block mx-auto">Sign In</button>
      </div>

      {/* Password Recovery */}
      <div
        className="p-4 mb-3"
        style={{
          backgroundColor: "#e0e0e0",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
        }}
      >
        <button className="btn btn-secondary d-block mx-auto">
          Password Recovery
        </button>
      </div>
    </div>
  );
};
