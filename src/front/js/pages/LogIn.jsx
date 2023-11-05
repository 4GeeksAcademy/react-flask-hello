import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";

const LogIn = () => {
  const { store, actions } = useContext(Context);
  const [loginError, setLoginError] = useState("");
  let navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Obligatorio'),
        password: Yup.string().min(8, 'Debe tener 8 caracteres o más').required('Obligatorio'),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          let isLogged = await actions.login(values.email, values.password);
          // console.log("is Logged:", isLogged);
          if (isLogged) {
            // Connexion réussie
            setTimeout(() => {
              Swal.fire({
                title: `Bienvenid@ de nuevo, ${store.user.username || store.business_user.business_name}!`,
                text: "",
                icon: 'info',
                timer: 1000
              });
            }, 0); // Utilisez un délai de 0 millisecondes pour que le Swal.fire soit en attente

            navigate("/");
          } else {
            setTimeout(() => {
              Swal.fire({
                title: "Email and/or password are incorrect",
                text: '',
                icon: 'error',
                timer: 2000
              });
            }, 1000);
          }
        } catch (error) {
          // Handle any errors that occurred during login
          console.error("Error during login:", error);
        } finally {
          setSubmitting(false); // Set submitting to false after submission is done
        }
      }}
    >
      {formik => (

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 text-center" id="staticBackdropLabel"><strong>Identifícate</strong></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email">Correo electrónico</label>
                    <Field name="email" type="email" />
                    <ErrorMessage name='email' />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password">Contraseña</label>
                    <Field name="password" type="password" />
                    <ErrorMessage name='password' />
                  </div>

                  <Link to='/signup' > <span data-bs-dismiss="modal">¿Aún no tienes una cuenta? Click aquí!</span></Link>
                  <Link to='/forgot_password' className="mt-2 mb-3"> <span data-bs-dismiss="modal" >¿Olvidaste la contraseña? Click aquí!</span></Link>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="submit" className="btn btn-primary"><span data-bs-dismiss="modal">Entrar</span>  </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};



export default LogIn