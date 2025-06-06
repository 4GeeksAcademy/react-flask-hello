import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

export const ProfesoresHorario = () => {
    const [schedule, setSchedule] = useState([])
    const { store } = useAuth();
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState([])
    const token = store.access_token;

    useEffect(() => {
        // const schedule = async () => {
        //     try {
        //         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/teacher/schedule-grid`, {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `Bearer ${token}`
        //             }
        //         })
        //         const data = await response.json()
        //         if (response.ok) {
        //             console.log(data);
        //             setSchedule(data)
        //             setLoad(true)
        //         }
        //     } catch (error) {
        //         console.log(error);

        //     }
        // }
        const user = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    console.log(data);
                    setUser(data)
                    setLoad(true)
                }
            } catch (error) {
                console.log(error);
            }
        }
        user()
        // schedule()
    }, [])
    return (
        <div className="container table-responsive my-5">
            {load ? <div className="row">
                <table className="col-12 table table-striped table-bordered text-center mt-5">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">HORARIOS</th>
                            <th scope="col">LUNES</th>
                            <th scope="col">MARTES</th>
                            <th scope="col">MIERCOLES</th>
                            <th scope="col">JUEVES</th>
                            <th scope="col">VIERNES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">07:00 - 09:00	</th>
                            <td>{user.teacher.courses[0].name}</td>
                            <td></td>
                            <td>{user.teacher.courses[0].name}</td>
                            <td>{user.teacher.courses[0].name}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">09:00 - 11:00</th>
                            <td>{user.teacher.courses[0].name}</td>
                            <td>{user.teacher.courses[0].name}</td>
                            <td></td>
                            <td>{user.teacher.courses[0].name}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">11:00 - 13:00</th>
                            <td></td>
                            <td>{user.teacher.courses[0].name}</td>
                            <td>{user.teacher.courses[0].name}</td>
                            <td></td>
                            <td>{user.teacher.courses[0].name}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
                :
                <div className="spinner-border position-absolute top-50 start-50 translate-middle" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
        </div>
    );
};