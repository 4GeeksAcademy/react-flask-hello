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

    const cards2 = [
        {
            title: 'Dj Paco',
            text: 'Entrada desde: € 50',
            link: '#',
            image: 'https://images.pexels.com/photos/668278/pexels-photo-668278.jpeg',
        },
        {
            title: 'Conciertos',
            text: 'Entrada desde: 70€',
            link: '#',
            image: 'https://images.pexels.com/photos/849/people-festival-party-dancing.jpg',
        },
        {
            title: 'Rock',
            text: 'Entrada desde: 70€',
            link: '#',
            image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
        },
        {
            title: 'Reggaeton Fest',
            text: 'Entrada desde: 70€',
            link: '#',
            image: 'https://images.pexels.com/photos/1179581/pexels-photo-1179581.jpeg',
        },
    ];


    return (
        <div className="home-page-container">
            <div className="imagen-background">
                <img src={imagenBack} alt="imagen fondo" />
            </div>
            <div className="container py-5 p-1">
                <h2 className="titulos display-4 text-center fw-bold">Top trending</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 mt-1">
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
                    <h2 className="titulos display-4 text-center fw-bold mb-4">Experiencia</h2>
                    <div className="carousel-inner carouselB">
                        <div className="carousel-item active">
                            <img src="https://images.pexels.com/photos/2513607/pexels-photo-2513607.jpeg" className="d-block w-100" alt="Imagen 1" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/285598/pexels-photo-285598.jpeg" className="d-block w-100" alt="Imagen 2" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.pexels.com/photos/2231755/pexels-photo-2231755.jpeg" className="d-block w-100" alt="Imagen 3" />
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

                <div className="container">
                    <h2 className="titulos display-4 text-center fw-bold">Proximos Eventos 2026</h2>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-1">
                        {cards2.map((card, index) => (
                            <div className="col" key={index}>
                                <a
                                    href={card.link}
                                    className="text-decoration-none text-white"
                                >
                                    <div className="card text-white card-overlay h-100 border-0 position-relative overflow-hidden">
                                        <div
                                            className="bg-img position-absolute w-100 h-100"
                                            style={{
                                                backgroundImage: `url(${card.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        ></div>
                                        <div className="card-gradient position-absolute w-100 h-100"></div>
                                        <div className="card-body d-flex flex-column justify-content-end position-relative">
                                            <h5 className="card-title">{card.title}</h5>
                                            <p className="card-text">{card.text}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

    );

};