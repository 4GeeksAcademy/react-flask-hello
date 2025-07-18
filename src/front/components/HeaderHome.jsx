import React from "react";
import { Link } from "react-router-dom";
import HomeOne from "../assets/img/HomeOne.jpg"
import { useTranslation } from "react-i18next";

export const HeaderHome = () => {
    const { t } = useTranslation();

    return (

        
        <section className="w-100 h-100 mb-5 mt-5 position-relative">
            <div className="position-absolute w-100 h-100 bg-dark bg-opacity-50 mx-auto mt-5"></div>
            <img src={HomeOne} alt="CloudTech background image" className="z-n1 mx-auto position-absolute mt-5 w-100 h-100 object-fit-cover d-sm-block"/>
            <div className="container w-100 h-100 z-1">
                <div className="row text-center z-1">
                    <div className="col my-5 pt-5 d-flex flex-column justify-content-center align-items-center z-1">
                        <h1 className="hero-title-home display-3 fw-bolder text-warning mt-sm-0 mt-5 mb-4">
                            {t('headers.headerHome.headLine')}
                        </h1>

                        <p className="hero-subtitle-home fs-5 text-white w-75 mb-5">
                            {t('headers.headerHome.headerDescription')}
                        </p>

                        <div className="d-flex flex-column justify-content-center flex-md-row gap-3 w-100">
                            <Link to="/projects" className="btn btn-outline-light btn-lg rounded-pill px-5">
                                {t('headers.headerHome.portfolioButton')}
                            </Link>
                            <Link to="/contact" className="btn btn-outline-yellow btn-lg rounded-pill px-5">
                                {t('headers.headerHome.contactButton')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}