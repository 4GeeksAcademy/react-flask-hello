import { Link } from "react-router-dom"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

export const Card = ({ title, icon, description, link }) => {
    return (
        <div className="card container card-background rounded-5 px-4 py-3 h-100">
            <div className="card-body row text-start ">
                <h5 className="card-title fs-4 text-ct-secondary">{icon} {title}</h5>
                <p className="card-text text-white mb-4">{description}</p>
                <div className="col align-self-end">
                    <Link to={"/contact"} className="animated-link text-decoration-none text-ct-secondary">{link}</Link>
                </div>
            </div>
        </div>
    )
}