import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/contact.css';

const Contact = () => {
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(contactInfo);
        alert('Message sent. We will contact you soon.');
        setContactInfo({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={contactInfo.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={contactInfo.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea className="form-control" id="message" name="message" rows="5" value={contactInfo.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-magic">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;
