import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaFacebookF, FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";


export const Footer = ({ lang = 'es' }) => {
  useEffect(() => {
    AOS.init({ duration: 800 });
    AOS.refresh();
  }, []);

  const labels = {
    es: {
      brand: 'FiestaXperience',
      tagline: 'Vive la fiesta con los mejores eventos.',
      linksTitle: 'Enlaces',
      events: 'Próximos Eventos',
      gallery: 'Galería',
      contact: 'Contacto',
      faq: 'Preguntas Frecuentes',
      follow: 'Síguenos',
      subscribe: 'Suscríbete',
      placeholder: 'Tu correo electrónico',
      button: 'Enviar',
      rights: `© ${new Date().getFullYear()} FiestaXperience. Todos los derechos reservados.`
    },
    en: {
      brand: 'FiestaXperience',
      tagline: 'Experience the best party events.',
      linksTitle: 'Links',
      events: 'Upcoming Events',
      gallery: 'Gallery',
      contact: 'Contact',
      faq: 'FAQ',
      follow: 'Follow Us',
      subscribe: 'Subscribe',
      placeholder: 'Your email address',
      button: 'Submit',
      rights: `© ${new Date().getFullYear()} FiestaXperience. All rights reserved.`
    }
  };

  const t = labels[lang];

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-4" data-aos="fade-up">
            <h4 className="text-uppercase fw-bold text-primary">{t.brand}</h4>
            <p className="text-muted">{t.tagline}</p>
          </div>

          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
            <h5 className="text-uppercase">{t.linksTitle}</h5>
            <ul className="list-unstyled">
              <li><a href="/eventos" className="text-light text-decoration-none">{t.events}</a></li>
              <li><a href="/galeria" className="text-light text-decoration-none">{t.gallery}</a></li>
              <li><a href="/contacto" className="text-light text-decoration-none">{t.contact}</a></li>
              <li><a href="/faq" className="text-light text-decoration-none">{t.faq}</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
            <h5 className="text-uppercase">{t.follow}</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 fs-5 mt-2">
              <a href="https://facebook.com" className="text-light"><FaFacebookF /></a>
              <a href="https://instagram.com" className="text-light"><FaInstagram /></a>
              <a href="https://tiktok.com" className="text-light"><FaTiktok /></a>
              <a href="mailto:info@fiestaxperience.com" className="text-light"><FaEnvelope /></a>
            </div>

          </div>

        <hr className="border-secondary" />

        <div className="text-center text-muted small">
          {t.rights}
        </div>
      </div>
      </div>
    </footer>
  );
};
