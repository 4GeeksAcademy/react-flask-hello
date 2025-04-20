import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Login from "../components/Login.jsx";
import './Styles/PageLogin.css'
  


 const PageLogin = () => {

	return (

		<div className="log-content">
			<Login/>
		</div>


	);
}; 

export default PageLogin;