import { Card } from "./Card"
import { servicesContent } from "../../utils/servicesContent"
import serviceBg from "../../assets/img/servicesBackground.png"

export const Services = () => {
    return (
        <section className="d-flex justify-content-center mx-3 position-relative">
            <img src={serviceBg} alt="CloudTech services background image" className="mx-auto ct-services-bg position-absolute w-100 h-100 object-fit-cover d-none d-sm-block" />

            <div className="container py-5">
                <div className="d-flex flex-column text-center justify-content-center">
                    <h2 className="section-title">Conoce nuestros servicios</h2>
                    <p className="text-white ct-description-p">Cada uno de nuestros servicios está diseñado para construir y amplificar tu presencia digital, convirtiendo tus ideas en productos y resultados medibles. Explora cómo podemos dar forma a tu universo online. </p>
                </div>

                <div className="row my-3">
                    <h3 className="section-title mb-0">Desarrollo Web</h3>
                    <h5 className="text-white mb-4 fw-normal fst-italic">Construyendo tu universo digital</h5>
                    {servicesContent.filter(service => service.id < 5).map(service => (
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
                <div className="row">
                    <h3 className="section-title mb-0">Comunicación</h3>
                    <h5 className="text-white mb-4 fw-normal fst-italic">Reunimos tus audiencias</h5>
                    {servicesContent.filter(service => service.id > 4).map(service => (
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
            </div>
        </section>
    )
}