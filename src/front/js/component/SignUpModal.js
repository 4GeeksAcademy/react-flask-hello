import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const SignUpModal = props => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const initialValues = {
        name: '',
        email: '',
        password: ''
    };

    const handleSignUp = async (values) => {

        const registrationResult = await actions.register(values.name, values.email, values.password);

        if (registrationResult) {
            await actions.login(values.email, values.password);
            props.onClose();
        }

        else { console.log("El correo electrónico ya existe"); }

    }

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none", cursor: "pointer" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-100 d-flex flex-column px-5">
                        <div className="d-flex flex-row justify-content-end w-100">
                            <i className="fa-solid fa-xmark" onClick={() => props.onClose()}></i>
                        </div>
                        <h4 className="modal-title">Sign up</h4>
                    </div>
                    <div className="modal-body w-100 px-5">
                        <Formik initialValues={initialValues} onSubmit={handleSignUp}>
                            <Form>
                                <div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
                                    <label className="d-flex justify-content-start w-100">Name</label>
                                    <Field type="text" name="name" className="w-100 rounded-3" required />
                                </div>
                                <div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
                                    <label className="d-flex justify-content-start w-100">Email</label>
                                    <Field type="email" name="email" className="w-100 rounded-3" required />
                                    <ErrorMessage name="email" component="div" className="error-message" />
                                </div>
                                <div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
                                    <label className="d-flex justify-content-start w-100">Password</label>
                                    <Field type="password" name="password" className="w-100 rounded-3" required />
                                    <ErrorMessage name="password" component="div" className="error-message" />
                                </div>
                                <div className="d-flex justify-content-center mt-2">
                                    <button type="submit" className="btn-300 to-be-hoved form-control w-50 ">
                                    SIGN UP!
                                </button>
                                </div>
                                
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};


