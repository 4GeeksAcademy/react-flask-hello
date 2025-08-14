import { Card } from "./Card";
import { valuesContent } from "../../utils/valuesContent";
import { useTranslation } from "react-i18next";

export const Values = () => {
    const { t } = useTranslation();

    return (
        <section className="d-flex justify-content-center mx-3 position-relative">
            <div className="container py-5">
                <div className="d-flex flex-column text-center align-items-center mb-5">
                    <h2 className="section-title">{t('values.sectionTitle')}</h2>
                    <p className="text-white ct-description-p">{t('values.sectionDescription')}</p>
                </div>

                <div className="row g-5">
                    {valuesContent.map(value => (
                        <div key={value.id} className="col-12 col-md-6 col-lg-4">
                            <Card
                                title={t(value.title)}
                                description={t(value.description)}
                                showDivider={value.id <= 6}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}