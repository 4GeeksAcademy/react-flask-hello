import { Card } from "./Card";
import { benefitsContent } from "../../utils/benefitsContent";

export const Benefits = () => {
    return (
        <section className="d-flex justify-content-center mx-3 position-relative">
            <div className="container py-5">
                <div className="d-flex flex-column text-center align-items-center mb-5">
                    <h2 className="section-title">Beneficios del desarrollo web</h2>
                    <p className="text-white ct-description-p">Invertir en una presencia digital profesional es clave para el éxito de tu marca. Un sitio web bien desarrollado no es solo una vitrina, es una herramienta estratégica que impulsa tu crecimiento y conecta de manera efectiva con tu audiencia.</p>
                </div>

                <div className="row g-5">
                    {benefitsContent.map(benefit => (
                        <div key={benefit.id} className="col-12 col-md-6 col-lg-3">
                            <Card
                                title={benefit.title}
                                description={benefit.description}
                                showDivider={benefit.id <= 4}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};