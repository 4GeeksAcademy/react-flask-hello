import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import { LoginModal } from "./LoginModal";

// 2. Crear el componente JSX
function Jumbotron() {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [modalState, setModalState] = useState({
        showModal: false,
        showModalUpdate: false,
    });

    async function handleClickCreatEvent() {
        // await actions.obtenerEventosCategoria("DEPORTE")	
        navigate('/createEventForm');
    }
    function handleClickRegister() {
        setModalState({ showModal: true });
    }

    return (<div>
        {store.auth ? (
            <div className="Div-grande-que-encierra-todo flex row m-1">
                <div className="Derecha-Imagen mt-4 flex col-sm-12 col-md-6 col-lg-6">
                    <img className="img-thumbnail rounded-circle-1 float-end border-0" src="https://static.vecteezy.com/system/resources/previews/017/293/071/non_2x/two-young-boys-playing-guitar-together-cartoon-style-illustration-free-vector.jpg" alt="" />
                </div>
                <div className="m-auto Izquierda-Texto d-inline row justify-content-center py-5 col-sm-12 col-md-6 col-lg-6">
                    <h1 className="text-center display-5 mx-auto p-4 col-sm-12 col-md-12 col-lg-12"><strong>Can't find an event for you?</strong></h1>
                    <p className="lead mx-auto p-4 d-flex justify-content-center col-sm-12 col-md-12 col-lg-12">Create your own event</p>
                    <button type="button" onClick={handleClickCreatEvent} className="btn-custom btn bg-400 text-white p-4 btn-lg mx-auto d-flex justify-content-center col-sm-12 col-md-12 col-lg-5">Create Event</button>
                    {/* <a className="btn bg-300 text-white p-4 btn-lg mx-auto d-flex justify-content-center col-sm-12 col-md-12 col-lg-5" href="#" role="button">Create Event</a> */}
                </div>
            </div>) : (
            <div className="m-auto Div-grande-que-encierra-todo flex row m-1">
                <div className="Izquierda-Texto d-inline row justify-content-center py-5 col-sm-12 col-md-6 col-lg-6">
                    <h1 className="text-center display-5 mx-auto p-4 col-sm-12 col-md-12 col-lg-12"><strong>We are looking for you!</strong></h1>
                    <p className="lead mx-auto p-4 d-flex justify-content-center col-sm-12 col-md-12 col-lg-12">You have the talent, we have the hub!</p>
                    <button type="button" onClick={handleClickRegister} className="btn btn-300 to-be-hoved text-white p-4 btn-lg mx-auto d-flex justify-content-center col-sm-12 col-md-12 col-lg-5">Join us</button>
                    {/* <a className="btn bg-300 text-white p-4 btn-lg mx-auto d-flex justify-content-center col-sm-12 col-md-12 col-lg-5" href="#" role="button">Join us</a> */}
                </div>
                <div className="Derecha-Imagen mt-4 flex col-sm-12 col-md-6 col-lg-6">
                    <img className="img-thumbnail rounded-circle-1 float-end border-0" src="https://static.vecteezy.com/system/resources/previews/025/835/903/non_2x/three-male-best-friends-are-laughing-enjoying-together-free-hand-drawing-vector.jpg" alt="" />
                </div>
            </div>)
        }
        <LoginModal show={modalState.showModal} onClose={() => setModalState({ showModal: false })} />

    </div>);
}

export default Jumbotron


// style={{paddingTop: "50px", paddingBottom: "50px"}}