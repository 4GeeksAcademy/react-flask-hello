import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useParams } from "react-router-dom";


export const HomePage = () => {

    return (
        <div className= "container">
            <h1>Welcome To...</h1>
            <div>
                <h1>Couch Potato</h1>
            </div>
            <div>
                <h6>Reliving the good old shows is fun, but sharing the laughs, drama, and plot
                    twits make it unfirgettable.
                </h6>
            </div>
            <div>
            <br/>
            <br/>
            <br/>
                <h4 className="text-center">
                    Watch, Chat, Save, Explore!
                </h4>

            </div>
        </div>      
    )
}