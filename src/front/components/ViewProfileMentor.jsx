import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userServices from "../services/userServices";
import { User, Star, CalendarDays   } from 'lucide-react';

const ViewProfileMentor = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState();

    useEffect(() => {

        userServices.getMentorProfile(id).then(data => {
            console.log(data)
            if (data) {
                setProfile(data)
            }

        })


    }, []);


    return (

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
                        <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="true"><span className="me-1"><User/></span>Perfil Mentor</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" type="button" role="tab" aria-controls="reviews-tab-pane" aria-selected="false"><span className="me-1"><Star/></span>Reseñas</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="sesion-tab" data-bs-toggle="tab" data-bs-target="#sesion-tab-pane" type="button" role="tab" aria-controls="sesion-tab-pane" aria-selected="false"><span className="me-1"><CalendarDays/></span>Sesiones</button>
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
                            {profile?.bio}
                        </div>


                    </div>
                    <div className="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabindex="0">...</div>
                    <div className="tab-pane fade" id="sesion-tab-pane" role="tabpanel" aria-labelledby="sesion-tab" tabindex="0">...</div>
                  
                </div>

            </div>


        </div>


    )




}
export default ViewProfileMentor