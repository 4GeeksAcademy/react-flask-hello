import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { LoginForm } from "../component/LogInForm";
import { ContactForm } from "../component/ContactForm";


export const Contact = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className>
            <ContactForm />
		</div>
	);
};
