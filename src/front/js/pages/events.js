import React, { useState, useContext, useEffect } from "react";
import "../../styles/home.css";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Card } from "../component/card.js";
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

export const Events = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [index, setIndex] = useState(0);
	const { store, actions } = useContext(Context)
	const [titulo, setTitulo] = useState("")
	const [styleDrop, setStyleDrop] = useState({
		"btnAll": false,
		"sport": false,
		"art": false,
		"leisure": false
	})



	useEffect(() => {
		async function ini() {

			if (params.category == "ALL") {

				setTitulo("TODOS LOS EVENTOS")
				await actions.obtenerEventosCategoria(params.category)
				setStyleDrop({
					"btnAll": true
				})
			}
			else if (params.category == "DEPORTE") {
				setTitulo(`EVENTOS DE ${params.category}`)
				await actions.obtenerEventosCategoria(params.category)
				setStyleDrop({
					"sport": true
				})

			}
			else if (params.category == "ARTE") {
				setTitulo(`EVENTOS DE ${params.category}`)
				await actions.obtenerEventosCategoria(params.category)
				setStyleDrop({
					"art": true
				})

			}

			else {
				setTitulo(`EVENTOS DE ${params.category}`)
				await actions.obtenerEventosCategoria(params.category)
				setStyleDrop({
					"leisure": true
				})
			}
		}
		ini()
	}, [navigate])

	function handleClickAll() {
		navigate('/events/ALL');
		setStyleDrop({
			"btnAll": true,
		})
	}
	function handleClickDeporte() {
		navigate('/events/DEPORTE');
		setStyleDrop({
			"sport": true,
		})
	}
	function handleClickArte() {
		navigate('/events/ARTE');
		setStyleDrop({
			"art": true,
		})
	}
	function handleClickOcio() {
		navigate('/events/OCIO');
		setStyleDrop({
			"leisure": true,
		})
	}

	const handlePrev = () => {
        setIndex(prevIndex => (prevIndex === 0 ? store.events.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setIndex(prevIndex => (prevIndex === store.events.length - 1 ? 0 : prevIndex + 1));
    };


	return (
		<div className="container vh-100">

			<div className="4-botones py-5 d-flex justify-content-center row m-1">
				<button type="button" onClick={handleClickAll} className={styleDrop.btnAll ? "btn btn-lg m-1 bg-400 text-white col-xs-8 col-md-12 col-lg-2" : "btn btn-lg m-1 bg-300 text-white col-sm-8 col-md-12 col-lg-2"}>EVENTS</button>
				<button type="button" onClick={handleClickDeporte} className={styleDrop.sport ? "btn btn-lg m-1 bg-400 text-white col-xs-8 col-md-12 col-lg-2" : "btn btn-lg m-1 bg-300 text-white col-sm-8 col-md-12 col-lg-2"}>Sports</button>
				<button type="button" onClick={handleClickArte} className={styleDrop.art ? "btn btn-lg m-1 bg-400 text-white col-xs-8 col-md-12 col-lg-2" : "btn btn-lg m-1 bg-300 text-white col-sm-8 col-md-12 col-lg-2"}>Art</button>
				<button type="button" onClick={handleClickOcio} className={styleDrop.leisure ? "btn btn-lg m-1 bg-400 text-white col-xs-8 col-md-12 col-lg-2" : "btn btn-lg m-1 bg-300 text-white col-sm-8 col-md-12 col-lg-2"}>Leisure</button>
			</div>

			<h1>{titulo}</h1>
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
                        className="carousel-fade"
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

		</div>
	);
};
