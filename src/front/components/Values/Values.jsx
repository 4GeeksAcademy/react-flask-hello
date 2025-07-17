import { Card } from "./Card";
import { valuesContent } from "../../utils/valuesContent";

export const Values = () => {
    return (
        <section className="d-flex justify-content-center mx-3 position-relative">
                    <div className="container py-5">
                        <div className="d-flex flex-column text-center align-items-center mb-5">
                            <h2 className="section-title">Valores</h2>
                            <p className="text-white ct-description-p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est hic illo laudantium deleniti aut, quaerat nulla?</p>
                        </div>
        
                        <div className="row g-5">
                            {valuesContent.map(value => (
                                <div key={value.id} className="col-12 col-md-6 col-lg-3">
                                    <Card
                                        title={value.title}
                                        description={value.description}
                                        showDivider={value.id <= 4}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
    )
}