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

    useEffect(() => {
        async function ini() {
            await actions.obtenerInfoUsuario();
            await diferenciaDias();
            console.log(diasDiferencia);
        }
        ini();
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
        <div className="container-fluid d-flex flex-column justify-content-between align-items-center vh-100">
            <div className="row justify-content-center align-items-center my-5">
                <div className="col-12 col-md-4 d-flex justify-content-center">
                    <img className="img-fluid" src="https://img.freepik.com/fotos-premium/feliz-dibujo-dibujos-animclass=abindex`ados-boceto-imagen-fondo-blanco-arte-generado-ai_848903-6756.jpg" alt="Profile" />
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-center">
                    <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center">
                        <ul className="col-8 list-group">
                            {editable ? (
                                <div className="border-0">
                                    <input className="border-0 mb-2" type="text" name="name" value={userData.name} onChange={handleInputChange} />
                                    <input className="border-0" type="email" name="email" value={userData.email} onChange={handleInputChange} />
                                    {/* <input type="text" name="password" value={userData.password} onChange={handleInputChange} /> */}
                                </div>
                            ) : (
                                <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center">
                                    <h2>{store.user.name}</h2>
                                    <h4>{store.user.email}</h4>
                                    {/* <h4>{store.user.password}</h4> */}
                                </div>
                            )}
                        </ul>
                        <button className="btn btn-400 text-white m-2" onClick={() => {
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
                            {editable ? "Guardar" : "Editar"}
                        </button>
                    </div>
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-center mt-5">
                    <div className="bg-300 rounded-circle d-flex justify-content-center align-items-center p-5"
                        style={{
                            height: window.innerWidth < 768 ? "15rem" : "22rem",
                            width: window.innerWidth < 768 ? "15rem" : "22rem"
                        }}>
                        <h3 className="text-white"> {diasDiferencia >= 0 ? `Próximo eventos en ${diasDiferencia} días` : "No tienes eventos próximos"}</h3>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center my-5">
                <div className="col-12 col-md-6 text-center">
                    <h3>HAS CREADO {store.user.num_eventos_creados} EVENTOS</h3>
                </div>
                <div className="col-12 col-md-6 text-center">
                    <h3>HAS ASISTIDO A {store.user.num_eventos_asistido ? store.user.num_eventos_asistido : "0"} EVENTOS</h3>
                </div>
            </div>

            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Próximos eventos a los que asistir</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Tus eventos creados</button>
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
                            "Sin eventos creados"
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
                            "Sin eventos creados"
                        )}
                    </ul>
                </div>
            </div>
        </div >


    );
};