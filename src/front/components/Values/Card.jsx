export const Card = ({ title, description, showDivider }) => {
    return (
        <div className="card-body row text-start h-100">
            <div className="flex-grow-1">
                <h5 className="card-title fs-4 text-ct-secondary mb-3">{title}</h5>
                <p className="card-text text-white mb-4">{description}</p>
            </div>
            {showDivider && (
                <hr className="card-divider mt-auto"></hr>
            )}
        </div>
    )
};