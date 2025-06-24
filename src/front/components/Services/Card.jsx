export const Card = ({ title, description }) => {
    return (
        <div className="card card-background rounded-5 p-3" style={{ minHeight: '300px' }}>
            <div className="card-body text-start ">
                <h5 className="card-title text-ct-secondary">{title}</h5>
                <p className="card-text text-white">{description}</p>
            </div>
        </div>
    )
}