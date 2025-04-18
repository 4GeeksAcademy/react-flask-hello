import React from "react";
import { ServiceForm } from "../../components/ServiceForm/ServiceForm"

export const NewService = () => {
    return (
        <>
            {/* Content */}
            <div className="container mt-5">
                <div className="row">
                    < ServiceForm />{/* Services Form */}
                </div>
            </div>
        </>
    );
};