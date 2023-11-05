import React, { useRef, useState, useEffect } from 'react';

const LittleSlide = () => {
    const carouselRef = useRef(null);
    const [videoEnded, setVideoEnded] = useState(false);

    const handleVideoEnd = () => {
        setVideoEnded(true);
    };

    const handleSlideChange = () => {
        if (videoEnded) {
            carouselRef.current.querySelector('.carousel-control-next').click();
            setVideoEnded(false);
        }
    };

    useEffect(() => {
        // Attach slide event listener
        const carousel = carouselRef.current;
        carousel.addEventListener('slide.bs.carousel', handleSlideChange);

        // Cleanup when component unmounts
        return () => {
            carousel.removeEventListener('slide.bs.carousel', handleSlideChange);
        };
    }, [videoEnded]);

    return (
        <div>
            <div
                ref={carouselRef}
                id="carouselExampleFade"
                className="litleslide carousel slide carousel-slide mt-4"
                data-bs-ride="carousel"
            >
                <div className={`carousel-inner`} data-bs-interval="5000">
                    <div className={`carousel-item ${videoEnded ? '' : 'active'} justify-content-center`}>
                        <video
                            className="d-block w-100"
                            autoPlay
                            muted
                            loop
                            onEnded={handleVideoEnd}
                        >
                            <source src="https://res.cloudinary.com/albertge/video/upload/v1692288928/welcome_to_cujlyi.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="carousel-caption d-md-block">
                            {/* ... */}
                        </div>
                    </div>
                    <div className={`carousel-item ${videoEnded ? 'active' : ''} justify-content-center`}>
                        <video
                            className="d-block w-100"
                            autoPlay
                            muted
                            loop
                            onEnded={handleVideoEnd}
                        >
                            <source src="https://res.cloudinary.com/albertge/video/upload/v1692291371/adquiere_nuestra_membresia_premium_1_kq1ell.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="carousel-caption d-md-block">
                            {/* ... */}
                        </div>
                    </div>
                    <div className={`carousel-item ${videoEnded ? 'active' : ''} justify-content-center`}>
                        <video
                            className="d-block w-100"
                            autoPlay
                            muted
                            loop
                            onEnded={handleVideoEnd}
                        >
                            <source src="https://res.cloudinary.com/albertge/video/upload/v1692387565/Dise%C3%B1o_sin_t%C3%ADtulo_2_gnrij6.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="carousel-caption d-md-block">
                            {/* ... */}
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default LittleSlide;
