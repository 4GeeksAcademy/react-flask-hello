import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../pages/Layout.jsx';
import HomeContact from '../assets/img/HomeContact.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

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
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

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
        if (!apiUrl) {
            console.error("La variable de entorno BACKEND_URL no está definida. Revisa tu archivo .env");
            dispatch({ type: 'CONTACT_SUBMIT_FAILURE', payload: { general: 'Error de configuración del cliente.' } });
            return;
        }
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
        <section className="header-contact-form w-100 position-relative d-flex align-items-center py-5 my-5">
            <img 
            src={HomeContact} 
            alt="CloudTech background image" 
            className="z-n1 position-absolute w-100 h-100 object-fit-cover" />

            <div className="position-absolute w-100 h-100 bg-dark bg-opacity-25 z-n1"></div>
                <div className="container w-100 h-100">
                    <div className="row align-items-center justify-content-center justify-content-lg-end">
                         <div className="col-12 col-lg-6 z-1 align-items-center">
                            <h1 className="display-4 fw-bolder text-warning mb-4 mt-4 text-lg-start text-center d-none d-lg-block">
                                Conectemos
                            </h1>

                            <h1 className="display-4 fw-bolder text-warning mb-4 mt-4 text-center d-lg-none">
                                Conectemos
                            </h1>

                            <p className="hero-subtitle-home fs-5 text-white fw-bold w-75 mb-4 d-none d-lg-block text-lg-start">
                                Tu proyecto es nuestro próximo reto.
                            </p>

                            <p className="hero-subtitle-home fs-5 text-white fw-bold w-75 mb-4 text-center d-lg-none">
                                Tu proyecto es nuestro próximo reto.
                            </p>

                            <form onSubmit={handleSubmit} noValidate className="text-start">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label fw-bold form-label-contact">
                                        Nombre Completo:
                                    </label>

                                    <input 
                                    type="text" 
                                    className={`form-control rounded-3 ${status === 'error' && error?.name ? 'is-invalid' : ''}`} 
                                    id="name" name="name" value={formData.name} onChange={handleChange} 
                                    placeholder="Tu nombre" 
                                    required 
                                    />
                                    {status === 'error' && error?.name && <div className="invalid-feedback fw-bold">{error.name}</div>}
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-sm-6">
                                        <label 
                                        htmlFor="phone"
                                        className="form-label fw-bold form-label-contact">
                                            Teléfono:
                                        </label>

                                        <input 
                                            type="tel" 
                                            className={`form-control rounded-3 ${status === 'error' && error?.phone ? 'is-invalid' : ''}`} 
                                            id="phone" name="phone" 
                                            value={formData.phone} 
                                            onChange={handleChange} 
                                            placeholder="Tu teléfono" required 
                                        />

                                        {status === 'error' && error?.phone && 
                                        <div className="invalid-feedback fw-bold">{error.phone}</div>}
                                    </div>

                                    <div className="col-sm-6 mt-3 mt-sm-0">
                                        <label htmlFor="email" className="form-label fw-bold form-label-contact">
                                            Email:
                                        </label>

                                        <input 
                                        type="email" 
                                        className={`form-control rounded-3 ${status === 'error' && error?.email ? 'is-invalid' : ''}`} 
                                        id="email" name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        placeholder="Tu correo" required 
                                        />

                                        {status === 'error' && error?.email && 
                                        <div className="invalid-feedback fw-bold">{error.email}</div>}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label 
                                        htmlFor="company" 
                                        className="form-label fw-bold form-label-contact">
                                            Nombre de tu proyecto:
                                    </label>

                                    <input 
                                        type="text" 
                                        className="form-control rounded-3" 
                                        id="company" name="company" 
                                        value={formData.company} 
                                        onChange={handleChange} 
                                        placeholder="Tu empresa" 
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label 
                                    htmlFor="message" 
                                    className="form-label fw-bold form-label-contact">
                                        Cuéntanos lo que necesitas:
                                    </label>
                                    
                                    <textarea 
                                    className="form-control textarea-contact rounded-3" 
                                    id="message" 
                                    name="message" 
                                    rows="4" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    placeholder="Tu mensaje">
                                    </textarea>
                                </div>
                            
                                {status === 'success' && 
                                <div className="alert alert-success">
                                    ¡Gracias! Tu mensaje ha sido enviado.
                                </div>}

                                {status === 'error' && error?.general && 
                                <div className="alert alert-danger">
                                    {error.general}
                                </div>}

                                
                                <div className="d-flex flex-column flex-lg-row gap-3">
                                    <button 
                                    type="submit" 
                                    className="btn btn-submit-contact fw-semibold btn-lg rounded-pill px-5" 
                                    disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? 'Enviando...' : 'Enviar'}
                                    </button>
                                    <a 
                                    href="https://wa.me/593978879838" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn btn-outline-yellow btn-lg rounded-pill px-5 w-100"
                                    >
                                        Cuéntanos tu idea <FontAwesomeIcon icon={faWhatsapp} />
                                    </a>
                                </div>
                            </form>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeaderContact