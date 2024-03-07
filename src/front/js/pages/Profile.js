import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import ProfilePicture from "../../img/profile-picture.jpg";
import { SimpleCard } from "../component/SimpleCard.js";
import "../../styles/home.css";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [diasDiferencia, setDiasDiferencia] = useState(0);
    const [userData, setUserData] = useState({
        name: store.user.name,
        email: store.user.email,
        password: store.user.password
    });
    const [editable, setEditable] = useState(false);
    const [altura, setAltura] = useState(window.innerWidth < 768 ? '' : '100vh');

    useEffect(() => {
        async function ini() {
            await actions.obtenerInfoUsuario();
            await diferenciaDias();
        }
        ini();

        const cambiarAltura = () => {
            setAltura(window.innerWidth < 768 ? '' : '100vh');
          };
      
          window.addEventListener('resize', cambiarAltura);
      
          return () => {
            window.removeEventListener('resize', cambiarAltura);
          };

    }, []);

    async function diferenciaDias() {
        let eventosAsistidos = store.user.eventos_asistido || [];
        let eventosFuturos = eventosAsistidos.filter(evento => {
            let fechaEvento = new Date(evento.fecha);
            let fechaActual = new Date();
            return fechaEvento >= fechaActual;
        });

        // Ordenar los eventos por fecha ascendente
        eventosFuturos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        // Obtener la fecha del próximo evento
        let fechaProximoEvento = eventosFuturos.length > 0 ? eventosFuturos[0].fecha : null;

        // Calcular la diferencia de días solo si hay un próximo evento
        if (fechaProximoEvento) {
            let fechaActual = new Date();
            let fechaEvento = new Date(fechaProximoEvento);
            let diferencia = Math.round((fechaEvento - fechaActual) / (1000 * 60 * 60 * 24));
            setDiasDiferencia(diferencia);
        } else {
            // Si no hay próximos eventos, establecer la diferencia de días en 0
            setDiasDiferencia(0);
        }

    }

    const handleInputChange = e => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };


    const handleUpdateUser = async () => {
        // Lógica para actualizar los datos del usuario
        await actions.actualizarUsuario(store.user.id, userData);
        setEditable(false);
    };

    return (
        <div className="d-flex flex-column align-items-center"  style={{ height: altura }}>
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-4 d-flex justify-content-center">
                    <img className="img-fluid" src="https://img.freepik.com/fotos-premium/feliz-dibujo-dibujos-animclass=abindex`ados-boceto-imagen-fondo-blanco-arte-generado-ai_848903-6756.jpg" alt="Profile" />
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-center">
                    <div className="col-12 d-flex flex-column justify-content-center align-items-start">
                        <ul className="list-group">
                            {editable ? (
                                <div className="ms-3 border-0 col-12 d-flex flex-column justify-content-center align-items-start">
                                    <input className="border-0 mb-2" type="text" name="name" value={userData.name} onChange={handleInputChange} />
                                    <input className="border-0" type="email" name="email" value={userData.email} onChange={handleInputChange} />
                                </div>
                            ) : (
                                <div className="ms-3 col-12 d-flex flex-column justify-content-center align-items-start">
                                    <h2>{store.user.name}</h2>
                                    <h4>{store.user.email}</h4>
                                </div>
                            )}
                        </ul>
                        <button className="ms-3 btn btn-400 text-white m-2" onClick={() => {
                            if (editable) {
                                handleUpdateUser();
                            } else {
                                setEditable(true);
                                setUserData({
                                    name: store.user.name,
                                    email: store.user.email,
                                    // password: store.user.password
                                });
                            }
                        }}>
                            {editable ? "Save" : "Edit"}
                        </button>
                    </div>
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-center mt-5">
                    <div className="bg-300 rounded-circle d-flex justify-content-center align-items-center p-5">
                        <h3 className="text-white"> {diasDiferencia >= 0 ? `Next events in ${diasDiferencia} days` : "You don't have any upcoming events"}</h3>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column col-md-8 flex-md-row justify-content-between align-items-center my-5">
                <div className="col-12 col-md-6 text-center">
                    <h4>CREATED {store.user.num_eventos_creados} EVENTS</h4>
                </div>
                <div className="col-12 col-md-6 text-center">
                    <h4>ATTENDED {store.user.num_eventos_asistido} EVENTS</h4>
                </div>
            </div>

            <ul className="d-flex align-items-stretch nav nav-tabs mb-3" id="myTab" role="tablist">
                <li className="nav-item col-6" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Next events to attend</button>
                </li>
                <li className="d-flex align-items-stretch nav-item col-6" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Your created events</button>
                </li>
            </ul>
            <div className="tab-content mt-2" id="myTabContent">
                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                    <   ul className="list-group d-flex flex-column mb-5 w-100" id="contact-list">
                        {store.user?.eventos_asistido ? (store.user?.eventos_asistido?.map((item, id) => (
                            <li className="list-group col-xl-3 col-lg-4 col-md-6 col-12 mb-2 pe-2 w-100 text-center" key={item.id}>
                                < SimpleCard id={item.id} evento={item.evento} descripcion={item.descripcion} ciudad={item.ciudad} fecha={item.fecha} />
                            </li>
                        ))
                        ) : (
                            "No events created"
                        )}
                    </ul>
                </div>
                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                    <ul className="list-group d-flex flex-column mb-5 w-100" id="contact-list">
                        {store.user?.eventos_creados ? (store.user?.eventos_creados?.map((item, id) => (
                            <li className="list-group col-xl-3 col-lg-4 col-md-6 col-12 mb-2 pe-2 w-100" key={item.id}>
                                < SimpleCard id={item.id} evento={item.evento} descripcion={item.descripcion} ciudad={item.ciudad} fecha={item.fecha} />
                            </li>
                        ))
                        ) : (
                            "No events created"
                        )}
                    </ul>
                </div>
            </div>
        </div >


    );
};