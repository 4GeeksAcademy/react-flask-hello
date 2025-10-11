const FeatureCard = ({ title, description, buttonText,imgUrl, last }) => {
    return (
        <div className={`col-lg-4 ${last ? "col-md-12" : "col-md-6 "} col-12`}>
            <div className="d-flex justify-content-center h-100 text-center">
                <div className="card h-100" style={{width: "15rem"}}>
                    <img src={imgUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a href="#" className="btn btn-primary">{buttonText}</a>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureCard