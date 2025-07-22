import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const WorkWithUS = () => {
    const { t } = useTranslation();

    return (

        <section className="text-white text-center py-5">
            <div className="container">
                <div className="d-flex flex-column text-center justify-content-center">
                    <h2 className="section-title mb-4">{t('workWithUs.sectionTitle')}</h2>
                    <p className="text-white ct-description-p">
                        {t('workWithUs.sectionDescription')}
                    </p>

                    <div className="mt-5 align-items-center justify-content-center">
                        <Link className="btn btn-outline-yellow btn-lg rounded-pill px-5 w-50 d-none d-lg-block mx-auto " to="/contact">{t('workWithUs.workWithUsCTA')}</Link>
                    </div>

                    <div className="row mt-5 pt-3">
                        <div className="col-12 col-lg-4 mb-4 mb-lg-0">
                            <p className="display-5 fw-bold mb-1">
                                <span className="text-stat-number">99</span>
                                <span className="text-stat-symbol">%</span>
                            </p>
                            <p className="title-sub text-white fw-semibold">{t('workWithUs.statistics.customerSatisfaction')}</p>
                        </div>

                        <div className="col-12 col-lg-4 mb-4 mb-lg-0">
                            <p className="display-5 fw-bold mb-1">
                                <span className="text-stat-number">18</span>
                                <span className="text-stat-symbol">K</span>
                            </p>
                            <p className="title-sub text-white fw-semibold">{t('workWithUs.statistics.activeUsers')}</p>
                        </div>

                        <div className="col-12 col-lg-4 mb-4 mb-lg-0">
                            <p className="display-5 fw-bold mb-1">
                                <span className="text-stat-number">+</span>
                                <span className="text-stat-symbol">10</span>
                            </p>
                            <p className="text-white fw-semibold">{t('workWithUs.statistics.completedProjects')}</p>
                        </div>

                        <div className="col-12">
                            <p className="display-5 fw-bold mb-1">
                                <span className="text-stat-number">+</span>
                                <span className="text-stat-symbol">5</span>
                            </p>
                            <p className="text-white fw-semibold">{t('workWithUs.statistics.yearsOfExperience')}</p>
                        </div>
                    </div>

                    <div className="container mt-4">
                        <Link className="btn btn-outline-yellow btn-lg rounded-pill px-4 mx-auto d-lg-none w-100 w-lg-auto" to="/contact">{t('workWithUs.workWithUsCTA')}</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};