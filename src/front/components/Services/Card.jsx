export const Card = ({ title, description }) => {
    return (
        <div className="card card-background rounded-5 px-4 py-3 h-100">
            <div className="card-body text-start ">
                <h5 className="card-title text-ct-secondary">{title}</h5>
                <p className="card-text text-white">{description}</p>
            </div>
        </div>
    )
}