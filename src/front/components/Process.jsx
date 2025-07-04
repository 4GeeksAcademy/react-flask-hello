import { useState } from "react"
import { capacitiesData, processData } from "../utils/processContent";


export const Process = () => {
    const [activeSection, setActiveSection] = useState('capacidades');
    const [activeContent, setActiveContent] = useState('capacidad1');

    const activeColor = "#fbff06"
    const inactiveColor = "#A8AB02"

    const handleMainSection = (section) => {
        setActiveSection(section);
        if (section === 'capacidades') {
            setActiveContent('capacidad1');
        } else {
            setActiveContent('paso1');
        }
    };

    const getCurrentContent = () => {
        if (activeSection === 'capacidades') {
            return capacitiesData.find(capacity => capacity.id === activeContent)?.text || capacitiesData[0].text;
        } else {
            return processData.find(process => process.id === activeContent)?.text || processData[0].text;
        }
    };

    return (
        <section>
            <div className="container py-5">
                <div className="row">
                    <div className="col pe-sm-4 pe-md-5">
                        <div className="d-flex justify-content-end">
                            <button
                                className="process-section-title mb-4"
                                onClick={() => handleMainSection('capacidades')}
                                style={{ color: activeSection === 'capacidades' ? activeColor : inactiveColor }}
                            >Capacidades</button>
                        </div>
                    </div>

                    <div className="col ps-sm-4 ps-md-3">
                        <div className="d-flex justify-content-start">
                            <button
                                className="process-section-title mb-4"
                                onClick={() => handleMainSection('proceso')}
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
                                            {capacitiesData.map(capacity => (
                                                <button
                                                    key={capacity.id}
                                                    className={`ct-btn-outline-accent px-4 py-2 ${activeContent === capacity.id ? 'active-inner-button' : ''}`}
                                                    onClick={() => setActiveContent(capacity.id)}
                                                >
                                                    {capacity.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="col ps-sm-5 text-center text-sm-start">
                                    <p className="text-white">{getCurrentContent()}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-12 col-sm-6 pe-sm-5">
                                    <div className="d-flex justify-content-center justify-content-sm-end mb-4">
                                        <div className="d-flex flex-column align-items-center gap-3">
                                            {processData.map(process => (
                                                <button
                                                    key={process.id}
                                                    className={`ct-btn-outline-accent px-4 py-2 ${activeContent === process.id ? 'active-inner-button' : ''}`}
                                                    onClick={() => setActiveContent(process.id)}
                                                >
                                                    {process.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="col ps-sm-5 text-center text-sm-start">
                                    <p className="text-white">{getCurrentContent()}</p>
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