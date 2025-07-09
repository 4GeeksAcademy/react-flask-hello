import { useState } from "react";
import { Link } from "react-router-dom";
import { projectsContent } from "../utils/projectsContent";

export const Projects = ({ limit = 0 }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const handleImageClick = (imageSrc) => {
        setShowModal(true);
        setSelectedImage(imageSrc);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImage("");
    }

    let imagesToDisplay = [];

    if (limit > 0) {
        const projectsToDisplay = projectsContent.slice(0, limit);
        imagesToDisplay = projectsToDisplay.map(project => project.images[0])
    } else {
        imagesToDisplay = projectsContent.flatMap(project => project.images)
    }


    const column1Projects = imagesToDisplay.slice(0, Math.ceil(imagesToDisplay.length / 2));
    const column2Projects = imagesToDisplay.slice(Math.ceil(imagesToDisplay.length / 2), imagesToDisplay.length);

    return (
        <section className="mx-3">
            <div className="container py-5">
                <div className="d-flex flex-column text-center justify-content-center mb-5">
                    <h2 className="section-title">Nuestros proyectos</h2>
                    <p className="text-white ct-description-p">Hemos creado universos digitales únicos que resuelven desafíos y conectan a las marcas con sus audiencias. Sabemos que cada proyecto es una historia que refleja innovación y resultados claros, y estamos dispuestos a plasmarlo en tu visión.</p>
                </div>
                <div className="row g-2 g-lg-3 h-100">
                    <div className="col col-lg-6">
                        <div className="d-flex flex-column h-100">
                            {column1Projects.map((image, index) => (
                                <img
                                    key={`col1-img-${image.src}-${index}`}
                                    src={image.src}
                                    className="mb-3 rounded-5 object-fit-cover flex-grow-1"
                                    alt={image.alt}
                                    onClick={() => handleImageClick(image.src)}
                                    style={{ cursor: "pointer" }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="col col-lg-6">
                        <div className="d-flex flex-column h-100">
                            {column2Projects.map((image, index) => (
                                <img
                                    key={`col2-img-${image.src}-${index}`}
                                    src={image.src}
                                    className="mb-3 rounded-5 object-fit-cover"
                                    alt={image.alt}
                                    onClick={() => handleImageClick(image.src)}
                                    style={{ cursor: "pointer" }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {limit > 0 ? (
                    <div className="row text-center mt-5">
                        <div className="col">
                            <Link to={"/projects"} className="ct-btn-outline-accent text-decoration-none py-2 px-5">Explora nuestro portafolio</Link>
                        </div>
                    </div>
                ) : (
                    <div className="row text-center mt-5">
                        <div className="col">
                            <Link to={"/contact"} className="ct-btn-outline-accent text-decoration-none py-2 px-5">Conectemos ahora</Link>
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="imageModalLabel"
                        aria-hidden="true"
                        onClick={handleCloseModal}
                    >
                        <div className="modal-dialog modal-dialog-centered modal-xl" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-content card card-background border-0 rounded-4">
                                <div className="modal-header border-0 pb-0">
                                    <button
                                        type="button"
                                        className="btn-close custom-modal-close-btn mb-1"
                                        aria-label="Close"
                                        onClick={handleCloseModal}
                                    ></button>
                                </div>
                                <div className="modal-body text-center pt-0">
                                    <img src={selectedImage} className="img-fluid rounded-4" alt="portafolio CloudTech detalle" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}