import React from "react"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import userServices from "../services/userServices";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { CirclePlus, CalendarDays, CircleCheckBig, CircleX } from 'lucide-react';

const Panel = () => {
    const { role } = useParams();
    const [mentorings, setMentorings] = useState()
    const { store, dispatch } = useGlobalReducer()
    const now = new Date()


    useEffect(() => {

        userServices.getMentorings(store?.user?.id).then(data => {
            if (!data) {
                console.log("No hay información Aun")
            }
            console.log(data)
            setMentorings(data)
        })

    }, []);


    const states = mentorings?.reduce((acc, m) => {
        const endTime = new Date(m.end_time)

        if (m.status === 'canceled') {
            acc.canceled++
        } else if (endTime < now) {
            acc.completed++
        } else {
            acc.pending++
        }
        return acc
    }, { pending: 0, canceled: 0, completed: 0 })


    const totalSession = (states?.canceled || 0) + (states?.completed || 0) + (states?.pending || 0)

    const calcPercentage = (count) => {
        if (totalSession === 0) return 0;
        return ((count / totalSession) * 100).toFixed(0)
    }


    const percentPending = calcPercentage(states?.pending || 0)
    const percentCanceled = calcPercentage(states?.canceled || 0)
    const percentCompleted = calcPercentage(states?.completed || 0)

    console.log(percentPending, percentCanceled, percentCompleted)






    return (
        <>
            {role === 'mentor' &&
                <>
                    <h2 className="my-5 fs-1">Tus estadisticas como {role}</h2>
                    <div className="div-statistics p-5">
                        <div className="mb-5">
                            <div className="progress-stacked">
                                <div className="progress" role="progressbar" aria-label="Pendientes" aria-valuenow={percentPending} aria-valuemin="0" aria-valuemax="100"
                                    style={{ width: `${percentPending}%` }}>
                                    <div className="progress-bar bg-header-pending"><span className="text-black fw-bold">{`${percentPending}%`}</span></div>
                                </div>
                                <div className="progress" role="progressbar" aria-label="Segment two" aria-valuenow={percentCanceled} aria-valuemin="0" aria-valuemax="100"
                                    style={{ width: `${percentCanceled}%` }} >
                                    <div className="progress-bar bg-header-canceled"><span className="text-black fw-bold">{`${percentCanceled}%`}</span></div>
                                </div>
                                <div className="progress" role="progressbar" aria-label="Segment three" aria-valuenow={percentCompleted} aria-valuemin="0" aria-valuemax="100"
                                    style={{ width: `${percentCompleted}%` }}>
                                    <div className="progress-bar bg-header-completed"><span className="text-black fw-bold">{`${percentCompleted}%`}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex gap-4">
                            <div className="card card-states">
                                <div className="card-header bg-header-pending"></div>
                                <div className=" d-flex align-items-end h-75">
                                    <p className="mb-0 me-2 ">{<CalendarDays size={50} />}</p>
                                    <p className="w-75 fs-4 mb-0">Pendientes</p>
                                    <span className="fs-4">({states?.pending})</span>
                                </div>
                            </div>
                            <div className="card card-states">
                                <div className="card-header bg-header-completed"></div>
                                <div className="d-flex align-items-end h-75">
                                    <p className="mb-0 me-1">{<CircleCheckBig size={50} />}</p>
                                    <p className="w-75 fs-4 mb-0">Completadas</p>
                                    <span className="fs-4">({states?.completed})</span>
                                </div>
                            </div>
                            <div className="card card-states">
                                <div className="card-header bg-header-canceled"></div>
                                <div className="d-flex align-items-end h-75">
                                    <p className="mb-0 me-1">{<CircleX size={50} />}</p>
                                    <p className="w-75 fs-4 mb-0">Canceladas</p>
                                    <span className="fs-4">({states?.canceled})</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </>


            }
            {role === 'student' &&
                <h2>Aqui renderiza panel de {role}</h2>
            }

        </>
    )
}

export default Panel