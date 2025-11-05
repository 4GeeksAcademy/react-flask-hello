import { useEffectEvent } from "react";
import { Link } from "react-router-dom";


const ResultSearchMentor = ({ mentor }) => {
    const options = [
        { value: "webdev", label: "Desarrollo Web" },
        { value: "ia", label: "Inteligencia Artificial" },
        { value: "datasci", label: "Ciencia de Datos" },
        { value: "cyber", label: "Ciberseguridad" },
        { value: "mobile", label: "Desarrollo Móvil" },
        { value: "devops", label: "DevOps" },
        { value: "uiux", label: "Diseño UI/UX" },
    ]


  

 const interestLabels = mentor?.interests
    ?.replace(/[{}]/g, "") 
    .split(",")            
    .map(interest => {
        const trimmed = interest.trim();
        const option = options.find(opt => opt.value === trimmed);
       
        return option?.label || trimmed;
    })
    ?.join(", ");



    return (


        <>
            {
                <div className="card  d-flex my-3 p-0 card-hover cardsize border" >
                    <div className="card-header border-0 text-end d-flex flex-column card-image-container">
                        <img src={mentor.avatar} className="card-img-top text-center imgcard" alt={mentor.username}></img>
                    </div>
                    <div className="card-body">
                        <div>
                        <h5 className="fw-semibold  mt-0 mb-0">{mentor.name}</h5>
                           <span className="card-mentor-interest">{interestLabels}</span> 
                        </div>

                        <div className="d-flex justify-content-center mentor-card-skills mb-2">
                            {mentor?.skills?.map((s, index) => (
                                <>
                                    <div className="px-2 rounded-pill mentor-card-skill" key={index}>{s}</div>
                                </>
                            ))}
                        </div>

                        <div className="d-flex justify-content-center align-items-center">
                            <Link type="submit" className="btn btn-view btn-sm  btn-hover" to={`/view-mentor/${mentor.user_id}`} >Ver perfil</Link>

                        </div>
                    </div>

                </div>

            }


        </>


    )



}
export default ResultSearchMentor