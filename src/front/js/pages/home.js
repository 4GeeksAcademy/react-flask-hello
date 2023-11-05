import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { CardFeedVen } from "../component/card_feed_ven.jsx"
import { CardFeedAlq } from "../component/card_feed_alq.jsx"

export const Home = () => {
	const { store, actions } = useContext(Context);
    const [login, setLogin] = useState("show active")
    const [loginST, setLoginST] = useState("active")
	const [register, setRegister] = useState("")
    const [registerST, setRegisterST] = useState("")

    useEffect(() => {
		actions.getAlquileres()
		actions.getVentas()
	}, [])

    
    function alquileres() {
        if (login == "") {
            setLogin("show active")
            setLoginST("active")
            setRegister("")
            setRegisterST("")
        }
    }

    function ventas() {
        if (register == "") {
            setRegister("show active")
            setRegisterST("active")
            setLogin("")
            setLoginST("")
        }
    }

    return (
        <div className="text-white p-5">
            <ul className="nav nav-pills nav-justified mb-5" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <h2 className={"nav-link " + loginST} id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                        aria-controls="pills-login" aria-selected="true" onClick={() => alquileres()}>Alquileres</h2>
                </li>
                <li className="nav-item" role="presentation">
                    <h2 className={"nav-link " + registerST} id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                        aria-controls="pills-register" aria-selected="false" onClick={() => ventas()}>Ventas</h2>
                </li>
            </ul>
            <div className="tab-content">
                <div className={"tab-pane fade " + login} id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                {store.alquileres.map((item, index) => {
					return (
                    <div key={index} className="row ">
                        <CardFeedAlq className="col-4" ubicacion={item.location} precio={item.price} id={item.id}/>
                    </div>
                    )})}
                </div>
                <div className={"tab-pane fade " + register} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                {store.ventas.map((item, index) => {
					return (
                    <div key={index} className="row">
                        <CardFeedVen className="col-4" ubicacion={item.location} precio={item.price} id={item.id}/>
                    </div>
                    )})}
                </div>
            </div>


        </div>
    );
};
