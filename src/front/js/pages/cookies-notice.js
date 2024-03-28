import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/cookies-notice.css';

const CookiesNotice = () => {
    return (
        <div className="advertisements-container">
            <h1 className="advertisements-title">"Recommend Me a Book" Cookie Notice</h1>

            <p className="advertisements-intro">At "Recommend Me a Book", we value your privacy and commit to being transparent about our use of cookies and similar technologies on our site. Cookies help us provide you with a more personalized and efficient experience. By using our site, you consent to our use of cookies in accordance with US privacy laws and the EU General Data Protection Regulation (GDPR).</p>

            <section className="for-readers">
                <h2>How We Use Cookies</h2>
                <p>We use cookies to:</p>
                <ul>
                    <li>Remember your preferences and settings, enhancing your browsing experience.</li>
                    <li>Analyze how you interact with our site, enabling us to improve and tailor our content to your needs.</li>
                    <li>Offer you personalized book recommendations, based on your interests and browsing history.</li>
                </ul>
            </section>

            <section className="for-authors">
                <h2>Your Privacy, Our Priority</h2>
                <p>We respect your right to privacy. You have the option to accept, reject, or customize your cookie consent at any time. However, please be aware that blocking certain cookies may impact your experience on our site.</p>
            </section>

            <div className="unique-features">
                <p>We adhere to the California Consumer Privacy Act (CCPA) and the EU General Data Protection Regulation (GDPR), granting you the right to access, correct, or delete any personal information we have collected about you.</p>
                <p>For more details on how we manage your data, including how we use cookies and your rights under US and EU laws, please see our Privacy Policy.</p>
            </div>

            <div className="join-us">
                <p>Questions?</p>
                <p>If you have questions about our use of cookies or how we protect your privacy, feel free to contact us.</p>
                <p>We appreciate your trust in "Recommend Me a Book". Together, let's create a safe and enriching space for all book lovers.</p>
            </div>
        </div>
    );
};

export default CookiesNotice;
