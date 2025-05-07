import React, {useState} from "react";
 
 export const SignIn = () => {
  const [formData, setFormData]= useState({
    email: "", 
    password: "",
  });

  const [error, setError] = useState("");
  
  const handleChange= (e)=> {
    setFormData({...formData, [e.target.name]: e.target.value});
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.email || !formData.password){
      setError ("Please complete all fields");
      return;
    }

    console.log("login sent:", formData);
    alert("Login info ready to send");

    //this is the place for the fetch 
    // const response = await fetch("BACKEND_URL/login", { ... })
  };


   return (
    <form
       onSubmit={handleSubmit}
       className="container d-flex flex-column align-items-center justify-content-center"
       style={{ minHeight: "100vh" }}
     >
     
       <div className="mb-4">
         <div
           className="logo rounded-circle bg-secondary d-flex align-items-center justify-content-center"
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
         <h4 className="text-center mb-4">Sign In</h4>

         {error &&(
          <div className= "alert alert-danger text-center p-2">
            {error}
            </div>
         )}
 
         <div className="mb-3">
           <input
             type="text"
             name= "email"
             value={formData.email}
             onChange={handleChange}
             placeholder="Email"
             className="form-control"
           />
         </div>
 
 
         <div className="mb-3">
           <input
             type="password"
             name= "password"
             value= {formData.password}
             onChange= {handleChange}
             placeholder="Password"
             className="form-control"
           />
         </div>
       </div>
 
    
       <button type= "submit" className="btn btn-secondary">Sign In</button>
       <a href="/password" className="btn btn-link">Forgot Password?</a>

     
    </form>
   );
 };