import { Link } from "react-router-dom";
import HomeAbout from "../assets/img/HomeAbout.jpg"
import { useTranslation } from "react-i18next";

export const HeaderAbout = () => {
    const { t } = useTranslation();

    return (

        <section className="w-100 h-100 mb-5 mt-5 position-relative">
            <img src={HomeAbout} alt="CloudTech background image" className="z-n1 mx-auto position-absolute mt-5 w-100 h-100 object-fit-cover d-sm-block" />
            <div className="position-absolute w-100 h-100 bg-dark bg-opacity-50 mx-auto mt-5"></div>
            <div className="container w-100 h-100">
                <div className="row z-0">
                    <div className="col-12 col-lg-6 offset-lg-6 my-5 pt-5 d-flex flex-column justify-content-center align-items-center z-1 text-lg-end">
                        <h1 className="hero-title-home display-3 fw-bolder text-warning mt-sm-0 mt-5 mb-4">
                            {t('about.sectionTitle')}
                        </h1>

                        <p className="hero-subtitle-home fs-5 text-white w-75 mb-5">
                            {t('about.sectionDescription')}
                        </p>

                        <div className="d-flex flex-column justify-content-center flex-md-row gap-3 w-100">
                            <Link to="/proyectos" className="btn btn-outline-light btn-lg rounded-pill px-5">{t('headerAbout.portfolioButton')}</Link>
                            <Link to="/contacto" className="btn btn-outline-yellow btn-lg rounded-pill px-5">{t('headerAbout.contactButton')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}