import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ImagePreview from './ImagePreview.jsx';
import Draggable from 'react-draggable';
import Swal from 'sweetalert2';


const OffersDoubleModal = () => {
    const { store, actions } = useContext(Context);
    const [selectedFile, setSelectedFile] = useState(null);


    useEffect(() => {
        actions.getAllTrips();
        // console.log("Fetch for all trips is working")
    }, []);

    return (

        <Formik
            initialValues={{
                offer_title: "",
                offer_little_description: "",
                offer_description: "",
                country: "",
                city: "",
                normal_user_price: "",
                premium_user_price: "",
                offer_image: "",
            }}
            validationSchema={Yup.object({
                offer_title: Yup.string()
                    .min(10, 'Debe tener 10 caracteres o más')
                    .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s-:() ]*$/, 'Debe comenzar con una letra mayúscula')
                    .required('Campo obligatorio!'),
                offer_little_description: Yup.string()
                    .min(10, 'Debe tener 10 caracteres o más')
                    .max(70, 'Máximo 100 carácteres. Intenta resumir al máximo la esencia de la oferta ')
                    .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s-:() ]*$/, 'Debe comenzar con una letra mayúscula')
                    .required('Campo obligatorio!'),
                offer_description: Yup.string()
                    .min(50, 'Debe tener 50 caracteres o más')
                    .max(3000, 'Máximo 3000 carácteres')
                    .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s-:() ]*$/, 'Debe comenzar con una letra mayúscula')
                    .required('Campo obligatorio!'),
                country: Yup.string()
                    // .min(2, 'Debe tener 2 caracteres o más')
                    .required('Campo obligatorio!'),
                city: Yup.string()
                    // .min(2, 'Debe tener 2 caracteres o más')
                    .required('Campo obligatorio!'),
                normal_user_price: Yup.number()
                    .min(2, 'Debe tener al menos 2 dígitos')
                    .required('Campo obligatorio!')
                    .integer('Debe ser un número entero')
                    .typeError('Debe ser un número'),
                premium_user_price: Yup.number()
                    .min(2, 'Debe tener al menos 2 dígitos')
                    .required('Campo obligatorio!')
                    .integer('Debe ser un número entero')
                    .typeError('Debe ser un número'),
                offer_image: Yup.mixed()
                    .required('Debes seleccionar al menos una imagen!')
                    .test("FILE_SIZE", "El tamaño de la imagen es demasiado grande!", value => value && value.size < 400 * 400)
                    .test("FILE_TYPE", "Formato inválido", value => value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
            })}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
                setSubmitting(true);

                try {
                    const formData = new FormData();
                    formData.append("file", selectedFile);
                    formData.append("cloud_name", "albertge");
                    formData.append("upload_preset", "trip_nexus_upload_preset");

                    const response = await axios.post(
                        "https://api.cloudinary.com/v1_1/albertge/image/upload",
                        formData
                    );

                    const imgUrl = response.data.url;

                    await actions.createOffer({ ...values, offer_image: imgUrl });


                    //console.log("Form submitted successfully!");
                    Swal.fire({
                        title: "¡Oferta publicada!",
                        text: "Tu oferta se publicó correctamente",
                        icon: "success",
                        timer: 1000
                    });

                    setStatus({ success: true });
                    setSelectedFile(null);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                } catch (error) {
                    console.error("Error submitting form:", error);
                    setStatus({ error: true });

                    setTimeout(() => {
                        Swal.fire({
                            title: "Error",
                            text: "Algo salió mal.",
                            icon: "error",
                            timer: 1000
                        });
                    }, 1000);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {formik => (
                <div>
                    <div>
                        <Draggable>
                            <button type="button" className="btn floating-button" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">
                                Publica tu oferta
                            </button>
                        </Draggable>


                        <Form onSubmit={formik.handleSubmit}>


                            {/* Primer Modal */}
                            <div className="modal fade " id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content content-signup">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalToggleLabel">Rellena el formulario para publicar tu oferta:</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div>
                                                <div >
                                                    <div className='custom-input-password'>
                                                        <label htmlFor="country" >País:</label><br />
                                                        <Field as="select" name="country">
                                                            <option value="" label="Selecciona un país" />
                                                            {store.trip && store.trip.length >= 1 && store.trip?.map((country) => (
                                                                <option key={country?.id} value={country?.country}>
                                                                    {country?.country}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>

                                                    <ErrorMessage name="country" />

                                                    <div>
                                                        <label htmlFor="city" >Ciudad:</label><br />
                                                        <Field as="select" name="city">
                                                            <option value="" label="Selecciona una ciudad" />
                                                            {store.trip && store.trip.length >= 1 && store.trip.map((city) => (
                                                                city.country === formik.values.country && (

                                                                    <React.Fragment key={`${city.country}-${city.city}`}>
                                                                        <option value={city?.city}>

                                                                            {city?.city}
                                                                        </option>
                                                                        <option value={city?.city2}>
                                                                            {city?.city2}
                                                                        </option>
                                                                        <option value={city?.city3}>
                                                                            {city?.city3}
                                                                        </option>
                                                                        <option value={city?.city4}>
                                                                            {city?.city4}
                                                                        </option>
                                                                    </React.Fragment>
                                                                )
                                                            ))}
                                                        </Field>


                                                    </div>
                                                    <ErrorMessage name="city" />
                                                </div>
                                            </div>

                                            <div className='custom-input-password mt-4'>
                                                <label htmlFor="offer_title" className={formik.values.offer_title ? 'input-label has-value' : 'input-label'}>Título:</label>
                                                <Field type="text" name="offer_title" />
                                                <ErrorMessage name="offer_title" />
                                            </div>
                                            <div className='custom-input-password'>
                                                <label htmlFor="offer_little_description" className={formik.values.offer_little_description ? 'input-label has-value' : 'input-label'}>Escribe una breve descripción de tu oferta:</label>
                                                <Field
                                                    as="textarea"
                                                    name="offer_little_description"
                                                    className={formik.values.offer_little_description ? 'expanding-textarea' : 'expanding-textarea input-placeholder'}
                                                />
                                                <ErrorMessage name="offer_little_description" />
                                            </div>

                                            <div className='custom-input-password'>
                                                <label htmlFor="offer_description" className={formik.values.offer_description ? 'input-label has-value' : 'input-label'}>
                                                    Escribe la información detallada de la oferta:</label>
                                                <Field
                                                    as="textarea"
                                                    name="offer_description"
                                                    className={formik.values.offer_description ? 'expanding-textarea' : 'expanding-textarea input-placeholder'}
                                                />
                                                <ErrorMessage style={{ color: 'red' }} name="offer_description" />
                                            </div>


                                            <div className='custom-input-password'>
                                                <label htmlFor="normal_user_price" className={formik.values.normal_user_price ? 'input-label has-value' : 'input-label'}>Precio para Usuario:</label>
                                                <Field type="number" name="normal_user_price" />
                                                <ErrorMessage name="normal_user_price" />
                                            </div>
                                            <div className='custom-input-password'>
                                                <label htmlFor="premium_user_price" className={formik.values.premium_user_price ? 'input-label has-value' : 'input-label'}>Precio para Usuario Premium:</label>
                                                <Field type="number" name="premium_user_price" />
                                                <ErrorMessage name="premium_user_price" />
                                            </div>
                                            <div className='modal-footer'>
                                                <button type='button' className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" >Siguiente</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Segundo Modal */}
                            <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content content-signup">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalToggleLabel2">Sube tus fotografias para publicar tu oferta:</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">

                                            <div>
                                                <label htmlFor="offer_image">Publica tu foto aquí:</label>
                                                <input
                                                    type="file"
                                                    name="offer_image"
                                                    onChange={(event) => {
                                                        const selectedFile = event.target.files[0];
                                                        setSelectedFile(selectedFile);
                                                        formik.setFieldValue("offer_image", selectedFile);
                                                    }}
                                                />
                                                <ErrorMessage name="offer_image" />
                                                {selectedFile && <ImagePreview file={selectedFile} />}
                                            </div>
                                            <div className='modal-footer'>
                                                <button type="button" className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" >Volver al formulario anterior</button>
                                                <button type="submit" className="btn btn-primary btn-signup">
                                                    Publicar mi oferta
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div>
                    </div>
                </div>
            )
            }
        </Formik >
    );
};

export default OffersDoubleModal;