import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';



const ForgotPasswordForm = () => {

    function handleRedirect() {
        window.history.back();
    }


    return (

        <Formik
            initialValues={{
                emailOrPhone: ""
            }}
            validationSchema={Yup.object().shape({
                emailOrPhone: Yup.string()
                    .test('is-email-or-phone', 'Ingresa un correo electrónico o número de teléfono válido', value => {
                        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                        const phoneRegex = /^\d+$/;

                        return emailRegex.test(value) || phoneRegex.test(value);
                    })
                    .required('Campo obligatorio')
            })}
            // onSubmit={(values, { setSubmitting }) => {
            //     // Call your async submit function here (You can also use your handleSubmit function)
            //     console.log("Form submitted:", values);

            //     actions.signupUser(values)
            //         .then(() => {
            //             // Handle successful submission
            //             console.log("Form submitted successfully!");
            //             alert("Tu registro fue todo un éxito!!! Revisa tu correo electrónico.");
            //             navigate("/business_offers");
            //         })
            //         .catch((error) => {
            //             // Handle submission error
            //             console.error("Error submitting form:", error);
            //             alert("Email already exists");
            //         })
            //         .finally(() => {
            //             setSubmitting(false); // Set submitting to false after submission is done
            //         });
            // }}
        >
            {formik => (
                    <div className='container-password'>
                    <div className='content-password'>
                        <div className='title-password'>¿Has olvidado tu contraseña?</div>
                        <div className='subtitle-password'>Restablecer la contraseña en dos pasos rápidos</div>
                        
                        <form onSubmit={formik.handleSubmit}>
                            <div className='custom-input-password'>
                                <Field
                                    type='text'
                                    id='emailOrPhone'
                                    name='emailOrPhone'
                                    className="form-control"
                                />
                                <label
                                    htmlFor='emailOrPhone'
                                    className={formik.values.emailOrPhone ? 'input-label has-value' : 'input-label'}
                                >
                                    Email o teléfono:
                                </label>
                                <ErrorMessage name="emailOrPhone" className="error-text" />
                            </div>
                            <button type='submit' className='reset-button-password mt-2'>Restablecer la contraseña</button>
                            <button type='button' className='back-button-password mt-2' onClick={handleRedirect} >Volver</button>
                        </form>
                    </div>
                </div>

            )}
        </Formik>

    );
};

export default ForgotPasswordForm;
