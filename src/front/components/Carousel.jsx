import { Link } from "react-router-dom";
import img1 from "../assets/img/img1.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img3.jpg";


export const Carousel = () => {
    return (
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '18px'
        }}>
            <div
                className="carousel-inner "
                style={{
                    borderRadius: '50px',
                    width: '96%',
                    height: '48vh',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="carousel-item active" data-bs-interval="10000">
                    <img src={img1} className="d-block w-100" alt="img1" />
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                    <img src={img2} className="d-block w-100" alt="img2" />
                </div>
                <div className="carousel-item">
                    <img src={img3} className="d-block w-100" alt="img3" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>

        </div>
    );
};
