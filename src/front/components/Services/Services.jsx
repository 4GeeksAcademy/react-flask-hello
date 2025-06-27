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
                    <p className="text-white ct-description-p">Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan. </p>
                </div>

                <div className="row my-3">
                    <h3 className="section-title mb-4">Desarrollo Web</h3>
                    {servicesContent.filter(service => service.id < 5).map(service => (
                        <div key={service.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                            <Card
                                title={service.title}
                                description={service.description}
                            />
                        </div>
                    ))
                    }
                </div>
                <div className="row">
                    <h3 className="section-title mb-4">Comunicación</h3>
                    {servicesContent.filter(service => service.id > 4).map(service => (
                        <div key={service.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                            <Card
                                title={service.title}
                                description={service.description}
                            />
                        </div>
                    ))
                    }
                </div>
            </div>
        </section>
    )
}