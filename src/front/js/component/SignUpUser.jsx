import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";


const SignUpUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { store, actions } = useContext(Context);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  let navigate = useNavigate();

  function handleRedirect() {
    window.history.back();
  }
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        username: "",
        firstname: "",
        lastname: "",
        phone_prefix: "",
        phone_number: "",
        passport: "",
        address: "",
        payment_method: "",
        acceptTerms: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Formato erróneo para el correo electrónico').required('Campo obligatorio'),
        password: Yup.string().min(8, 'Debe tener 8 caracteres o más').required('Campo obligatorio').matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Debe contener al menos una mayúscula, un número y un símbolo'
        ),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
          .required('Campo obligatorio'),
        username: Yup.string()
          .min(5, 'Debe tener 5 caracteres o más')
          .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s-_]*$/, 'Debe comenzar con una letra mayúscula o minúscula ')
          .required('Campo obligatorio!'),
        firstname: Yup.string()
          .min(2, 'Debe tener 2 caracteres o más')
          .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ][A-Za-zÁÉÍÓÚáéíóúÑñ]*$/, 'Debe comenzar con una letra mayúscula o minúscula ')
          .required('Campo obligatorio!'),
        lastname: Yup.string()
          .min(2, 'Debe tener 2 caracteres o más')
          .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ][A-Za-zÁÉÍÓÚáéíóúÑñ]*$/, 'Debe comenzar con una letra mayúscula o minúscula ')
          .required('Campo obligatorio!'),
        phone_prefix: Yup.string()
          .matches(/^\d+$/, 'Ingresa solo números')
          .min(2, 'Prefijo debe tener mínimo 2 dígitos')
          .max(2, 'Prefijo debe tener máximo 2 dígitos')
          .required('El prefijo es un campo obligatorio'),
        phone_number: Yup.string()
          .matches(/^\d+$/, 'Ingresa solo números')
          .min(7, 'Número debe tener al menos 7 dígitos')
          .required('El número telefónico es un campo obligatorio'),
        passport: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Campo obligatorio'),
        address: Yup.string()
          .min(5, 'Debe tener 5 caracteres o más')
          .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s- ]*$/, 'Debe comenzar con una letra mayúscula o minúscula ')
          .required('Campo obligatorio!'),
        payment_method: Yup.string().min(2, 'Debe tener 2 caracteres o más').required('Campo obligatorio'),
        acceptTerms: Yup.boolean()
          .required('Campo obligatorio')
          .oneOf([true], 'Debes aceptar los términos y condiciones para registrarte'),
      })}


      onSubmit={(values, { setSubmitting }) => {
        // Call your async submit function here (You can also use your handleSubmit function)
        // console.log("Form submitted:", values);

        actions.signupUser(values)
          .then(() => {
            // Handle successful submission


            //console.log("Form submitted successfully!");
            Swal.fire({
              title: "Registro exitoso",
              text: "Tu registro fue todo un éxito!!! Revisa tu correo electrónico.",
              icon: "success",
              timer: 1000
            });
            setTimeout(() => {
              navigate("/business_offers");
            }, 1000);

          })
          .catch((error) => {
            // Handle submission error
            console.error("Error submitting form:", error);

            setTimeout(() => {
              Swal.fire({
                title: "Error",
                text: "Email already exists",
                icon: "error",
                timer: 1000
              });
            }, 1000);
          })
          .finally(() => {
            setSubmitting(false); // Set submitting to false after submission is done
          });
      }}
    >
      {formik => (

        <div className="container-signup">
          <div className="content-signup">
            <div className='title-password'>¿Eres viajero?</div>
            <div className='subtitle-password'>Rellena el formulario y empieza a disfrutar de ofertas exclusivas para nuestra comunidad!</div>

            <Form onSubmit={formik.handleSubmit}>
              <div className=" custom-input-password">
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                />
                <label
                  htmlFor="email"
                  className={formik.values.email ? 'input-label has-value' : 'input-label'}
                >
                  Correo electrónico</label>
                <ErrorMessage name="email" />
              </div>

              <div className=" custom-input-password">
                <div className="d-flex">
                  <label htmlFor="password"
                    className={formik.values.password ? 'input-label has-value' : 'input-label'}
                  >Contraseña</label>
                  <Field name="password" type={showPassword ? 'text' : 'password'} className="form-control" />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                <ErrorMessage name="password" />
              </div>


              <div className="custom-input-password">
                <div className="d-flex">
                  <label htmlFor="confirmPassword"
                    className={formik.values.confirmPassword ? 'input-label has-value' : 'input-label'}
                  >Confirmar Contraseña</label>

                  <Field
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-control"
                    onChange={(e) => {
                      formik.handleChange(e);
                      setPasswordsMatch(e.target.value === formik.values.password);
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                {passwordsMatch ? (
                  <>
                    <span>Las contraseñas coinciden.</span>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: '5px' }} />
                  </>
                ) : null}

                <ErrorMessage name="confirmPassword" />
              </div>


              <div className=" custom-input-password">
                <label htmlFor="username" className={formik.values.username ? 'input-label has-value' : 'input-label'}>Nombre de usuario</label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage name="username" />
              </div>

              <div className=" custom-input-password">
                <label htmlFor="firstname" className={formik.values.firstname ? 'input-label has-value' : 'input-label'}>Nombre</label>
                <Field name="firstname" type="text" className="form-control" />
                <ErrorMessage name="firstname" />
              </div>

              <div className=" custom-input-password">
                <label htmlFor="lastname" className={formik.values.lastname ? 'input-label has-value' : 'input-label'}>Apellido</label>
                <Field name="lastname" type="text" className="form-control" />
                <ErrorMessage name="lastname" />
              </div>

              <div className=" custom-input-password">
                <label htmlFor="passport" className={formik.values.passport ? 'input-label has-value' : 'input-label'}>Número de Pasaporte</label>
                <Field name="passport" type="text" className="form-control" />
                <ErrorMessage name="passport" />
              </div>

              <div className=" custom-input-password">
                <label htmlFor="address" className={formik.values.address ? 'input-label has-value' : 'input-label'}>Dirección</label>
                <Field name="address" type="text" className="form-control" />
                <ErrorMessage name="address" />
              </div>

              <div className="d-flex">

                <div className=" custom-input-signup-prefix">
                  <label htmlFor="phone_prefix" className={formik.values.phone_prefix ? 'input-label has-value' : 'input-label'}>Prefijo</label>
                  <Field name="phone_prefix" type="text" className="form-control" />
                </div>

                <div className=" custom-input-signup-phone">
                  <label htmlFor="phone_number" className={formik.values.phone_number ? 'input-label has-value' : 'input-label'}>Número de Teléfono</label>
                  <Field name="phone_number" type="text" className="form-control" />
                </div>

              </div>
              <div>

                <ErrorMessage name="phone_prefix" /> <br />
                <ErrorMessage name="phone_number" />
              </div>


              <div className=" custom-input-password" id="payment-radio" role="group" aria-labelledby="payment-radio">
                <label htmlFor="payment_method" className="form-label">Método de pago</label>
                <div>
                  <label>
                    <Field type="radio" name="payment_method" value="Paypal" className="form-check-input" />
                    Paypal
                  </label>
                  <label>
                    <Field type="radio" name="payment_method" value="GooglePay" className="form-check-input ms-4" />
                    Google Pay
                  </label>
                </div>
                <ErrorMessage name="payment_method" component="div" className="error-message" />
              </div>
              <div className="d-flex">
                <div className="me-2">
                  <Field type="checkbox" name="acceptTerms" />
                </div>
                <div>
                  <span> Acepto los
                    <Link to="/terms">
                      <strong> términos y condiciones</strong>
                    </Link>
                  </span>
                </div>


              </div>
              <ErrorMessage name="acceptTerms" />
              <button type="submit" className="btn btn-primary reset-button-signup mt-2">Crear mi cuenta</button>
              <button type="button" onClick={handleRedirect} className='back-button-signup mt-2'>Volver</button>

            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};


export default SignUpUser