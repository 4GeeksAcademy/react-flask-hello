import { Card } from "./Card"
import { servicesContent } from "../../utils/servicesContent"
import serviceBg from "../../assets/img/servicesBackground.png"
import { useTranslation } from "react-i18next"

export const Services = () => {
    const { t } = useTranslation();

    const groupedServices = servicesContent.reduce((acc, service) => {
        if (!acc[service.id]) {
            acc[service.id] = [];
        }
        acc[service.id].push(service);
        return acc;
    }, {})

    const sections = [
        {
            id: 'web',
            title: t('services.webDevelopmentTitle'),
            subtitle: t('services.webDevelopmentSubtitle')
        },
        {
            id: 'communication',
            title: t('services.communicationTitle'),
            subtitle: t('services.communicationSubtitle')
        },
        {
            id: 'software',
            title: t('services.softwareSolutionsTitle'),
            subtitle: t('services.softwareSolutionsSubtitle')
        }
    ]

    return (
        <section className="d-flex justify-content-center position-relative">
            <img src={serviceBg} alt="CloudTech services background image" className="z-n1 mx-auto ct-services-bg position-absolute w-100 h-100 object-fit-cover d-none d-sm-block" />

            <div className="container py-5 my-4 z-0">
                <div className="d-flex flex-column text-center justify-content-center">
                    <h2 className="section-title">{t('services.sectionTitle')}</h2>
                    <p className="text-white ct-description-p">{t('services.sectionDescription')}</p>
                </div>

                {sections.map(section => (
                    <div className="row my-3" key={section.id}>
                        <h3 className="section-title mb-0">{section.title}</h3>
                        <h5 className="text-white mb-4 fw-normal fst-italic">{section.subtitle}</h5>
                        {groupedServices[section.id] && groupedServices[section.id].map(service => (
                            <div key={service.title} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                                <Card
                                    title={t(service.title)}
                                    icon={service.icon}
                                    description={t(service.description)}
                                    link={t(service.link)}
                                />
                            </div>
                        ))
                        }
                    </div>
                ))}
            </div>
        </section>
    )
}