import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

const Signup = () => {
    const { store, actions } = useContext(Context);

    const [name, setName] = useState(""); // Nuevo estado para el nombre
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [repeatPassword, setRepeatPassword] = useState(""); // Nuevo estado para repetir la contraseña
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        actions.SignupUser( name, lastName, email, password, isActive); // Agregar name y repeatPassword aquí
        navigate('/login');
    };

    const letras = { color: "dark" };

    return (
        <div className="d-flex justify-content-center mt-4 pb-3">
            

            <form className="w-50 bg-white p-3 m-4 rounded-3 signup-form signup-form-bg" style={letras}>
                <h2 className="text-center mt-2 mb-4">REGISTER</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"></label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label"></label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Your Last Name"
                        value={lastName}
                        onChange={(e) =>  setLastName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"></label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Your email address"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"></label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* <div className="mb-3">
                    <label htmlFor="repeatPassword" className="form-label"></label>
                    <input
                        type="password"
                        className="form-control"
                        id="repeatPassword"
                        placeholder="Repeat your password"
                        value={repeatPassword}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setRepeatPassword(e.target.value);
                        }}
                        
                    />
                </div> */}

                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <label className="form-check-label mb-3" htmlFor="exampleCheck1">I agree to sign up for COMPONENTIFY account notification?</label>
                </div>
                <div class="card-footer text-body">
                <button onClick={handleSignup} type="submit" className="btn btn-warning text-white">
                   <strong>SIGN UP</strong> 
                </button></div>
            </form>            
        </div>
    );
}

export default Signup;