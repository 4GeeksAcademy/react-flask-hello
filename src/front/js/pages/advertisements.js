import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/advertisements.css'; 
const Advertisements = () => {
    return (
        <div className="advertisements-container">
            <h1 className="advertisements-title">Discover a Literary Universe at "Recommend Me a Book"</h1>
            
            <p className="advertisements-intro">
                Are you among those who lose themselves in pages, eager to uncover their next literary adventure? Or perhaps you have a story to tell and seek willing ears to listen? At "Recommend Me a Book", we offer more than just books; we create connections, uncover stories, and share passions. This is the place where your love for reading transforms into a shared experience.
            </p>
            
            <section className="for-readers">
                <h2>For Avid Readers</h2>
                <p>
                    "Recommend Me a Book" is your compass in the vast literary ocean. With our personalized recommendations, you'll never be without a good read. Explore reviews written by like-minded individuals, save your favorite books, and follow recommenders who inspire you. Here, every book you discover has the potential to become your next favorite, and every opinion you share helps guide others.
                </p>
            </section>
            
            <section className="for-authors">
                <h2>For Authors and Publishers</h2>
                <p>
                    Our platform is the perfect stage for your works to shine. Connect with a passionate and receptive audience, receive valuable feedback, and watch your book become a topic of conversation. At "Recommend Me a Book", you're not just promoting your book; you're becoming part of a community that celebrates literature in all its forms.
                </p>
            </section>
            
            <section className="unique-features">
                <h2>Unique Features</h2>
                <ul>
                    <li>Enriching Interactions: Follow your favorite recommenders, exchange recommendations and messages to deepen your reading experience.</li>
                    <li>Recognition for Your Contribution: Outstanding recommenders receive badges and increased visibility, rewarding their passion and dedication.</li>
                    <li>Join Our Growing Community: Though "Recommend Me a Book" is in its early chapters, every new member adds value and depth to our collective story.</li>
                </ul>
            </section>
            
            <div className="join-us">
                <h2>Join "Recommend Me a Book" Today</h2>
                <p>
                    Whether you're searching for your next great read or you want your voice to be heard, "Recommend Me a Book" is your destination. Dive into a world where every page invites you to explore, share, and celebrate the magic of reading. Become part of our community today and start experiencing literature in an entirely new way.
                </p>
            </div>
        </div>
    );
};

export default Advertisements;
