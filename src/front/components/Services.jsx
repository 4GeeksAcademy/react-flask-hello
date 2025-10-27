import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { Circle, CirclePlus, CirclePlusIcon } from 'lucide-react';
import AddSession from "./AddSession";
import useGlobalReducer from "../hooks/useGlobalReducer";
import userServices from "../services/userServices";
import CarTypeMentoring from "./CarTypeMentoring";

const Services = () => {
    const { role } = useParams();
    const [addSession, setAddSession] = useState(false)
    const [userId, setUserId] = useState()
    const { store, dispatch } = useGlobalReducer()
    const [typesMentoring, setTypesMentoring] = useState()

    const handleAddSession = () => {
        console.log("Click")
        setAddSession(true)
    }



    useEffect(() => {

        console.log(store?.user.id)
        userServices.allTypesMentoring(store?.user.id).then(async data => {

            if (data?.success) {
                console.log(data.data)
                setTypesMentoring(data.data)

            }


        })


    }, []);



    return (
        <>
            <div className="my-4">
                <h2>Tipos de sesiones de mentoria</h2>
            </div>
            <div className="div-sessions mb-5 p-5">
                <div className="row">
                    {typesMentoring?.map(type =>(

                     <CarTypeMentoring key={type.id} type={type}/>

                    ))}
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <div class="card card-sessions text-center " data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <span className="text-center mt-5 mb-0"><CirclePlusIcon/></span>
                            <div class="card-body mb-4 ">
                                <p class="card-text">Agrega una nueva sesión</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddSession userId={userId} />
        </>
    )
}

export default Services


