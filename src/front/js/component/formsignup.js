import React, { useContext, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FormSignup = ({ freeTrial }) => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        //initialize state here
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [lastname, setLastName] = useState("")
    const [date_of_birth, setDate_of_birth] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { store, actions } = useContext(Context)

    async function handleFormSignup(e) {
        e.preventDefault()
        let logged = ""
        console.log(name, lastname, date_of_birth, email, password, confirmPassword);
        if (freeTrial) {
            logged = await actions.signupFree(name, lastname, date_of_birth, email, password, confirmPassword);
        } else {

            logged = await actions.signup(name, lastname, date_of_birth, email, password, confirmPassword);
        }
        console.log(logged)
        if (logged) {
            navigate("/sessions")
        } else {
            toast.error("Invalid email or password");
        }
    }
    
    return (
        <>
            <ToastContainer />
            <form className="stylebackgroundimg container d-flex mt-5 flex-column mb-5 opacity-50 ms-5 text-center " onSubmit={handleFormSignup}>
                <h1 className="poiret-one-regular fs-1">New Practitioner</h1>
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-6 col-lg-4 ">
                        <div className="card-body">
                            <div className="mt-5 text-start">
                                <label htmlFor="exampleInputEmail1" className="form-label mt-3">Your beautiful first name</label>
                                <input type="name" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-1 text-start">
                                <label htmlFor="exampleInputLastName1" className="form-label mt-3">The last name someone gave you</label>
                                <input type="lastname" className="form-control" id="exampleInputLastName1" onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="mb-1 text-start">
                                <label htmlFor="exampleInputDate_of_birth1" className="form-label mt-3">The date came to life</label>
                                <input type="date" className="form-control" id="exampleInputDate_of_birth1" onChange={(e) => setDate_of_birth(e.target.value)} />
                            </div>
                            <div className="mb-1 text-start">
                                <label htmlFor="exampleInputEmail1" className="form-label mt-3">Your best email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-column mt-5 align-items-center col-11 col-sm-6 col-lg-4">
                        <div className="card-body mt-5 text-start d-flex flex-column justify-content-center my-auto">
                            <label htmlFor="exampleInputPassword1" className="form-label mt-3">A password you would always remember</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="exampleInputConfirmPassword1" className="form-label mt-3">Again, just in case</label>
                            <input type="password" className="form-control" id="exampleInputConfirmPassword1" onChange={(e) => setConfirmPassword(e.target.value)} />
                            <button type="submit" className="btn btn-outline-secondary w-50 mt-5">Sign Up</button>
                        </div>
                    </div>
                </div>
                <div>

                <h1 className="poiret-one-regular mt-5">Thank you a feel warmly welcomed</h1>
                </div>

            </form>
        </>
    );
};
