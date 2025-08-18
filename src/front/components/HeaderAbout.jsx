import { Link } from "react-router-dom";
import HomeAbout from "../assets/img/HomeAbout.jpg"
import { useTranslation } from "react-i18next";

export const HeaderAbout = () => {
    const { t } = useTranslation();

    return (

        <section className="w-100 h-100 mb-5 position-relative">
            <img src={HomeAbout} alt="CloudTech background image" className="z-n1 mx-auto position-absolute w-100 h-100 object-fit-cover d-sm-block" />
            <div className="position-absolute w-100 h-100 bg-dark bg-opacity-75 mx-auto"></div>
            <div className="container w-100 h-100 py-5">
                <div className="row z-0 ">
                    <div className="col-12 pt-5 pt-lg-0 col-lg-6 offset-lg-6 my-5 my-lg-2 py-5 py-lg-3 d-flex flex-column justify-content-lg-end justify-content-center align-items-lg-end align-items-center z-1 text-lg-end">
                        <h1 className="hero-title-home display-3 fw-bolder mt-sm-0 mt-4 mb-4 text-lg-end text-center">
                            {t('about.sectionTitle')}
                        </h1>

                        <p className="hero-subtitle-home fs-5 text-white text-center text-lg-end w-75 mb-5">
                            {t('about.sectionDescription')}
                        </p>

                        <div className="d-flex flex-column justify-content-lg-end justify-content-center flex-md-row gap-3 w-100">
                            <Link to="/projects" className="btn btn-outline-light btn-lg rounded-pill px-5">{t('headers.headerAbout.portfolioButton')}</Link>
                            <Link to="/contact" className="btn btn-outline btn-lg rounded-pill px-5">{t('headers.headerAbout.contactButton')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}