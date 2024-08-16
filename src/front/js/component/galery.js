import React, { useRef, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CustomArrows from './CustomArrows';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/modal.css";

const Galery = () => {
  const sliderRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <CustomArrows
                 className="slick-next"
                 onClick={() => sliderRef.current.slickNext()}
                 onMouseEnter={() => handleMouseEnter('next')}
                 onMouseLeave={handleMouseLeave}
               />,
    prevArrow: <CustomArrows
                 className="slick-prev"
                 onClick={() => sliderRef.current.slickPrev()}
                 onMouseEnter={() => handleMouseEnter('prev')}
                 onMouseLeave={handleMouseLeave}
               />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  let autoPlayId = null;

  const handleMouseEnter = (direction) => {
    autoPlayId = setInterval(() => {
      if (direction === 'next') {
        sliderRef.current.slickNext();
      } else {
        sliderRef.current.slickPrev();
      }
    }, 2000);
  };

  const handleMouseLeave = () => {
    clearInterval(autoPlayId);
  };

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  const buttonStyle = {
    position: 'absolute',
    right: '20px',
    top: 'calc(100% - 60px)',
    transform: 'translateY(-50%)',
    backgroundColor: '#1D1E2C',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isHovered ? '0 5px 15px rgba(0,0,0,0.3)' : 'none',
    transform: isHovered ? 'translateY(-55%) scale(1.05)' : 'translateY(-50%)',
  };

  return (
    <div className="galery-container" style={{ padding: '20px' }}>
      <div className="miniJumbotronGalery text-center py-5 bg-light" style={{ position: 'relative' }}>
        <h1 className="display-4 fw-bold">Galería de Eventos</h1>
        <p className="lead">Sumérgete en un mundo encantado con nuestras fotos de eventos. Cada imagen revela la magia y el misterio de nuestros festivales. ¡Descubre momentos inolvidables y déjate llevar por el hechizo!</p>
        <button
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => window.location.href = '/galeria'}
        >
          Ver Galería
        </button>
      </div>
      <Slider
        ref={sliderRef}
        {...settings}
        beforeChange={() => clearInterval(autoPlayId)}
      >
        <div onClick={() => handleImageClick("https://cdn.midjourney.com/17df57f2-1d7c-4cce-9411-afc19c623240/0_1.png")}>
          <img src="https://cdn.midjourney.com/17df57f2-1d7c-4cce-9411-afc19c623240/0_1.png" alt="Evento 1" style={{ width: '100%', cursor: 'pointer' }} />
        </div>
        <div onClick={() => handleImageClick("https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_0.png")}>
          <img src="https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_0.png" alt="Evento 2" style={{ width: '100%', cursor: 'pointer' }} />
        </div>
        <div onClick={() => handleImageClick("https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_1.png")}>
          <img src="https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_1.png" alt="Evento 3" style={{ width: '100%', cursor: 'pointer' }} />
        </div>
        <div onClick={() => handleImageClick("https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_2.png")}>
          <img src="https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_2.png" alt="Evento 4" style={{ width: '100%', cursor: 'pointer' }} />
        </div>
        <div onClick={() => handleImageClick("https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_3.png")}>
          <img src="https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_3.png" alt="Evento 5" style={{ width: '100%', cursor: 'pointer' }} />
        </div>
        <div onClick={() => handleImageClick("https://cdn.midjourney.com/4e387683-658d-4197-a344-5d7dbbcf84dd/0_0.png")}>
          <img src="https://cdn.midjourney.com/4e387683-658d-4197-a344-5d7dbbcf84dd/0_0.png" alt="Evento 6" style={{ width: '100%', cursor: 'pointer' }} />
        </div>
      </Slider>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        centered
        className="custom-modal"
      >
        <Modal.Body className='modalPrincipal'>
          <img src={modalImage} alt="Evento" className='modalImg' />
        </Modal.Body>
        <Modal.Header closeButton />
      </Modal>
    </div>
  );
};

export default Galery;