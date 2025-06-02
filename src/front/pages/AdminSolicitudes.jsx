import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";

export const AdminSolicitudes = () => {
    const [register, setRegister] = useState('')
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])
    const token = sessionStorage.getItem('access_token')
    const auth = useAuth()

    useEffect(() => {
        auth.getProfile()
    }, [auth?.store?.access_token])

    useEffect(() => {
        const pending = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pending/registrations`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (response.ok) {
                    const dataResponse = await response.json()
                    const onlyTeachers = dataResponse.filter(user => user.role === "teacher");
                    setTeachers(onlyTeachers);
                    const onlyStudents = dataResponse.filter(user => user.role === "student");
                    setStudents(onlyStudents);
                }

            } catch (error) {
                console.log(error);
            }
        }

        pending()
    }, [])

    const approve = async (role, id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/approve/${role}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: 'approved' })
            })

            const result = await response.json();
            if (response.ok) {
                console.log(result.msg);
                if (role === 'teacher') {
                    setTeachers(prev => prev.filter(user => user.id !== id));
                } else if (role === 'student') {
                    setStudents(prev => prev.filter(user => user.id !== id));
                }
            }

        } catch (error) {
            console.log(error);

        }
    }

    const reject = async (role, id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/delete/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: 'rejected' })
            })

            const result = await response.json();
            if (response.ok) {
                console.log(result.msg);
                if (role === 'teacher') {
                    setTeachers(prev => prev.filter(user => user.id !== id));
                } else if (role === 'student') {
                    setStudents(prev => prev.filter(user => user.id !== id));
                }
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="container table-responsive">
            <div className="row">
                <div className="col-2">
                    <select className="form-select" aria-label="Selecciona una opción" onChange={e => setRegister(e.target.value)}>
                        <option value="">Selecciona:</option>
                        <option value="students">Alumnos</option>
                        <option value="teachers">Profesores</option>
                    </select>
                </div>
                {register === 'teachers' ?
                    <table className="col-12 table table-striped table-bordered text-center mt-5">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Course_id</th>
                                <th scope="col">Role</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map(teachers => (
                                <tr key={teachers.id}>
                                    <td>{teachers.id}</td>
                                    <td>{teachers.last_name}</td>
                                    <td>{teachers.first_name}</td>
                                    <td>{teachers.email}</td>
                                    <td>{teachers.teacher.phone}</td>
                                    <td>{teachers.teacher.department}</td>
                                    <td>{teachers.role}</td>
                                    <td>{teachers.status}</td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <button type="button" className="btn btn-success btn-sm" onClick={() => approve(teachers.role, teachers.id)}>Aprove</button>
                                            <button type="button" className="btn btn-danger btn-sm" onClick={() => reject(teachers.role, teachers.id)}>Reject</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> : ''}

                {register === 'students' ?
                    <table className="col-12 table table-striped table-bordered text-center mt-5">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Grade Level</th>
                                <th scope="col">Student Code</th>
                                <th scope="col">Role</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(students => (
                                <tr key={students.id}>
                                    <td>{students.id}</td>
                                    <td>{students.last_name}</td>
                                    <td>{students.first_name}</td>
                                    <td>{students.email}</td>
                                    <td>{students.student.phone}</td>
                                    <td>{students.student.grade_level}</td>
                                    <td>{students.student.student_code}</td>
                                    <td>{students.role}</td>
                                    <td>{students.status}</td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <button type="button" className="btn btn-success btn-sm" onClick={() => approve(students.role, students.id)}>Approve</button>
                                            <button type="button" className="btn btn-danger btn-sm" onClick={() => reject(students.role, students.id)}>Reject</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> : ''}
            </div>
        </div>
    );
};