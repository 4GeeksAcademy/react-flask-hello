const FeatureCard = ({ title, description, buttonText,imgUrl, last }) => {
    return (
        <div className={`col-lg-4 ${last ? "col-md-12" : "col-md-6 "} col-12`}>
            <div className="d-flex justify-content-center h-100">
                <div className="card h-100 rounded-5 overflow-hidden border-0 text-center " style={{width: "15rem"}}>
                    <img src={imgUrl} className="card-img-top" alt="..."/>
                        <div className="card-body pb-0 d-flex flex-column align-items-center">
                            <h5 className="card-title fs-3">{title}</h5>
                            <p className="card-text">{description}</p>
                            <div className="pb-5  border-bottom border-color-5">

                            <a href="#" className="btn button-color-4 font-color-3 rounded-pill ">{buttonText}</a>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureCard