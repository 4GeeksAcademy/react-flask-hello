import imagenBack from "../assets/fondo-cantante.jpg"
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
            <div className="container py-4">
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
            </div>
        </div>

    );

};