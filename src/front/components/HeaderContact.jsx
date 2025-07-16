import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../pages/Layout.jsx';
import { BackendURL } from './BackendURL.jsx';
import HomeContact from '../assets/img/HomeContact.jpg';

const HeaderContact = () => {

    const {store, dispatch} = useContext(AppContext);

    const [formData, setFormData] = useState ({
        name: '',
        phone: '',
        email: '',
        company: '',
        message: ''
    });

    const { status, error } = store.contactForm;
    const apiUrl = BackendURL();

    useEffect(() => {
        if (status === 'success') {
            setFormData({ name: '', phone: '', email: '', company: '', message: '' });
        }
    }, [status]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (status === 'success' || status === 'error') {
            dispatch({ type: 'CONTACT_RESET_STATUS' });
        }
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'CONTACT_SUBMIT_START' });
        try {
            const response = await fetch(`${apiUrl}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (!response.ok) {
                dispatch({ type: 'CONTACT_SUBMIT_FAILURE', payload: result.errors || { general: result.message } });
                return;
            }
            dispatch({ type: 'CONTACT_SUBMIT_SUCCESS' });
        } catch (networkError) {
            dispatch({ type: 'CONTACT_SUBMIT_FAILURE', payload: { general: 'No se pudo conectar al servidor.' } });
        }
    };

    return (
        <section className="w-100 h-100 mb-5 mt-5 position-relative">
            <img src={HomeContact} alt="CloudTech background image" className="z-n1 mx-auto position-absolute mt-5 w-100 h-100 object-fit-cover d-sm-block" />
            {/* <div className="position-absolute w-100 h-100 bg-dark bg-opacity-50 mx-auto mt-5"></div> */}
                <div className="container w-100 h-100">
                    <div className="row align-items-center justify-content-center justify-content-lg-end">
                        <div className="col-11 col-md-8 col-lg-6 z-1 text-center"></div>
                            <h1 className="display-4 fw-bolder text-warning mb-4">
                                Conectemos
                            </h1>

                            <form onSubmit={handleSubmit} noValidate className="text-start">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label fw-bold form-label-contact">Nombre Completo:</label>
                                    <input 
                                        type="text"
                                        className={`form-control rounded-pill ${status === 'error' && error?.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Tu nombre" 
                                        required
                                    />
                                    {status === 'error' && error?.name && 
                                    <div className="invalid-feedback fw-bold">{error.name}</div>}
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <label htmlFor="phone" className="form-label fw-bold form-label-contact">Teléfono:</label>
                                        <input type="tel" className={`form-control rounded-pill ${status === 'error' && error?.phone ? 'is-invalid' : ''}`} id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Tu teléfono" required />
                                        {status === 'error' && error?.phone && <div className="invalid-feedback fw-bold">{error.phone}</div>}
                                    </div>
                                    <div className="col-sm-6 mt-3 mt-sm-0">
                                        <label htmlFor="email" className="form-label fw-bold form-label-contact">Email:</label>
                                        <input type="email" className={`form-control rounded-pill ${status === 'error' && error?.email ? 'is-invalid' : ''}`} id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Tu correo" required />
                                        {status === 'error' && error?.email && <div className="invalid-feedback fw-bold">{error.email}</div>}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="company" className="form-label fw-bold form-label-contact">Nombre de tu empresa:</label>
                                    <input type="text" className="form-control rounded-pill" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Tu empresa" />
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="message" className="form-label fw-bold form-label-contact">Cuéntanos lo que necesitas:</label>
                                    <textarea className="form-control textarea-contact" id="message" name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Tu mensaje"></textarea>
                                </div>
                            
                                    {status === 'success' && <div className="alert alert-success">¡Gracias! Tu mensaje ha sido enviado.</div>}
                                    {status === 'error' && error?.general && <div className="alert alert-danger">{error.general}</div>}

                                {/* 4. Contenedor de botones vertical por defecto */}
                                <div className="d-grid gap-3">
                                    <button type="submit" className="btn btn-submit-contact btn-lg rounded-pill px-5" disabled={status === 'loading'}>
                                        {status === 'loading' ? 'Enviando...' : 'Enviar'}
                                    </button>
                                    <a href="https://wa.me/593978879838" target="_blank" rel="noopener noreferrer" className="btn btn-outline-yellow btn-lg rounded-pill px-5">
                                        Cuéntanos tu idea <i className="bi bi-whatsapp ms-2"></i>
                                    </a>
                                </div>
                            </form>
                    </div>
                </div>
        </section>
    );
};

export default HeaderContact