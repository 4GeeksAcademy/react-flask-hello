import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Login from "../components/Login.jsx";
  


 const PageLogin = () => {

	return (

		<div className="log-content">
			<Login/>
		</div>


	);
}; 

export default PageLogin;