import React from "react";

export const SignUp = () => {
  return (<div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
    
      <div className="mb-4">
        <div
          className=" logo rounded-circle bg-secondary d-flex align-items-center 
          justify-content-center position-absolute top-0 start-0 pt-5"
          style={{ width: 80, height: 80, color: "white", fontWeight: "bold"}}
        >
          Logo
        </div>
      </div>

      
      <div
        className="p-4 mb-3"
        style={{
          backgroundColor: "#e0e0e0",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "8px",
        }}
      >
        <h4 className="text-center mb-4">Sign Up</h4>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Name"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            placeholder="Phone Number"
            className="form-control"
          />
        </div>
      </div>

   
      <button className="btn btn-secondary">Sign Up</button>
    </div>
  );
};
