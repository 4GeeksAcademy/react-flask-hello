import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { AppointmentsList } from "../../components/AppointmentList/AppointmentList";
import "./Appointments.css"

export const Appointments = () => {
    const navigate = useNavigate();
    const { store } = useGlobalReducer();
    const { token, selectedBusiness } = store;

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        if (!selectedBusiness) {
            alert("You must select a business before viewing appointments.");
            navigate('/business');
            return;
        }
    }, [token, selectedBusiness, navigate]);

    return (
        <div className="page-appointments">
            <div className="container">
                <div className="content-wrapper">
                    <AppointmentsList />
                </div>
            </div>
        </div>
    );
};
