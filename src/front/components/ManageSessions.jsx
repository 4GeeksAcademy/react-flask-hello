import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { CirclePlus, CalendarDays  } from 'lucide-react';
import AddSession from "./AddSession";
import useGlobalReducer from "../hooks/useGlobalReducer";
import userServices from "../services/userServices";
import CardsStudents from "./CardsStudents";
import CardsMentoringsPending from "./CardsMentoringsPending";

const ManageSessions = () => {
    const { store, dispatch } = useGlobalReducer()
    const [mentorings, setMentorings] = useState()



    useEffect(() => {

        userServices.getMentorings(store?.user?.id).then(data => {
            if (!data) {
                console.log("No hay información Aun")
            }

            setMentorings(data)
        })

    }, []);

    const groupedByStudentObj = (Array.isArray(mentorings) ? mentorings : []).reduce(
        (acc, mentoring) => {
            const studentId = mentoring.student_id;
            if (!acc[studentId]) {
                acc[studentId] = {
                    student: mentoring.student_profile,
                    sessions: [],
                };
            }
            acc[studentId].sessions.push(mentoring);
            return acc;
        },
        {}
    );

    const students = Object.values(groupedByStudentObj).map(item => item.student);
    const sessions = (Array.isArray(mentorings) ? mentorings : []);


    
    return (
        <>
            <div className=" mb-5 p-5">
            <div className="my-4">
                <h2>Mis aprendices</h2>
            </div>
                <div className="row">
                    {students && students.map((student) =>

                        <CardsStudents student={student} />
                    )}
                </div>
            </div>
            <div className=" mb-5 p-5">
                <div className="my-4">
                <h2>Sesiones pendientes:</h2>
            </div>
                <div className="row">
                    {sessions && sessions.filter(session =>
                        session.status === "scheduled").map(session => (
                            <CardsMentoringsPending key={session.id} session={session} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ManageSessions



