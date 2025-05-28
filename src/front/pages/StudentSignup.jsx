import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";

export const StudenSignup = () => {




    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid }
    } = useForm({
        mode: 'onChange',
    })

    const password = watch('password', '')


    const procesarDatos = (data) => {
        console.log('Informacion del Registro', data)
    }


    return (
        <div className='mx-5'>
            <div className='d-flex mx-auto'>
                <div className='col-4 text-center'>
                    <h2>Welcome!</h2>
                    <h4>To our website.</h4>
                    <p>For register as student...</p>
                </div>
                <form className="w-25 mx-auto my-5" onSubmit={handleSubmit(procesarDatos)}>
                    <div className="form-group mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input type="text" id="name" placeholder='Name' className={"form-control " + (errors.name ? 'is-invalid' : '')}
                            {
                            ...register('name', {
                                required: 'The field name is required!',
                                pattern: {
                                    value: /^[A-Za-z\s]+$/i,
                                    message: 'Then name must containt only letters'
                                }
                            })
                            }
                        />
                        <div className="invalid-feedback">
                            {errors?.name?.message}
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="lastname" className="form-label">Last Name:</label>
                        <input type="text" id="lastname" placeholder='Last Name' className={"form-control " + (errors.lastname ? 'is-invalid' : '')}
                            {
                            ...register('lastname', {
                                required: 'The field last name is required!',
                                pattern: {
                                    value: /^[A-Za-z\s]+$/i,
                                    message: 'Then name must containt only letters'
                                }
                            })
                            }
                        />
                        <div className="invalid-feedback">
                            {errors?.lastname?.message}
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
                                minLength: {
                                    value: 8,
                                    message: 'the minimum number of numbers is 8'
                                },
                                maxLength: {
                                    value: 14,
                                    message: 'the maximum number of numbers is 14'
                                },
                                pattern: {
                                    value: /^\+?[1-9][0-9]{7,14}$/i,
                                    message: 'Then name must containt only numbers'
                                }
                            })
                            }
                        />
                        <div className="invalid-feedback">
                            {errors?.phone?.message}
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
                    <button className="btn btn-primary btn-sm w-100" disabled={!isValid}>
                        Register
                    </button>
                </form>

            </div>
        </div>
    )
}
