import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppointmentForm } from "../../components/AppointmentForm/AppointmentForm";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const Appointment = () => {

    const { clientId } = useParams();
    const navigate = useNavigate();
    const { store } = useGlobalReducer();
    const { token, selectedBusiness } = store;


    useEffect(() => {

        if (!token) {
            navigate('/login');
            return;
        }

        if (!selectedBusiness) {
            alert("You have to select a business before to create a appointment");
            navigate('/business');
            return;
        }
    }, [token, selectedBusiness, navigate]);

    return (
        <div className="page-container">
            <div className="content-wrapper">
                <AppointmentForm clientId={clientId} />
            </div>
        </div>
    );
};