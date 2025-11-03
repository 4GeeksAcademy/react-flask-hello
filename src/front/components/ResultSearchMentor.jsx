import { Link } from "react-router-dom";


const ResulSearchMentor = ({ mentor }) => {

    return (




        <>
            {




                <div className="card me-3  d-flex my-3 mx-1 me-2 p-0 card-hover cardsize border border-secondary-subtle rounded-4 " >
                    <div className="card-header border-0 text-end d-flex flex-column card-image-container">
                        <img src={mentor.avatar} className="card-img-top text-center mentor-card-image" alt={mentor.username}></img>
                    </div>
                    <div className="card-body ps-2 pt-0">
                        <h5 className="card-text text-start mb-0 fw-semibold mx-2 ">{mentor.name}</h5>
                        <div className="d-flex justify-content-center mentor-card-skills gap-2 mb-2">
                            {mentor?.skills?.map((s, index) => (
                                <>
                                    <div className="px-3 rounded-pill mentor-card-skill" key={index}>{s}</div>
                                </>
                            ))}
                        </div>

                        <div className="d-flex justify-content-center align-items-center">
                            <Link type="submit" className="btn btn-view btn-sm w-75 rounded-3 btn-hover " >Ver perfil</Link>

                        </div>
                    </div>

                </div>

            }


        </>


    )



}
export default ResulSearchMentor