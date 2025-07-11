import { useTranslation } from "react-i18next"

export const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <section>
            <div className="container py-5">
                <div className="row mx-3">
                    <div className="col d-flex flex-column text-center justify-content-center">
                        <h2 className="section-title">{t('about.sectionTitle')}</h2>
                        <p className="text-white ct-description-p">{t('about.sectionDescription')}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}