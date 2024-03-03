import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { FormCONTACT } from "../component/formCONTACT";
import { useNavigate } from "react-router-dom";

export const ContactUs = () => {

	const [state, setState] = useState({
   		
	});

	const { store, actions } = useContext(Context)



	return (
		<div className="container-fluid mt-5 pt-5">
			<FormCONTACT />
		</div>
	);
};
