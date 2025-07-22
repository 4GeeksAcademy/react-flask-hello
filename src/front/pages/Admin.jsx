import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { Leads } from "../components/Admin/Leads"
import { AppContext } from "./Layout"

export const Admin = () => {
    const { setShowNavbar, setShowFooter } = useContext(AppContext)
    const [activeContent, setActiveContent] = useState("");

    useEffect(() => {
        if (setShowNavbar || setShowFooter) {
            setShowNavbar(false);
            setShowFooter(false);
        }
        return () => {
            if (setShowNavbar || setShowFooter) {
                setShowNavbar(true);
                setShowFooter(true);
            }
        }
    }, [setShowNavbar, setShowFooter])

    const handleActiveContent = (contentName) => {
        setActiveContent(contentName);
    }

    const renderContent = () => {
        switch (activeContent) {
            case 'leads':
                return <Leads />
            default:
                return <h3 className="text-white p-3">Selecciona una opción del panel.</h3>
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-lg-2 bg-dark text-white p-3" style={{ "height": "100vh" }}>
                    <h3 className="fw-bold section-title mb-3 text-center">Panel de Administrador</h3>
                    <h4 className="mb-4 border-bottom pb-3 text-center">¡Bienvenido!</h4>
                    <ul className="nav flex-column">
                        <li><hr class="dropdown-divider" /></li>
                        <li className="nav-item">
                            <Link to={""}
                                className={`adminOption fs-5 ms-4 ${activeContent === 'leads' ? 'fw-bold' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleActiveContent('leads');
                                }}
                            >
                                Ver Leads
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-md-9 col-lg-10 pt-4" style={{ "height": "100vh", overflowY: "auto" }}>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}