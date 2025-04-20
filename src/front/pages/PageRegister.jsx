import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Register from "../components/Register.jsx";
import './Styles/PageRegister.css'


 const PageRegister = () => {

	return (

		<div className="reg-content">
			 <Register/>
		</div>


	);
}; 

export default PageRegister;