import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Jumbotron from "../component/jumbotron.js";
import { Context } from "../store/appContext.js";
import { Card } from "../component/card.js";
import { Carousel } from 'react-bootstrap';
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        actions.obtenerEventos();
    }, []);

    const handleClickAll = async () => {
        await actions.obtenerEventosCategoria("ALL");
        navigate('/events/ALL');
    }

    const handleClickDeporte = async () => {
        await actions.obtenerEventosCategoria("DEPORTE");
        navigate('/events/DEPORTE');
    }

    const handleClickArte = async () => {
        await actions.obtenerEventosCategoria("ARTE");
        navigate('/events/ARTE');
    }

    const handleClickOcio = async () => {
        await actions.obtenerEventosCategoria("OCIO");
        navigate('/events/OCIO');
    }

    const handlePrev = () => {
        setIndex(prevIndex => (prevIndex === 0 ? store.events.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setIndex(prevIndex => (prevIndex === store.events.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="container">
            <Jumbotron />
            <div className="4-botones d-flex justify-content-center row m-1 mt-5">
                <button type="button" onClick={handleClickAll} className="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">EVENTS</button>
                <button type="button" onClick={handleClickDeporte} className="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">Sports</button>
                <button type="button" onClick={handleClickArte} className="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">Art</button>
                <button type="button" onClick={handleClickOcio} className="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">Leisure</button>
            </div>

            <div className="row py-5">
                <p className="fs-2 col-sm-12 col-md-6 col-lg-5"><strong>Don't forget to see the events!</strong></p>
            </div>

            <div className="row m-1">
                <div className="carousel-container">
                    <div className={store.events.length>4 ? "d-flex justify-content-between": "d-none"}>
                        <button className="btn btn-lg m-1 bg-300 text-black carousel-button carousel-button-prev" onClick={handlePrev}>
                            <span className="carousel-button-icon">&#10094;</span>
                        </button>
                        <button className="btn btn-lg m-1 bg-300 text-black carousel-button carousel-button-next me-2" onClick={handleNext}>
                            <span className="carousel-button-icon">&#10095;</span>
                        </button>
                    </div>
                    <Carousel
                        activeIndex={index}
                        onSelect={setIndex}
                        interval={null} // Desactivar la reproducción automática
                        controls={false} // Desactivar los controles automáticos
                        wrap={true} // Desactivar el desplazamiento circular
                        className="carousel-fade bg-"
                    >
                        {[...Array(store.events.length)].map((_, idx) => (
                            <Carousel.Item key={idx}>
                                <div className="d-flex">
                                    {[...store.events].map((item, i) => {
                                        const cardIndex = (i + idx) % store.events.length;
                                        return (
                                            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-12 mb-2 pe-2">
                                                <Card
                                                    img={store.events[cardIndex].url_img}
                                                    evento={store.events[cardIndex].evento}
                                                    descripcion={store.events[cardIndex].descripcion}
                                                    ciudad={store.events[cardIndex].ciudad}
                                                    fecha={store.events[cardIndex].fecha}
                                                    id={store.events[cardIndex].id}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>

            <p className="fs-2 col-sm-12 col-md-6 col-lg-12 d-flex justify-content-center py-5"><strong>If you don't have the time to travel, we bring the plans for you!</strong></p>
        </div>
    );
};