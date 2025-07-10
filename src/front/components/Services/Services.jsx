import { Card } from "./Card"
import { servicesContent } from "../../utils/servicesContent"
import serviceBg from "../../assets/img/servicesBackground.png"

export const Services = () => {
    const groupedServices = servicesContent.reduce((acc, service) => {
        if (!acc[service.id]) {
            acc[service.id] = [];
        }
        acc[service.id].push(service);
        return acc;
    }, {})

    const sections = [
        { id: 'web', title: 'Desarrollo Web', subtitle: 'Construyendo tu universo digital' },
        { id: 'communication', title: 'Comunicación', subtitle: 'Reunimos tus audiencias' },
        { id: 'software', title: 'Soluciones de software', subtitle: 'Potenciamos tus capacidades' }
    ]

    return (
        <section className="d-flex justify-content-center mx-3 position-relative">
            <img src={serviceBg} alt="CloudTech services background image" className="mx-auto ct-services-bg position-absolute w-100 h-100 object-fit-cover d-none d-sm-block" />

            <div className="container py-5">
                <div className="d-flex flex-column text-center justify-content-center">
                    <h2 className="section-title">Conoce nuestros servicios</h2>
                    <p className="text-white ct-description-p">Cada uno de nuestros servicios está diseñado para construir y amplificar tu presencia digital, convirtiendo tus ideas en productos y resultados medibles. Explora cómo podemos dar forma a tu universo online. </p>
                </div>

                {sections.map(section => (
                    <div className="row my-3" key={section.id}>
                        <h3 className="section-title mb-0">{section.title}</h3>
                        <h5 className="text-white mb-4 fw-normal fst-italic">{section.subtitle}</h5>
                        {groupedServices[section.id] && groupedServices[section.id].map(service => (
                            <div key={service.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                                <Card
                                    title={service.title}
                                    icon={service.icon}
                                    description={service.description}
                                    link={service.link}
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