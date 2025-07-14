import { Link } from "react-router-dom";

export const Card = ({ title, description, showDivider }) => {
    return (
            <div className="card-body row text-start">
                <div className="flex-grow-1">
                    <h5 className="card-title fs-4 text-ct-secondary">{title}</h5>
                    <p className="card-text text-white mb-4">{description}</p>
                </div>
                {showDivider && (
                    <hr className="card-divider mt-auto"></hr>
                )}
            </div>
    )
};