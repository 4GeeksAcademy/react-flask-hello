import { Card } from "./Card"
import { servicesContent } from "../../utils/servicesContent"
import serviceBg from "../../assets/img/servicesBackground.png"

export const Services = () => {
    return (
        <section className="container mx-5 py-5 position-relative">
            <img src={serviceBg} alt="" className="ct-services-bg position-absolute top-0 start-0 w-100 h-100 object-fit-cover" />
            <div className="">
                <div className="d-flex flex-column text-center justify-content-center">
                    <h2 className="section-title ">Conoce nuestros servicios</h2>
                    <p className="text-white mb-5 w-50 mx-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit semper dalar elementum tempus hac tellus libero accumsan. </p>
                </div>

                <div className="row">
                    <h3 className="section-title mb-4">Desarrollo Web</h3>
                    {servicesContent.map(service => (
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