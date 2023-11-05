import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ImagePreview from './ImagePreview.jsx';
import Draggable from 'react-draggable';
import Swal from 'sweetalert2';


const ReviewsDoubleModal = ({ offerId }) => {

    const { store, actions } = useContext(Context);
    const [selectedFile, setSelectedFile] = useState(null);


    useEffect(() => {
        actions.getAllTrips();
        // console.log("Fetch for all trips is working")
    }, []);




    return (
        <Formik
            initialValues={{
                country: "",
                city: "",
                title: "",
                comment_text: "",
                review_image: "",
            }}
            validationSchema={Yup.object({
                // country: Yup.string()
                //     // .min(2, 'Debe tener 2 caracteres o más')
                //     .required('Campo obligatorio!'),
                // city: Yup.string()
                //     // .min(2, 'Debe tener 2 caracteres o más')
                //     .required('Campo obligatorio!'),
                title: Yup.string()
                    .min(10, 'Debe tener 10 caracteres o más')
                    .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s-:() ]*$/, 'Debe comenzar con una letra mayúscula')
                    .required('Campo obligatorio!'),
                comment_text: Yup.string()
                    .min(50, 'Debe tener 50 caracteres o más')
                    .matches(/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚáéíóúÑñ0-9,.*!¡?¿\s-:() ]*$/, 'Debe comenzar con una letra mayúscula')
                    .required('Campo obligatorio!'),
                review_image: Yup.mixed()
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

                    await actions.create_review({ ...values, review_image: imgUrl, offer_id: offerId });


                    //console.log("Form submitted successfully!");
                    Swal.fire({
                        title: "Reseña publicada",
                        text: "Tu reseña se publicó correctamente",
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

                    <Draggable>
                        <button className="btn btn-primary floating-button" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">
                            Publica tu reseña
                        </button>
                    </Draggable>


                    <Form className="form-review-content" onSubmit={formik.handleSubmit}>


                        {/* Primer Modal */}

                        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content content-signup">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalToggleLabel">Rellena el formulario para publicar tu reseña:</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <div className="modal-body">
                                        <div>
                                            {/* <div >
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
                                            </div> */}

                                        </div>
                                        <div className="custom-input-password mt-4">
                                            <label htmlFor="title" className={formik.values.title ? 'input-label has-value' : 'input-label'}>Título:</label>
                                            <Field type="text" name="title" value={formik.values.title} />
                                            <ErrorMessage name='title' />
                                        </div>
                                        <div className="custom-input-password">
                                            <label htmlFor="comment_text" className={formik.values.comment_text ? 'input-label has-value' : 'input-label'}>Comentario:</label>
                                            <Field
                                                as="textarea"
                                                name="comment_text"
                                                className={formik.values.comment_text ? 'expanding-textarea' : 'expanding-textarea input-placeholder'}
                                                rows={4}
                                                cols={40}
                                            />
                                            <ErrorMessage name='comment_text' />
                                        </div>

                                        <div className='modal-footer'>
                                            <button type="button" className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" >Siguiente</button>
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
                                        <h5 className="modal-title" id="exampleModalToggleLabel2">Sube tus fotografias para publicar tu reseña:</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body ">
                                        <div>
                                            <label htmlFor="review_image">Publica tu foto aquí:</label>
                                            <input
                                                type="file"
                                                name="review_image"
                                                onChange={(event) => {
                                                    const selectedFile = event.target.files[0];
                                                    setSelectedFile(selectedFile);
                                                    formik.setFieldValue("review_image", selectedFile);
                                                }}
                                            />
                                            <ErrorMessage name="review_image" />
                                            {selectedFile && <ImagePreview file={selectedFile} />}
                                        </div>
                                        <div className='modal-footer'>
                                            <button type="button" className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Volver al formulario anterior</button>
                                            <button className='btn btn-primary btn-signup' type="submit">Publicar mi reseña</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form >
                </div >
            )}
        </Formik >
    );
}

export default ReviewsDoubleModal;