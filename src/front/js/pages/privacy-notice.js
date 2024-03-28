import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/privacy-notice.css';

const PrivacyNotice = () => {
  return (
    <div className="advertisements-container">
      <h1 className="advertisements-title">Recommend Me a Book Privacy Notice</h1>

      <p className="advertisements-intro">Contact: For inquiries, comments, or requests related to privacy, please contact us via support@rmb.com or call +52558745xxxx.</p>

      <section className="for-readers">
        <h2>1. Information Collected:</h2>
        <p>We collect personal data such as your name, email, phone number, date of birth, and country of origin. Additionally, through cookies, we gather information about your browsing habits and preferences on our website.</p>
      </section>

      <section className="for-authors">
        <h2>2. Use of Information:</h2>
        <ul>
          <li>Provide you with personalized book recommendations based on your interests and reading habits.</li>
          <li>Send marketing communications, provided you have given your explicit consent.</li>
          <li>Enhance the functionality and security of our website by analyzing user interactions with our platform.</li>
        </ul>
      </section>

      <section className="unique-features">
        <h2>3. Legal Basis for Processing:</h2>
        <ul>
          <li>Your explicit consent, given by using our website and accepting our Cookie Policy and this Privacy Notice.</li>
          <li>The need to execute a contract with you, should you make purchases or subscribe to specific services.</li>
        </ul>
      </section>

      <section className="join-us">
        <h2>4. Data Protection Agreement:</h2>
        <p>We establish an agreement with you detailing our responsibilities and your rights concerning the collection, use, and protection of your personal data. This agreement strictly complies with the data protection laws of the United States and the European Union, ensuring the security and privacy of your information.</p>
      </section>

      {/* Agregar el resto de las secciones siguiendo el mismo patrón */}

    </div>
  );
};

export default PrivacyNotice;
