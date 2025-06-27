import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export const Card = ({ name, position, description, image, mailLink, linkedinLink, githubLink }) => {
    return (
        <div className="card h-100 card-background rounded-5">
            <img src={image} className="card-img-top rounded-top-5" alt="CloudTech Team member profile picture" />
            <div className="card-body text-center text-white">
                <h3 className="card-title section-title">{name}</h3>
                <h5>{position}</h5>
                <p className="card-text">{description}</p>
                <div className="d-flex justify-content-center gap-3">
                    <Link to={mailLink} className="text-white"><FontAwesomeIcon icon={faEnvelope} /></Link>
                    <Link to={linkedinLink} className="text-white"><FontAwesomeIcon icon={faLinkedin} /></Link>
                    <Link to={githubLink} className="text-white"><FontAwesomeIcon icon={faGithubSquare} /> </Link>
                </div>
            </div>
        </div>
    )
}