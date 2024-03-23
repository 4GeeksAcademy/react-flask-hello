import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.user) {
            actions.authenticateUser()
                .then(() => {
                    // If authentication is successful and user is retrieved,
                    // you can optionally perform additional actions here.
                })
                .catch(() => {
                    // If authentication fails, redirect to home.
                    navigate("/");
                });
        }
    }, [actions, navigate, store.user]);

    return (
        <div className="container text-center">
            <h1>Hello!</h1>
            {store.user && (
                <div>
                    <h2>Email: {store.user.email}</h2>
                </div>
            )}
        </div>
    );
};

export default Private;