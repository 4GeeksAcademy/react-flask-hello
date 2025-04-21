import React from "react";
import { ListOfService } from "../../components/ListOfServices/ListOfServices";
import "./ServicesList.css"


export const ServicesList = () => {
    return(
        <div className="all-services">
            < ListOfService />
        </div>
    );
};