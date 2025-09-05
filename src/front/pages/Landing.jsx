import React, { useEffect } from "react"

export const Landing = () => {

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Landing Page</h1>

        </div>
    );
};



// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <title>E-Venture Landing Page</title>
//     <link rel="stylesheet" href="styles.css" />
//   </head>
//   <body>
//     <!-- Navbar -->
//     <nav class="navbar">
//       <div class="logo">E-Venture</div>
//       <div class="nav-links">
//         <a href="#home">Home</a>
//         <a href="#features">Features</a>
//         <a href="#events">Events</a>
//         <a href="#why">Why E-Venture</a>
//         <a href="/signup.html" class="signup">Sign Up</a>
//       </div>
//     </nav>

//     <!-- Hero Section -->
//     <section class="hero" id="home">
//       <video autoplay loop muted class="hero-video">
//         <source
//           src="https://assets.mixkit.co/videos/348/348-720.mp4"
//           type="video/mp4"
//         />
//       </video>
//       <div class="hero-overlay">
//         <h1>Where Every Event Becomes a Story</h1>
//         <p>Plan, share, and remember your events.</p>
//         <div class="cta-buttons">
//           <a href="/signup.html" class="btn btn-primary">Get Started</a>
//           <a href="#features" class="btn btn-secondary">See How It Works</a>
//         </div>
//       </div>
//     </section>

//     <!-- Features Section -->
//     <section class="features" id="features">
//       <h2>Features</h2>
//       <div class="features-grid">
//         <div class="feature-card">
//           <span class="feature-icon">📅</span>
//           <h3>My Events</h3>
//           <p>Create, view, and manage events.</p>
//         </div>
//         <div class="feature-card">
//           <span class="feature-icon">🗳️</span>
//           <h3>RSVP & Polling</h3>
//           <p>Let guests RSVP and vote on event options.</p>
//         </div>
//         <div class="feature-card">
//           <span class="feature-icon">⭐</span>
//           <h3>Favorites</h3>
//           <p>Save your favorite events and people.</p>
//         </div>
//         <div class="feature-card">
//           <span class="feature-icon">🔔</span>
//           <h3>Notifications</h3>
//           <p>Stay updated with event changes.</p>
//         </div>
//         <div class="feature-card">
//           <span class="feature-icon">👤</span>
//           <h3>Profile</h3>
//           <p>Customize your experience.</p>
//         </div>
//       </div>
//     </section>

//     <!-- Upcoming Events Section (cards only, no carousel) -->
//     <section class="events" id="events">
//       <h2>Upcoming Events</h2>
//       <div class="events-list" id="events-list">
//         <!-- Event cards will be injected here by JS -->
//       </div>
//     </section>

//     <script>
//       const apiUrl = "http://localhost:3001/api/events";

//       function createEventCard(event) {
//         return `
//           <div class="event-card">
//             <span class="event-icon">${event.icon || "🎉"}</span>
//             <h4>${event.title}</h4>
//             <p>${event.date} • ${event.rsvp || "?"} RSVPs</p>
//             ${
//               event.location
//                 ? `<p><span class="event-location">📍 ${event.location}</span></p>`
//                 : ""
//             }
//           </div>
//         `;
//       }

//       function fetchCustomEvents() {
//         return fetch(apiUrl)
//           .then((res) => res.json())
//           .catch(() => []);
//       }

//       function renderEvents(allEvents) {
//         const list = document.getElementById("events-list");
//         if (!allEvents.length) {
//           list.innerHTML = "<div class='event-card'>No events found.</div>";
//           return;
//         }
//         list.innerHTML = allEvents.map(createEventCard).join("");
//       }

//       function loadEvents() {
//         fetchCustomEvents().then(renderEvents);
//       }
//       loadEvents();
//     </script>

//     <!-- Why E-Venture Section -->
//     <section class="why" id="why">
//       <h2>Why E-Venture?</h2>
//       <div class="why-panels">
//         <div class="why-panel">
//           <span class="why-icon">⚡</span>
//           <h3>Simple & Fast</h3>
//           <p>Easy event planning.</p>
//         </div>
//         <div class="why-panel">
//           <span class="why-icon">🌐</span>
//           <h3>Stay Connected</h3>
//           <p>RSVP, follow, and interact.</p>
//         </div>
//         <div class="why-panel">
//           <span class="why-icon">📸</span>
//           <h3>Memories That Last</h3>
//           <p>Capture and revisit your events.</p>
//         </div>
//       </div>
//     </section>

//     <!-- CTA Section -->
//     <section class="cta">
//       <h2>Ready to start your next adventure?</h2>
//       <a href="/signup.html" class="btn btn-primary cta-btn">Sign Up Free</a>
//     </section>

//     <!-- Footer -->
//     <footer class="footer">
//       <div class="footer-links">
//         <a href="/about.html">About</a>
//         <a href="/contact.html">Contact</a>
//         <a href="/terms.html">Terms</a>
//         <a href="/privacy.html">Privacy</a>
//       </div>
//       <p>© 2025 E-Venture. All Rights Reserved.</p>
//     </footer>

//     <audio
//       id="bg-music"
//       src="background-music.mp3"
//       autoplay
//       loop
//       style="display: none"
//     ></audio>
//     <script src="carousel.js"></script>
//   </body>
// </html>
