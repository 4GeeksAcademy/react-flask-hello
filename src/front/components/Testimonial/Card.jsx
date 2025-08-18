export const Card = ({ name, position, review, profilePicture, logo }) => {
    return (
        <div className="d-flex flex-column card bg-transparent border-0 px-4 py-3 h-100">
            <div className="card-body ct-reviews mb-4 flex-grow-1">
                <p className="card-text px-3 px-md-5 text-center text-white">{review}</p>
            </div>
            <div className="container mt-auto flex-shrink-1">
                <div className="row d-flex align-items-center gap-3">
                    <div className="col justify-content-center d-flex justify-content-md-end gap-3">
                        <img src={profilePicture} className="rounded-circle overflow-hidden object-fit-cover" alt="CloudTech client profile picture" style={{ maxWidth: "100px" }} />
                        <div className="d-flex align-self-center flex-column text-start text-white">
                            <h5 className="mb-0 ">{name}</h5>
                            <h6 className="fw-normal">{position}</h6>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center justify-content-md-start">
                        <img src={logo} className="" alt="CloudTech client company logo" />
                    </div>

                </div>
            </div>
        </div>
    )
}