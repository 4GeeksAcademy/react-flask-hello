import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../pages/Layout.jsx';
import HomeContact from '../assets/img/HomeContact.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';

const HeaderContact = () => {
    const { t } = useTranslation();
    const { store, dispatch } = useContext(AppContext);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        message: ''
    });

    const { status, error } = store.contactForm;
    const apiUrl = "";

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
        <>
            <section className="header w-100 h-100 position-relative ">
                <img
                    src={HomeContact}
                    alt="CloudTech background image"
                    className="z-n1 mx-auto position-absolute w-100 h-100 object-fit-cover d-sm-block mb-5" />

                <div className="position-absolute w-100 h-100 bg-dark bg-opacity-50 mx-auto"></div>
                <div className="container w-100 h-100 py-2">
                    <div className="row align-items-center justify-content-center justify-content-lg-end mb-5">
                        <div className="col-12 col-lg-6 z-1 align-items-center pt-5 mt-5 pt-lg-0 mt-lg-3">
                            <h1 className="hero-title-home display-4 fw-bolder w-100 mt-2 text-lg-center text-center d-none d-lg-block">
                                {t('contact.sectionTitle')}
                            </h1>

                            <h1 className="hero-title-home display-4 fw-bolder w-100 mt-5 text-center d-lg-none">
                                {t('contact.sectionTitle')}
                            </h1>

                            <p className="hero-subtitle-home fs-5 text-white fw-bold w-100 mb-4 d-none d-lg-block text-lg-center">
                                {t('contact.sectionDescription')}
                            </p>

                            <p className="hero-subtitle-home fs-5 text-white fw-bold w-100 mb-4 text-center d-lg-none">
                                {t('contact.sectionDescription')}
                            </p>

                            <form onSubmit={handleSubmit} noValidate className="text-start">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label fw-bold form-label-contact">
                                        {t('contact.labels.nameLabel')}
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control rounded-3 ${status === 'error' && error?.name ? 'is-invalid' : ''}`}
                                        id="name" name="name" value={formData.name} onChange={handleChange}
                                        placeholder={t('contact.placeholders.nameHolder')}
                                        required
                                    />
                                    {status === 'error' && error?.name && <div className="invalid-feedback fw-bold">{error.name}</div>}
                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label
                                            htmlFor="phone"
                                            className="form-label fw-bold form-label-contact">
                                            {t('contact.labels.phoneLabel')}
                                        </label>

                                        <input
                                            type="tel"
                                            className={`form-control rounded-3 ${status === 'error' && error?.phone ? 'is-invalid' : ''}`}
                                            id="phone" name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder={t('contact.placeholders.phoneHolder')}
                                            required
                                        />

                                        {status === 'error' && error?.phone &&
                                            <div className="invalid-feedback fw-bold">{error.phone}</div>}
                                    </div>

                                    <div className="col-6">
                                        <label htmlFor="email" className="form-label fw-bold form-label-contact">
                                            {t('contact.labels.emailLabel')}
                                        </label>

                                        <input
                                            type="email"
                                            className={`form-control rounded-3 ${status === 'error' && error?.email ? 'is-invalid' : ''}`}
                                            id="email" name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={t('contact.placeholders.emailHolder')}
                                            required
                                        />

                                        {status === 'error' && error?.email &&
                                            <div className="invalid-feedback fw-bold">{error.email}</div>}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="company"
                                        className="form-label fw-bold form-label-contact">
                                        {t('contact.labels.projectNameLabel')}
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        id="company" name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder={t('contact.placeholders.projectHolder')}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="message"
                                        className="form-label fw-bold form-label-contact">
                                        {t('contact.labels.messageLabel')}
                                    </label>

                                    <textarea
                                        className="form-control textarea-contact rounded-3"
                                        id="message"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t('contact.placeholders.messageHolder')}
                                    >
                                    </textarea>
                                </div>

                                {status === 'success' &&
                                    <div className="alert alert-success">
                                        {t('contact.alerts.alertSuccess')}
                                    </div>}

                                {status === 'error' && error?.general &&
                                    <div className="alert alert-danger">
                                        {t('contact.alerts.alertError')}
                                    </div>}


                                <div className="d-flex flex-column flex-lg-row gap-3">
                                    <button
                                        type="submit"
                                        className="btn btn-submit-contact fw-semibold btn-lg rounded-pill px-5"
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? `${t('contact.alerts.loading')}` : `${t('contact.formButton')}`}
                                    </button>
                                    <a
                                        href="https://wa.me/593978879838"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline btn-lg rounded-pill px-5 w-100"
                                    >
                                        {t('contact.whatsAppButton')} <FontAwesomeIcon icon={faWhatsapp} />
                                    </a>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
            <div className="h-100 mb-4">
                <br />
            </div>
        </>
    );
};

export default HeaderContact
