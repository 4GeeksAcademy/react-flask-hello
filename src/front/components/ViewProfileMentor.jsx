import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userServices from "../services/userServices";
import { User, Star, CalendarDays, IdCardIcon, IdCardLanyardIcon, Euro, Clock, Key } from 'lucide-react';
import { IdCard, } from "lucide";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const ViewProfileMentor = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState();
    const [typesMentoring, setTypesMentoring] = useState()
    const { store, dispatch } = useGlobalReducer()
    const options = [
        { value: "webdev", label: "Desarrollo Web" },
        { value: "ia", label: "Inteligencia Artificial" },
        { value: "datasci", label: "Ciencia de Datos" },
        { value: "cyber", label: "Ciberseguridad" },
        { value: "mobile", label: "Desarrollo Móvil" },
        { value: "devops", label: "DevOps" },
        { value: "uiux", label: "Diseño UI/UX" },
    ]

    const fetchTypesMentoring = () => {
        userServices.allTypesMentoring(id).then(async data => {

            if (data?.success) {
                
                setTypesMentoring(data.data)
            }
        })
    }





    useEffect(() => {

        userServices.getMentorProfile(id).then(data => {
         
            if (data) {
                setProfile(data)
            }

        })

        fetchTypesMentoring()


    }, []);




    const interestLabels = profile?.interests
        ?.replace(/[{}]/g, "")
        .split(",")
        .map(interest => {
            const trimmed = interest.trim();
            const option = options.find(opt => opt.value === trimmed);

            return option?.label || trimmed;
        })
        ?.join(", ");


    const handleReserve = (type) => {

        console.log(type.calendly_event_type_slug)
        console.log(store?.user)
        if (type?.calendly_event_type_slug) {   /* enviamos la informacion del estudiante para pre cargar informacion en formulario de Calendly */
            window.Calendly.initPopupWidget({ url: type?.calendly_event_type_slug,
                                              prefill: {
                                              name: store?.user?.profile?.name,
                                              email: store?.user?.email
                                              }
             })
        }
    }


    return (
        <>
            <div className="container ">
                <div className="d-flex view-profile-mentor align-items-center my-5">
                    <div className="p-4 ms-5">
                        <img className="view-profile-mentor-img " src={profile?.avatar} alt="" />
                    </div>
                    <div>
                        <p className="view-profile-mentor-name">{profile?.name}</p>
                        <p className="view-profile-mentor-location">{profile?.location}</p>
                    </div>
                </div>


                <div>
                    <ul className="nav nav-tabs custom-tabs border-0 mb-4" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="true"><span className="me-1"><User /></span>Perfil Mentor</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" type="button" role="tab" aria-controls="reviews-tab-pane" aria-selected="false"><span className="me-1"><Star /></span>Reseñas</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="sesion-tab" data-bs-toggle="tab" data-bs-target="#sesion-tab-pane" type="button" role="tab" aria-controls="sesion-tab-pane" aria-selected="false"><span className="me-1"><CalendarDays /></span>Sesiones</button>
                        </li>

                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                            <div className="tab-profile-bio mb-4">
                                <p className="title">Biografia</p>
                                {profile?.bio}
                            </div>
                            <div className="tab-profile-bio">
                                <p className="title">Mis temas de mentoria</p>
                                {interestLabels}
                            </div>


                        </div>
                        <div className="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabindex="0">...</div>
                        <div className="tab-pane fade" id="sesion-tab-pane" role="tabpanel" aria-labelledby="sesion-tab" tabindex="0">
                            <div className="row container d-flex">
                                {!store?.auth &&
                                    <div className="text-center p-5">
                                        <h3>Para acceder y ver sesiones de este mentor, debes registrarte y/o iniciar sesión</h3>
                                        <Link to={`/login`}>Login</Link>
                                    </div>
                                }
                                {store?.auth && typesMentoring?.map(type =>
                                ( 
                                    <div className="col-12 col-sm-12 col-lg-6 col-xl-4 d-flex" >
                                        <div className="card card-sessions text-center mb-3 mx-2 flex-fill" key={type.id} onClick={() => handleReserve(type)}>
                                            <div className="card-body">
                                                <h5 className="card-title">{type.title}</h5>
                                                <p className="card-text">{type.description}</p>
                                                <div className="d-flex justify-content-center gap-3">
                                                    <div className="session-duration d-flex justify-content-center align-items-center">
                                                        <span className='me-1'><Clock /></span>{`${type?.duration} min`}</div>
                                                    <div className="session-price d-flex justify-content-center align-items-center">
                                                        <span className='me-1'><Euro /></span>{`${type?.price} por sesión`}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))
                                }
                            </div>


                        </div>

                    </div>

                </div>


            </div>
            <div className="d-flex justify-content-center   mt-4 ">


                <Link to="/search-mentor">
                    <button className="cta-button ">Buscar mentor</button>
                </Link>
            </div>

        </>
    )




}
export default ViewProfileMentor