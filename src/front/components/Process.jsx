import { useState } from "react"

export const Process = () => {
    const [activeSection, setActiveSection] = useState('capacidades');

    const activeColor = "#fbff06"
    const inactiveColor = "#A8AB02"

    return (
        <section>
            <div className="container py-5">
                <div className="row">
                    <div className="col pe-sm-4 pe-md-5">
                        <div className="d-flex justify-content-end">
                            <button
                                className="process-section-title mb-4"
                                onClick={() => setActiveSection('capacidades')}
                                style={{ color: activeSection === 'capacidades' ? activeColor : inactiveColor }}
                            >Capacidades</button>
                        </div>
                    </div>

                    <div className="col ps-sm-4 ps-md-3">
                        <div className="d-flex justify-content-start">
                            <button
                                className="process-section-title mb-4"
                                onClick={() => setActiveSection('proceso')}
                                style={{ color: activeSection === 'proceso' ? activeColor : inactiveColor }}
                            >
                                Proceso
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        {activeSection === 'capacidades' ? (
                            <>
                                <div className="col-12 col-sm-6 pe-md-3">
                                    <div className="d-flex justify-content-center justify-content-sm-end mb-4">
                                        <div className="d-flex flex-column align-items-center gap-3">
                                            <buton className="ct-btn-outline-accent px-5 py-2">Capacidad 1</buton>
                                            <buton className="ct-btn-outline-accent px-4 py-2">Capacidad 2</buton>
                                            <buton className="ct-btn-outline-accent px-5 py-2">Capacidad 3</buton>
                                            <buton className="ct-btn-outline-accent px-4 py-2">Capacidad 4</buton>
                                            <buton className="ct-btn-outline-accent px-5 py-2">Capacidad 5</buton>
                                        </div>
                                    </div>
                                </div>

                                <div className="col ps-sm-5 text-center text-sm-start">
                                    <p className="text-white">Lorem ipsum dolor sit amet consectetur. Turpis nulla est hendrerit facilisis mollis faucibus accumsan tempus id. In et a faucibus aenean nunc. Risus lorem fermentum eu dui. Maecenas egestas sit elementum enim nisi consectetur metus non. Pellentesque quam at urna sed ipsum. Dignissim placerat molestie donec vitae. Blandit dolor elementum vitae integer convallis lectus tortor in ipsum.
                                        Magna placerat volutpat odio egestas. Vestibulum sit cursus id interdum. Nunc vel quis purus pellentesque viverra fermentum aliquam. </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-12 col-sm-6 pe-sm-5">
                                    <div className="d-flex justify-content-center justify-content-sm-end mb-4">
                                        <div className="d-flex flex-column align-items-center gap-3">
                                            <buton className="ct-btn-outline-accent px-5 py-2">Paso 1</buton>
                                            <buton className="ct-btn-outline-accent px-4 py-2">Paso 2</buton>
                                            <buton className="ct-btn-outline-accent px-5 py-2">Paso 3</buton>
                                            <buton className="ct-btn-outline-accent px-4 py-2">Paso 4</buton>
                                            <buton className="ct-btn-outline-accent px-5 py-2">Paso 5</buton>
                                        </div>
                                    </div>
                                </div>

                                <div className="col ps-sm-5 text-center text-sm-start">
                                    <p className="text-white">Otro contenido necesario para explicar la secci'on de proceso </p>
                                </div>
                            </>
                        )

                        }

                    </div>
                </div>
            </div>
        </section>
    )
}