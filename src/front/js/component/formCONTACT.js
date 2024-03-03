import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


import "../../styles/contactUs.css";


export const FormCONTACT = () => {

    const [state, setState] = useState({
        //initialize state here
    });

    // activamos el useNavigate
    // const navigate = useNavigate();

    const { store, actions } = useContext(Context)

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("")

    async function handleContact(e) {
        e.preventDefault()
        console.log(email, name, message);
        let logged = await actions.contactus(email, name, message);
        console.log(logged)
        // if (logged) { //true
        //     navigate("/");
        // } else {
        //     toast.error("Invalid email or password");
        // }
       
    }

    return (
    

        <form className="stylebackgrounding col-12 col-lg-12 col-md-12 col-sm-12 d-flex flex-column justify-content-center align-items-center text-secondary pt-5 mt-3" onSubmit={handleContact}>
            <div className="d-flex col-12 col-sm-12 col-md-6 col-lg-6 mb-5 ms-3">
                <div className="d-block pr-3 me-5 col-6">
                        <h1 className="poiret-one-regular">Contact Us</h1>
                        <span className="poiret-one-regular">Your well being is our priority. If you have questions, suggestions, or simply want to share your experience, we are here to listen. Connect with us and let us be part of your journey towards inner peace and harmony. </span>
                        <div className="mt-5">
                            <div>
                                <i className="fa-solid fa-envelope fa-lg me-2"></i>
                                <span className="poiret-one-regular">info@oceanofom.com</span>
                            </div>
                            <div>
                                <i className="fa-solid fa-phone fa-lg"></i>
                                <span className="poiret-one-regular">÷34 610234567</span>
                            </div>
                           
                        </div>
                       
                       
                        <div className="mt-5">
                            <div>
                                <p className="mb-2 poiret-one-regular">Follow us on</p>
                            </div>
                        <div>
                            <i className="fa-brands fa-xl fa-twitter m-1 " style={{ color: "#9b9d85" }}></i>
                            <i className="fa-brands fa-xl fa-instagram m-1" style={{ color: "#9b9d85" }}></i>
                            <i className="fa-brands fa-xl fa-facebook m-1" style={{ color: "#9b9d85" }}></i>
                        </div>
                        </div>
                    </div>
                    
    

                <div className="d-block col-6 col-md-6 col-sm-12 col-lg-6 mt-5">
                    <div className="d-block">
                        <div className="mb-1 text-start">
                            <label className="form-label poiret-one-regular">Email</label>
                            <input type="email" className="form-control inputEmail" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                           
                        </div>
                        <div className="mb-1 text-start">
                            <label className="form-label poiret-one-regular">Name</label>
                            <input type="name" className="form-control inputEmail" onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div>
                            <label className="form-label poiret-one-regular">How can we help you?</label>
                            <input className="form-control inputComment" id="exampleInputPassword1" onChange={(e) => setMessage(e.target.value)} />
                            <Link to="/thankyou">
                            <button type="submit" className="btn btn-outline-secondary w-50 mt-3 poiret-one-regular fs-5">Send</button>
                            </Link>
                    </div>
                </div>

                </div>
            </form>
      
    );
};