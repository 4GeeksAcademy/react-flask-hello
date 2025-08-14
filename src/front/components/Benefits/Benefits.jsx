import { Card } from "./Card";
import { benefitsContent } from "../../utils/benefitsContent";
import { useTranslation } from "react-i18next";

export const Benefits = () => {
    const { t } = useTranslation();

    return (
        <section className="d-flex justify-content-center mx-3 position-relative">
            <div className="container py-5">
                <div className="d-flex flex-column text-center align-items-center mb-5">
                    <h2 className="section-title">{t('benefits.sectionTitle')}</h2>
                    <p className="text-white ct-description-p">{t('benefits.sectionDescription')}</p>
                </div>

                <div className="row g-5">
                    {benefitsContent.map(benefit => (
                        <div key={benefit.id} className="col-12 col-md-6 col-lg-3">
                            <Card
                                title={t(benefit.title)}
                                description={t(benefit.description)}
                                showDivider={benefit.id <= 6}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};