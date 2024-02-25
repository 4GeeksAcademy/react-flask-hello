import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

let stylebackgroundimg = {
    backgroundColor: "#FBF9F1",
    //  backgroundImage: `url("https://www.sattology.com/wp-content/uploads/2020/06/simbolo-do-om-ornamental_1058-101.jpg")`,
    backgroundImage: `url("https://res.cloudinary.com/dx23woi99/image/upload/v1708370471/om_1_cmnuza.png")`,

    backgroundRepeat: "no-repeat",
    backgroundPosition: "80% 40%",
    backgroundSize: "20%",
}

export const Formulario = () => {
    const [state, setState] = useState({
        //initialize state here
    });
    const [email, setUserEmail] = useState("");
    const [password, setPassword] = useState("")
    const { store, actions } = useContext(Context)

    async function handleLogin(e) {
        e.preventDefault()
        console.log(email, password);
        let logged = await actions.login(email, password);
        console.log(logged)
        // if (logged) { //true
        //     navigate("/")
        // }
    }

    return (

        <form className="d-flex flex-column justify-content-center h-100 align-items-center opacity-50" style={stylebackgroundimg} onSubmit={handleLogin}>
            <div className="text-center  col-11 col-sm-6 col-lg-4">
                <div className="card-body">
                    <h1 style={{ fontFamily: 'Poiret One' }}>Login Om</h1>
                    <div className="mb-1 text-start">
                        <label for="exampleInputEmail1" className="form-label">Email/Username</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setUserEmail(e.target.value)} />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-1 text-start">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-outline-secondary w-50 mt-3">Login</button>
                </div>
                <div className="d-flex flex-column flex-lg-row justify-content-center gap-1 gap-lg-5">
                    <p><a href="#" className="link-secondary">Don't have an acount?</a></p>
                    <p><a href="#" className="link-secondary">Forgot password?</a></p>

                </div>
            </div>
            <p>Follow us</p>
            <div>
                <i className="fa-brands fa-xl fa-twitter m-1 " style={{ color: "#9b9d85" }}></i>
                <i className="fa-brands fa-xl fa-instagram m-1" style={{ color: "#9b9d85" }}></i>
                <i className="fa-brands fa-xl fa-facebook m-1" style={{ color: "#9b9d85" }}></i>
            </div>
        </form>
    );
};
{/* <div src="https://www.sattology.com/wp-content/uploads/2020/06/simbolo-do-om-ornamental_1058-101.jpg"></div>  ((((esta es la foto de omkara que va en la derecha)))*/ }
