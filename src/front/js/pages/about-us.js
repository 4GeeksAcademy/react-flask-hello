import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/about-us.css';

const AboutUs = () => {
    return (
        <div className="advertisements-container">
            <h1 className="advertisements-title">About Us: Our World of Books</h1>
            
            <section className="for-readers">
                <h2>A Unique Platform for Book Lovers</h2>
                <p>"Recommend Me a Book" emerged from a simple yet powerful realization: every book has a story waiting to be told, and every reader deserves to find their next great literary adventure. Here, reading transforms into a shared experience, enriched by community and driven by passion. We've created a space where books are not just read; they're lived, shared, and discussed, all propelled by a collective love for literature.</p>
            </section>
            
            <section className="for-authors">
                <h2>Our Mission: Beyond Reading</h2>
                <p>Our goal transcends merely providing book recommendations. We strive to cultivate a community where sharing a review starts a conversation, where following a critic means embarking on a literary journey. We aim to ensure every reader not only enjoys reading but also finds joy and value in sharing those moments with others. Here, your insights on a book could be the guiding light for another reader on their path to a great discovery.</p>
            </section>
            
            <section className="unique-features">
                <h2>What Sets Us Apart: Connecting Readers with Books</h2>
                <p>We offer a variety of tools designed to enrich your reading experience: from posting reviews to following your favorite critics, from saving your beloved books to discovering random recommendations. Each feature of our platform is conceived to create meaningful connections between books and readers, fostering a dynamic environment of literary discovery and discussion.</p>
            </section>
            
            <div className="join-us">
                <h2>Join Our Journey: Building the Future of Reading</h2>
                <p>Though "Recommend Me a Book" is just beginning its story, we add new pages full of possibilities every day. Our journey is only starting, but our vision is clear: to become the go-to gathering place for book lovers, where every book finds its reader, and every reader finds their community. We invite you to be part of this literary adventure, to read, share, and enjoy new books, contributing to a future where reading brings people together in ways never imagined before.</p>
            </div>
            
            <p className="final-call">Join us at "Recommend Me a Book" and start writing your own story in our world of books.</p>
        </div>
    );
};

export default AboutUs;
