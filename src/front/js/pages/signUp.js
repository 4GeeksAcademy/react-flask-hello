import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { SignUpForm } from "../component/SignUpForm";


export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className>
            <SignUpForm />
		</div>
	);
};
