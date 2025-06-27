import { Card } from "./Card";
import { testimonialsContent } from "../../utils/testimonialsContent";

export const Testimonials = () => {
    return (
        <section className="py-5">
            <div className="container">
                <div className="d-flex flex-column text-center justify-content-center">
                    <h2 className="section-title">Nuestros clientes</h2>
                </div>
                <div className="row">
                    <div className="col">
                        <div id="testimonialsCarousel" className="carousel slide">
                            <div className="carousel-inner">
                                {testimonialsContent.map((card, index) =>
                                    <div key={card.id}
                                        className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <Card
                                            name={card.name}
                                            position={card.position}
                                            review={card.review}
                                            profilePicture={card.profilePicture}
                                            logo={card.logo}
                                        />
                                    </div>
                                )}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}