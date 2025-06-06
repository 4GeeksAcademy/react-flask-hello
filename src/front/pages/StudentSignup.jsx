import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";

export const StudenSignup = () => {
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [load, setLoad] = useState(false)
    const [courses, setCourses] = useState([])
    const [msg, setMsg] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        course();
    }, [])

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
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register/student`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            const responseData = await response.json()
            if (response.ok) {
                setShowConfirmation(true)
            } else {
                setMsg(responseData.msg)
            }
        } catch (error) {
            console.log(error);
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
        <div className='background-container'>
            {showConfirmation ? (
                <div className='login-signup-form position-absolute top-50 start-50 translate-middle border rounded-3 p-4'>
                    <div className='text-center'>
                        <i className="ri-checkbox-circle-line text-success fs-1 mb-3"></i>
                        <h2 className='mb-3'>¡Registro Exitoso!</h2>
                        <div className='d-flex flex-column gap-2'>
                            <p className='mb-0'>¡Tu registro como alumno ha sido exitoso!</p>
                            <p className='text-muted small'>Tu información está siendo revisada. Una vez aprobada, podrás acceder a la plataforma. Este proceso suele tardar menos de 24 horas.</p>
                        </div>
                        <button
                            className='btn btn-dark mt-4'
                            onClick={() => navigate('/')}
                        >
                            Volver al inicio
                        </button>
                    </div>
                </div>
            ) : (
                <div className='login-signup-form position-absolute top-50 start-50 translate-middle border rounded-3 p-3 p-md-4'>
                    <div className='text-center mb-4'>
                        <h2>Regístrate como alumno</h2>
                        <p className="text-muted mt-2 mb-0">
                            ¿Eres profesor?
                            <button
                                className="unsetBtn ms-1 text-primary"
                                onClick={() => navigate('/signup/profesor')}
                            >
                                Regístrate aquí
                            </button>
                        </p>
                    </div>
                    <form className="login-width signup-form mx-auto" onSubmit={handleSubmit(procesarDatos)}>
                        <div className="row g-3 mb-3">
                            <div className="col-12 col-lg-6">
                                <input type="text" id="first_name" placeholder='Nombres' className={"form-control " + (errors.first_name ? 'is-invalid' : '')}
                                    {...register('first_name', {
                                        required: 'El campo nombres es requerido',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/i,
                                            message: 'Los nombres deben contener solo letras'
                                        }
                                    })}
                                />
                                <div className="invalid-feedback">
                                    {errors?.first_name?.message}
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <input type="text" id="last_name" placeholder='Apellidos' className={"form-control " + (errors.last_name ? 'is-invalid' : '')}
                                    {...register('last_name', {
                                        required: 'El campo apellidos es requerido',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/i,
                                            message: 'Los apellidos deben contener solo letras'
                                        }
                                    })}
                                />
                                <div className="invalid-feedback">
                                    {errors?.last_name?.message}
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <input type="email" id="email" placeholder='Correo electrónico' className={"form-control " + (errors.email ? 'is-invalid' : '')}
                                    {...register('email', {
                                        required: 'El campo correo es requerido',
                                        pattern: {
                                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                                            message: 'Dirección de correo inválida'
                                        }
                                    })}
                                />
                                <div className="invalid-feedback">
                                    {errors?.email?.message}
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <input type="tel" id="phone" placeholder='Celular' className={"form-control " + (errors.phone ? 'is-invalid' : '')}
                                    {...register('phone', {
                                        required: 'El campo celular es requerido',
                                        pattern: {
                                            value: /^\+?[1-9][0-9]{7,14}$/i,
                                            message: 'El celular debe contener solo números'
                                        },
                                        minLength: {
                                            value: 9,
                                            message: 'Cantidad mínima de números es 8'
                                        },
                                        maxLength: {
                                            value: 14,
                                            message: 'Cantidad máxima de números es 14'
                                        }
                                    })}
                                />
                                <div className="invalid-feedback">
                                    {errors?.phone?.message}
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <input type="text" id="location" placeholder='Ejemplo: Coronel Pereira 12, Las Condes, Chile' className={"form-control " + (errors.location ? 'is-invalid' : '')}
                                    {...register('location', {
                                        required: 'El campo dirección es requerido',
                                        pattern: {
                                            value: /^[A-Za-z0-9\s,]+$/i,
                                            message: 'La dirección debe contener solo letras, números o ",".'
                                        }
                                    })}
                                />
                                <div className="invalid-feedback">
                                    {errors?.location?.message}
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <select
                                    id="grade_level"
                                    className={"form-control " + (errors.grade_level_id ? 'is-invalid' : '')}
                                    {...register('grade_level_id', { required: 'Por favor seleccione un grado' })}
                                >
                                    <option value="">Seleccione Grado</option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>{course.name}</option>
                                    ))}
                                </select>
                                <div className="invalid-feedback">
                                    {errors?.grade_level_id?.message}
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <select
                                    id="period"
                                    className={"form-control " + (errors.period ? 'is-invalid' : '')}
                                    {...register('period', { required: 'Por favor seleccione un periodo' })}
                                >
                                    <option value="">Seleccione Periodo</option>
                                    <option value="Primer">Primer periodo</option>
                                    <option value="Segundo">Segundo periodo</option>
                                    <option value="Tercer">Tercer periodo</option>
                                    <option value="Cuarto">Cuarto periodo</option>
                                </select>
                                <div className="invalid-feedback">
                                    {errors?.period?.message}
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <input type="password" placeholder='Contraseña' id="password" className={"form-control " + (errors.password ? 'is-invalid' : '')}
                                    {...register('password', {
                                        required: 'El campo contraseña es requerido',
                                        minLength: {
                                            value: 8,
                                            message: 'La longitud mínima es de 8 caracteres'
                                        },
                                        maxLength: {
                                            value: 32,
                                            message: 'La longitud máxima es de 32 caracteres'
                                        },
                                        pattern: {
                                            value: /^[a-zA-z0-9\-\.\@\!]+$/i,
                                            message: 'El valor debe contener letras y números y los símbolos .,-,@,!'
                                        }
                                    })}
                                />
                                <div className="invalid-feedback">
                                    {errors?.password?.message}
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <input type="password" placeholder='Confirmar Contraseña' id="confirm_password" className={"form-control " + (errors.confirm_password ? 'is-invalid' : '')}
                                    {...register('confirm_password', {
                                        required: 'El campo confirmar contraseña es requerido',
                                        validate: (value) => value === password || 'Las contraseñas no coinciden'
                                    })}
                                />
                                <div className="invalid-feedback">
                                    {errors?.confirm_password?.message}
                                </div>
                            </div>
                        </div>
                        {msg && (
                            <div className="alert alert-danger d-flex justify-content-center align-items-center py-1 mb-3 gap-2" role="alert">
                                <i className="ri-error-warning-line"></i>
                                <div>{msg}</div>
                            </div>
                        )}
                        <button className="btn btn-dark w-100 mt-2" disabled={!isValid}>
                            Registrarse
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}