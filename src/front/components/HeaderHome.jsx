import React from "react";
import { Link } from "react-router-dom";
import HomeOne from "../assets/img/HomeOne.jpg"
import { useTranslation } from "react-i18next";

export const HeaderHome = () => {
    const { t } = useTranslation();

    return (

        <>
        {/* Header para escritorio */}
            <div className="d-none d-lg-block">
                <section className="w-100 h-100 d-flex position-relative">
                    <div className="position-absolute w-100 h-100 bg-dark bg-opacity-50 mx-auto"></div>
                    <img src={HomeOne} alt="CloudTech background image" className="z-n1 mx-auto position-absolute w-100 h-100 object-fit-cover d-sm-block"/>
                    <div className="container w-100 h-100 z-1">
                        <div className="row text-center z-1 my-5">
                            <div className="col pt-5 pt-lg-0 my-5 d-flex flex-column justify-content-center align-items-center z-1">
                                <h1 className="hero-title-home display-3 fw-bolder w-75 mt-sm-0 mt-5 mb-4">
                                    {t('headers.headerHome.headLine')}
                                </h1>

                                <p className="hero-subtitle-home fs-5 text-white w-50 mb-5">
                                    {t('headers.headerHome.headerDescription')}
                                </p>

                                <div className="d-flex flex-column justify-content-center flex-md-row gap-3 w-100">
                                    <Link to="/projects" className="btn btn-outline-light btn-lg rounded-pill px-5">
                                        {t('headers.headerHome.portfolioButton')}
                                    </Link>
                                    <Link to="/contact" className="btn btn-outline btn-lg rounded-pill px-5">
                                        {t('headers.headerHome.contactButton')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Header para movil */}
            <div className="d-lg-none">
                <section className="w-100 h-100 d-flex position-relative">
                    <div className="position-absolute w-100 h-100 bg-dark bg-opacity-50 mx-auto"></div>
                    <img src={HomeOne} alt="CloudTech background image" className="z-n1 mx-auto position-absolute w-100 h-100 object-fit-cover d-sm-block"/>
                    <div className="container w-100 h-100 z-1 py-5">
                        <div className="row text-center z-1">
                            <div className="col  pt-5 pt-lg-0 my-5 d-flex flex-column justify-content-center align-items-center z-1">
                                <h1 className="hero-title-home display-3 fw-bolder w-100 mt-sm-0 mt-5 mb-4">
                                    {t('headers.headerHome.headLine')}
                                </h1>

                                <p className="hero-subtitle-home fs-5 text-white w-100 mb-5">
                                    {t('headers.headerHome.headerDescription')}
                                </p>

                                <div className="d-flex flex-column justify-content-center flex-md-row gap-3 w-100">
                                    <Link to="/projects" className="btn btn-outline-light btn-lg rounded-pill px-5">
                                        {t('headers.headerHome.portfolioButton')}
                                    </Link>
                                    <Link to="/contact" className="btn btn-outline btn-lg rounded-pill px-5">
                                        {t('headers.headerHome.contactButton')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )

}