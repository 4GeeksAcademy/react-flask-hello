import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import CreateEventForm from "../component/CreateEventForm";


export const CreateEvent = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className>
            <CreateEventForm />
		</div>
	);
};
