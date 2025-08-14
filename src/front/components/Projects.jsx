import { useState } from "react";
import { Link } from "react-router-dom";
import { projectsContent } from "../utils/projectsContent";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const Projects = ({ limit = 0 }) => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const imagesToDisplay = limit > 0
        ? projectsContent.slice(0, limit).map(project => project.images[0])
        : projectsContent.flatMap(project => project.images);

    const handleImageClick = (index) => {
        setShowModal(true);
        setSelectedImageIndex(index);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImageIndex(null);
    }

    const handlePrev = (e) => {
        e.stopPropagation();
        setSelectedImageIndex(prevIndex => (prevIndex === 0 ? imagesToDisplay.length - 1 : prevIndex - 1));
    }

    const handleNext = (e) => {
        e.stopPropagation();
        setSelectedImageIndex(prevIndex => (prevIndex === imagesToDisplay.length - 1 ? 0 : prevIndex + 1));
    }

    const currentImage = selectedImageIndex !== null ? imagesToDisplay[selectedImageIndex] : null;

    const column1Projects = imagesToDisplay.slice(0, Math.ceil(imagesToDisplay.length / 2));
    const column2Projects = imagesToDisplay.slice(Math.ceil(imagesToDisplay.length / 2), imagesToDisplay.length);

    return (
        <section className="mx-3">
            <div className="container py-5">
                <div className="d-flex flex-column text-center justify-content-center mb-5">
                    <h2 className="section-title">{t('projects.sectionTitle')}</h2>
                    <p className="text-white ct-description-p">{t('projects.sectionDescription')}</p>
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
                                    onClick={() => handleImageClick(index)}
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
                                    onClick={() => handleImageClick(index)}
                                    style={{ cursor: "pointer" }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {limit > 0 ? (
                    <div className="row text-center mt-5">
                        <div className="col">
                            <Link to={"/projects"} className="ct-btn-outline-accent text-decoration-none py-2 px-5">
                                {t('projects.sectionPortfolioButton')}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="row text-center mt-5">
                        <div className="col">
                            <Link to={"/contact"} className="ct-btn-outline-accent text-decoration-none py-2 px-5">
                                {t('projects.sectionCTAButton')}
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {showModal && selectedImageIndex !== null && (
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
                                <div className="modal-body text-center pt-0 position-relative">
                                    <button onClick={handlePrev} className="btn text-white bg-dark opacity-75 position-absolute top-50 start-0 translate-middle-y ms-2 rounded-pill d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    </button>
                                    <img src={currentImage.src} className="img-fluid rounded-4" alt="portafolio CloudTech detalle" />
                                    <button onClick={handleNext} className="btn text-white bg-dark opacity-75 position-absolute top-50 end-0 translate-middle-y me-2 rounded-pill d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}