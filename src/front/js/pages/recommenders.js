import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/recommenders.css';

const Recommenders = () => {
  return (
    <div className="advertisements-container">
      <h1 className="advertisements-title">Who Are the Recommenders?</h1>

      <p className="advertisements-intro">At "Recommend Me a Book," our community breathes life into every page. Here, the spotlight shines on you, the reader. Every user of our platform holds the prestigious title of Recommender, a testament to our belief that every reader has insights worth sharing.</p>

      <section className="for-readers">
        <h2>For Avid Readers</h2>
        <p>Stepping into the role of a Recommender is as simple as signing up. Once you're part of our community, your journey from a book lover to a guiding light for fellow readers begins. Your reviews, your votes, and your recommendations not only enrich our community but also help shape the reading journey of others.</p>
      </section>

      <section className="for-authors">
        <h2>Your Contribution Makes Us Unique</h2>
        <p>Recommenders are the backbone of our platform. By sharing exclusive reviews, curating personalized recommendation lists, and engaging in direct interactions, you transform a solitary reading experience into a shared adventure. The more your reviews resonate with the community, garnering positive votes, the brighter your star shines, increasing your visibility and influence.</p>
      </section>

      <section className="unique-features">
        <h2>Interact, Follow, Recommend</h2>
        <p>Interaction is the heart of our community. Follow your favorite recommenders, exchange recommendations, or send a message to kindle a conversation. Our platform is designed to foster connections, allowing you to dive deeper into the world of books with like-minded enthusiasts.</p>
      </section>

      <div className="join-us">
        <h2>Rewards and Recognition</h2>
        <p>Excellence does not go unnoticed. Top recommenders earn badges and enjoy increased visibility, celebrating their contributions and influence within the community. These badges are symbols of trust, quality, and engagement, marking you as a beacon for others to follow.</p>
        <p>We're Just Getting Started. As we turn the pages of our own story, we invite you to write yours with us. "Recommend Me a Book" is a canvas waiting for your brushstrokes.</p>
        <p>Unleash Your Creativity. We encourage you to dive in, explore, and let your unique voice be heard. Your recommendations could be the key that unlocks a new world for someone out there. Join us in making every read count.</p>
      </div>
    </div>
  );
};

export default Recommenders;
