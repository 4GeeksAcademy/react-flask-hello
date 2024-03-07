import React, { useState, useEffect, useContext } from "react";;
import { Context } from "../store/appContext";
import { SignUpModal } from "./SignUpModal";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { PasswordRestorationModal } from "./PasswordRestorationModal";


export const LoginModal = props => {

	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [modalRegisterState, setModalRegisterState] = useState({
		showModal: false,
		showModalUpdate: false,
	});
	const [modalPWRecoveryState, setModalPWRecoveryState] = useState({
		showPWModal: false,
		showPWModalUpdate: false,
	});
	const initialValues = {
		email: '',
		password: ''
	};

	const handleLogIn = async (values) => {

		await actions.login(values.email, values.password);
		if (store.auth) {
			await actions.obtenerInfoUsuario()
			props.onClose(); // Cierra el modal
		}
	}

	useEffect(() => {
		return () => {
			setEmail("")
			setPassword("")
		};
	}, []);

	function updateModalRegistrerState() {

		setModalRegisterState({ showModalUpdate: true });




	}
	function updateModalPWRecoveryState() {
		setModalPWRecoveryState({ showPWModalUpdate: true });

	}

	return (


		<>

			<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none", cursor: "pointer" }}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header bg-100 d-flex flex-column px-5">
							<div className="d-flex flex-row justify-content-end w-100">
								<i className="fa-solid fa-xmark" onClick={() => props.onClose()}></i>
							</div>
							<h4 className="modal-title">Log in</h4>
							<h6>Not yet a member? <a className="text-primary" onClick={updateModalRegistrerState}>Sign up.</a></h6>
						</div>

						<div className="modal-body w-100 px-5">
							<Formik initialValues={initialValues} onSubmit={handleLogIn}>
								<Form>
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
										<button type="submit" className="btn-300 to-be-hoved form-control w-50">
											ENTER!
										</button>
									</div>

								</Form>
							</Formik>
						</div>

						<div className="modal-footer bg-100 d-flex flex-column px-5">
							<h6><a className="text-primary" onClick={updateModalPWRecoveryState}>Have you forgotten your password?</a></h6>
						</div>

					</div>
				</div>
				<SignUpModal show={modalRegisterState.showModalUpdate} onClose={() => setModalRegisterState({ showModalUpdate: false })} />
				<PasswordRestorationModal show={modalPWRecoveryState.showPWModalUpdate} onClose={() => setModalPWRecoveryState({ showPWModalUpdate: false })} />
			</div>

		</>
	);
};
