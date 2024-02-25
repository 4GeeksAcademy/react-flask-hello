import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import logo from "../../img/logoOCEANOM.png"
import { Link } from "react-router-dom";

export const Home = () => {
	const [state, setState] = useState({
		//initialize state here
	});

	const { store, actions } = useContext(Context);

	const [styleStartNow, setStyleStartNow] = useState("btn-light");

	// boton Learn more que cuando haya hover se ponga el texto blanco
    const handleHoverInButton = () => {
        setStyleStartNow("btn-outline-secondary text-light");
    }
    // al quitar el hover vuelva al texto en azul
    const handleHoverOutButton = () => {
        setStyleStartNow("btn-light");
    };


	return (
		<div className="container-fluid d-flex p-0 col-lg-12 col-md-12 col-sm-12">
			<img id="imagenFija" src="https://res.cloudinary.com/dx23woi99/image/upload/v1708541359/IMG_5841_tkuzrc.jpg" className="card-img-top p-0" alt="Imagen Fija" style={{width: "100%"}}/>
			<div className="card-img-overlay">
				
					
				
					<div className="d-flex justify-content-end">
						<button type="button" className="btn btn-outline-light p-2 mx-2">Contact Us</button>
						<Link to="/login">
						<button type="button" className="btn btn-outline-light btn-lg">Login</button>
						</Link>
					</div>
		
					<div className="mt-4 ms-2 col-lg-12 col-md-12 col-sm-12">
						<img src={logo} className="card-img-top p-0" alt="..." style={{width: "50%"}}/>
						
					</div>
				
					<div className="d-block ms-4 text-start col-lg-12 col-md-6 col-sm-6">
						<span className="text-light fs-5 text-center mt-3">
						Come and practice in this ocean of online yoga <br></br> classes. 
						With teachers from all over the globe! <br></br>
						Any style, at any time.
						</span>
					<div className="d-flex align-items-center justify-content-start mt-5">
						<button type="button" className={`btn ${styleStartNow} btn-lg text-secondary`} onMouseEnter={handleHoverInButton} onMouseLeave={handleHoverOutButton}>
							{/* <Link className={`btn ${styleStartNow}`}> */}
                            	Start Now
                       	 	{/* </Link> */}
						</button>
					</div>	
					</div>
			</div>
		
		
		</div>
	);
};
