import React, { useState } from "react";

export const SignUp = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stops page to reload
    console.log(">>>Form Data to be sent!!!:", formData);
    try {
      const fetchSignUp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData) //
      })
      console.log(">>>Response Status!!!:", fetchSignUp.status);


      const data = await fetchSignUp.json()
      console.log(">>>Response Body!!!!:", data);
      if (fetchSignUp.ok) {
        alert("Sign Up Successful!")
        setFormData( // reset form data 
          {
            name: "",
            email: "",
            password: "",
            phone: ""
          })
      }
      else {
        alert("Sign Up failed: " + data.msg);
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: ""
        }) // clear password field 
      }
    }
    catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>

        <div className="mb-4">
          <div
            className=" logo rounded-circle bg-secondary d-flex align-items-center 
          justify-content-center position-absolute top-0 start-0 pt-5"
            style={{ width: 80, height: 80, color: "white", fontWeight: "bold" }}
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="form-control"
            />
          </div>
        </div>



        <button type="submit" className="btn btn-secondary">Sign Up</button>
      </form>
    </div >

  );
};
