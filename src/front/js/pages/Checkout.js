import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import CheckoutPage from "../component/CheckoutPage";

import CheckoutImage from "../../img/pitch/sections/checkout-backdrop.png"

const Single = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventData = await actions.fetchEvent(params.id);
                setEvent(eventData);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchData();
    }, [actions, params.id]);

    return (
        <div>
            <div className="container-full black-background" style={{ backgroundImage: `url(${CheckoutImage})`, backgroundSize: 'cover', backgroundPosition: 'center'  }}>
                {event && <CheckoutPage event={event} />}
            </div>
        </div>
    );
};

Single.propTypes = {
    match: PropTypes.object
};

export default Single;
