import imagenBack from "../assets/fondo-Rock.jpg"
import React from 'react';

export const Home = () => {

    const cards = [
        {
            title: 'Card 1',
            text: 'Imagen de fondo #1',
            image: 'https://images.pexels.com/photos/1694908/pexels-photo-1694908.jpeg',
            link: '#',
        },
        {
            title: 'Card 2',
            text: 'Imagen de fondo #2',
            image: 'https://images.pexels.com/photos/1649691/pexels-photo-1649691.jpeg',
            link: '#',
        },
        {
            title: 'Card 3',
            text: 'Imagen de fondo #3',
            image: 'https://images.pexels.com/photos/743715/pexels-photo-743715.jpeg',
            link: '#',
        },
        {
            title: 'Card 4',
            text: 'Imagen de fondo #4',
            image: 'https://images.pexels.com/photos/2240763/pexels-photo-2240763.jpeg',
            link: '#',
        },
        {
            title: 'Card 5',
            text: 'Imagen de fondo #5',
            image: 'https://images.pexels.com/photos/3682820/pexels-photo-3682820.jpeg',
            link: '#',
        },

    ];


    return (
        <div className="home-page-container">
            <div className="imagen-background">
                <img src={imagenBack} alt="imagen fondo" />
            </div>
            <div className="container py-5 p-1">
                <h2 className="titulos display-4 text-center fw-bold">TITULO 1</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                    {cards.map((card, index) => (
                        <div className="col" key={index}>
                            <a href={card.link} className="text-decoration-none">
                                <div
                                    className="card h-100 card-link card-bg"
                                    style={{ backgroundImage: `url(${card.image})` }}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.text}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div> 
                <div id="carouselExampleFade" className="carousel slide carousel-fade py-4" data-bs-ride="carousel">
                    <h2 className="titulos display-4 text-center fw-bold">TITULO 2</h2>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://images.pexels.com/photos/7502588/pexels-photo-7502588.jpeg" className="d-block w-100" alt="Imagen 1" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/167638/pexels-photo-167638.jpeg" className="d-block w-100" alt="Imagen 2" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg" className="d-block w-100" alt="Imagen 3" />
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Anterior</span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Siguiente</span>
                    </button>
                    <p className="titulos text-center py-2">MIRA LAS EXPERIENCIAS VIVIDAS EN NUESTROS EVENTOS</p>
                </div>

                {/* ESCRIBES MAS CODIGO DE AQUI PARA ABAJO */}

            </div>
        </div>

    );

};