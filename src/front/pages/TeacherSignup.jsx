import React, { useState, useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'

export const TeacherSignup = () => {
    const [load, setLoad] = useState(false)
    const [courses, setCourses] = useState([])
    const [msg, setMsg] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        course();
    }, [])
    // El fetch debe ser distinto pero faltan las materias o cursos
    const course = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/setup/grade_levels`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            if (response.ok) {
                setLoad(true)
                setCourses(data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const procesarDatos = async (data) => {
        console.log('Informacion del Registro', data)
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register/teacher`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            const responseData = await response.json()
            if (response.ok) {
                navigate(`/`);
            }

        } catch (error) {
            console.log(error);
            setMsg('*No se ha podido realizar el registro.')
        }
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm({
        mode: 'onChange',
    })

    const password = watch('password', '')

    return (
        <div className='mx-5'>
            <div className='d-flex col-12 align-items-center mx-auto'>
                <div className='col-6 text-center '>
                    <h2>Welcome!</h2>
                    <h4>To our website.</h4>
                    <p>For register as teacher...</p>
                </div>
                <form className="col-4 mx-auto my-5" onSubmit={handleSubmit(procesarDatos)}>
                    <div className="form-group mb-3">
                        <label htmlFor="first_name" className="form-label">Name:</label>
                        <input type="text" id="first_name" placeholder='Name' className={"form-control " + (errors.first_name ? 'is-invalid' : '')}
                            {
                            ...register('first_name', {
                                required: 'The field name is required!',
                                pattern: {
                                    value: /^[A-Za-z\s]+$/i,
                                    message: 'Then name must containt only letters'
                                }
                            })
                            }
                        />
                        <div className="invalid-feedback">
                            {errors?.first_name?.message}
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="last_name" className="form-label">Last Name:</label>
                        <input type="text" id="last_name" placeholder='Last Name' className={"form-control " + (errors.last_name ? 'is-invalid' : '')}
                            {
                            ...register('last_name', {
                                required: 'The field last name is required!',
                                pattern: {
                                    value: /^[A-Za-z\s]+$/i,
                                    message: 'Then name must containt only letters'
                                }
                            })
                            }
                        />
                        <div className="invalid-feedback">
                            {errors?.last_name?.message}
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" id="email" placeholder='Email' className={"form-control " + (errors.email ? 'is-invalid' : '')}
                            {
                            ...register('email', {
                                required: 'The field email is required',
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                                    message: 'Email invalid'
                                }
                            })
                            }
                        />
                        <div className="invalid-feedback">
                            {errors?.email?.message}
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input type="tel" id="phone" placeholder='Phone' className={"form-control " + (errors.phone ? 'is-invalid' : '')}
                            {
                            ...register('phone', {
                                required: 'The field phone is required!',
                                pattern: {
                                    value: /^\+?[1-9][0-9]{7,14}$/i,
                                    message: 'Then name must containt only numbers'
                                },
                                minLength: {
                                    value: 9,
                                    message: 'the minimum number of numbers is 8'
                                },
                                maxLength: {
                                    value: 14,
                                    message: 'the maximum number of numbers is 14'
                                }

                            })
                            }
                        />
                        <div className="invalid-feedback">
                            {errors?.phone?.message}
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="grade_level" className="form-label">Asignature:</label>
                        <select
                            id="grade_level"
                            className={"form-control " + (errors.grade_level_id ? 'is-invalid' : '')}
                            {...register('grade_level_id', { required: 'Please select a grade level' })}
                        >
                            <option value=""> Select Asignature </option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>{course.name}</option>
                            ))}
                        </select>
                        <div className="invalid-feedback">
                            {errors?.grade_level?.message}
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" placeholder='Password' id="password" className={"form-control " + (errors.password ? 'is-invalid' : '')}
                            {
                            ...register('password', {
                                required: 'The field password is required!',
                                minLength: {
                                    value: 8,
                                    message: 'The min length is 8 characters'
                                },
                                maxLength: {
                                    value: 32,
                                    message: 'The max length is 32 characters'
                                },
                                pattern: {
                                    value: /^[a-zA-z0-9\-\.\@\!]+$/i,
                                    message: 'The value must contains letters and numbers and the symbols .,-,@,!'
                                }
                            })
                            }
                        />
                        <div className="invalid-feedback">
                            {errors?.password?.message}
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="confirm_password" className="form-label">Confirm Password:</label>
                        <input type="password" placeholder='Confirm Password' id="confirm_password" className={"form-control " + (errors.confirm_password ? 'is-invalid' : '')}
                            {
                            ...register('confirm_password', {
                                required: 'The field confirm password is required!',
                                validate: (value) => value === password || 'The passwords no match'
                            })
                            }
                        />
                        <div className="invalid-feedback">
                            {errors?.confirm_password?.message}
                        </div>
                    </div>
                    <p className="text-danger">{msg}</p>
                    <button className="btn btn-outline-dark w-100" disabled={!isValid}>
                        Register
                    </button>
                </form>

            </div>
        </div>
    )
}