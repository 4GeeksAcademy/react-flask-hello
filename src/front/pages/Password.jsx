import React from "react";

export const Password = () => {
  return (<div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
    
      <div className="mb-4">
        <div
          className=" logo rounded-circle bg-secondary d-flex align-items-center justify-content-center position-absolute"
          style={{ width: 80, height: 80, color: "white", fontWeight: "bold", position: "absolute", top: "20px", left: "20px"}}
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
        <h4 className="text-center mb-4">Password Recovery</h4>

        <div className="mb-3">
          <input
            type="text"
            placeholder="User Name"
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
            placeholder="New Password"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <input
            type="tel"
            placeholder="Confirm New Password"
            className="form-control"
          />
        </div>
      </div>

   
      <button className="btn btn-secondary">Reset Password</button>
    </div>
  );
};
