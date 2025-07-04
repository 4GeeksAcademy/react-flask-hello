import { Link } from "react-router-dom";
import vocaltechProject from "../assets/img/Portfolio/vocaltech2.png"
import vocaltechProject2 from "../assets/img/Portfolio/vocaltech1.png"
import vocaltechProject3 from "../assets/img/Portfolio/vocaltech4.png"
import vocaltechProject4 from "../assets/img/Portfolio/vocaltech3.png"
import muraProject1 from "../assets/img/Portfolio/mura1.png"
import bestfriendProject1 from "../assets/img/Portfolio/bestfriend1.png"
import comparadiseProject1 from "../assets/img/Portfolio/comparadise2.png"

export const Projects = () => {
    return (
        <section className="mx-3">
            <div className="container py-5">
                <div className="d-flex flex-column text-center justify-content-center mb-5">
                    <h2 className="section-title">Nuestros proyectos</h2>
                    <p className="text-white ct-description-p">Hemos creado universos digitales únicos que resuelven desafíos y conectan a las marcas con sus audiencias. Sabemos que cada proyecto es una historia que refleja innovación y resultados claros, y estamos dispuestos a plasmarlo en tu visión.</p>
                </div>
                <div className="row g-2 g-lg-3 h-100">
                    <div className="col col-lg-6">
                        <div className="d-flex flex-column h-100">
                            <img src={muraProject1} className="mb-3 rounded-5 object-fit-cover flex-grow-1" alt="cloudtech portfolio image 1" />
                            <img src={bestfriendProject1} className="mb-3 rounded-5 object-cover" alt="cloudtech portfolio image 2" />
                        </div>

                    </div>
                    <div className="col col-lg-6">
                        <div className="d-flex flex-column h-100">
                            <img src={comparadiseProject1} className="mb-3 rounded-5 object-fit-cover" alt="cloudtech portfolio image 4" />
                            <img src={vocaltechProject} className="mb-3 rounded-5 flex-grow-1 object-fit-cover" alt="cloudtech portfolio image 3" />
                        </div>
                    </div>
                </div>
                <div className="row text-center mt-5">
                    <div className="col">
                        <Link to={"/projects"} className="ct-btn-outline-accent text-decoration-none py-2 px-5">Explora nuestro portafolio</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}