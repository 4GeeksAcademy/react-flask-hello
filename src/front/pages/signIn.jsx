import React from "react";
 
 export const SignIn = () => {
   return (<div
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
 
         <div className="mb-3">
           <input
             type="text"
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
       </div>
 
    
       <button className="btn btn-secondary">Sign In</button>
       <button className="btn btn-link">Forgot Password?</button>
     </div>
   );
 };