import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export const Card = ({ name, position, description, image, catImage, mailLink, linkedinLink, githubLink }) => {
    return (
        <div className="card h-100 card-background rounded-5 pb-3">
            <div className="card-img-wrapper overflow-hidden rounded-top-5">
                <img src={image} className="original-image w-100 h-100 object-fit-cover" alt="CloudTech Team member profile picture" />
                <div
                    className="cat-image-overlay cat-transition"
                    style={{ '--cat-image-url': `url(${catImage})` }}
                ></div>
            </div>

            <div className="card-body text-center text-white pt-4">
                <h3 className="section-title mb-1">{name}</h3>
                <h5 className="mt-0 mb-3">{position}</h5>
                <p className="card-text px-3">{description}</p>
                <div className="d-flex justify-content-center fs-1 gap-3">
                    <a href={`mailto:${mailLink}`} className="text-white"><FontAwesomeIcon icon={faEnvelope} /></a>
                    <a href={linkedinLink} target="_blank" className="text-white"><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a href={githubLink} target="_blank" className="text-white"><FontAwesomeIcon icon={faGithubSquare} /> </a>
                </div>
            </div>
        </div>
    )
}