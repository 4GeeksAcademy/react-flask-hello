import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../assets/styles/landing.css";

// IMPORTACIÓN DIRECTA DE LOGOS
import amazon from "../assets/styles/images/Landing_images/Amazon.png";
import facebook from "../assets/styles/images/Landing_images/facebook-logo-white-full-transparent.png";
import headspace from "../assets/styles/images/Landing_images/Headspace.webp";
import twilio from "../assets/styles/images/Landing_images/Twilio.png";
import verizon from "../assets/styles/images/Landing_images/Verizon.png";

// IMÁGENES PARA LOS TABS
import missionsImg from "/workspaces/Proyecto_Final_4Geeks_DavidFarewell/src/front/assets/styles/images/Landing_images/waves_2k_upscaled.jpg";
import progressImg from "/workspaces/Proyecto_Final_4Geeks_DavidFarewell/src/front/assets/styles/images/Landing_images/waves_2k_upscaled.jpg";
import resourcesImg from "/workspaces/Proyecto_Final_4Geeks_DavidFarewell/src/front/assets/styles/images/Landing_images/waves_2k_upscaled.jpg";
import achievementsImg from "/workspaces/Proyecto_Final_4Geeks_DavidFarewell/src/front/assets/styles/images/Landing_images/waves_2k_upscaled.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const reviews = [
  { name: "Lou Logico - Humorist", img: "/assets/img/user1.png" },
  { name: "Jean Pierre - Front-End Dev", img: "/assets/img/user2.png" },
  { name: "Jagger Meister - Boxer", img: "/assets/img/user3.png" },
  { name: "Jonas Jimbo - Singer", img: "/assets/img/user4.png" },
  { name: "Javy Kardashian - Nurse", img: "/assets/img/user5.png" },
  { name: "Juan Albertillo - Trucker", img: "/assets/img/user6.png" },
];

const tripledReviews = [...reviews, ...reviews, ...reviews];
const quintupledReviews = [...reviews, ...reviews, ...reviews, ...reviews, ...reviews];

const subscriptions = [
  {
    plan: "Beginner",
    price: "FREE",
    features: [
      "Two requests at time",
      "One/day delivery",
      "Unlimited AI assets",
      "Private Trello board",
    ],
    button: "Start for free",
  },
  {
    plan: "Plus",
    price: "4,99€",
    features: [
      "Two requests at time",
      "One/day delivery",
      "Unlimited AI assets",
      "Private Trello board",
    ],
    button: "Pay for Plus",
  },
  {
    plan: "Pro",
    price: "12,99€",
    features: [
      "Two requests at time",
      "One/day delivery",
      "Unlimited AI assets",
      "Private Trello board",
    ],
    button: "Pay for Pro",
  },
];

const brands = [amazon, facebook, headspace, twilio, verizon];

const repeatedBrands = Array(10).fill(brands).flat();

const Landing = () => {
  const [activeTab, setActiveTab] = useState("MISSIONS");
  const navigate = useNavigate();

  const handleNavigateRegister = () => {
    navigate("/register");
  };

  const getImageByTab = () => {
    switch (activeTab) {
      case "MISSIONS":
        return missionsImg;
      case "PROGRESS":
        return progressImg;
      case "RESOURCES":
        return resourcesImg;
      case "ACHIEVEMENTS":
        return achievementsImg;
      default:
        return missionsImg;
    }
  };

  return (
    <div className="landing-container">
      <Navbar />

      {/* HERO SECTION */}
      <section className="section hero" id="hero">
        <motion.h1 variants={fadeInUp} initial="hidden" whileInView="visible">
          Achieve your goals and <br /> <span>LEVEL UP</span>
        </motion.h1>
        <motion.p variants={fadeInUp} initial="hidden" whileInView="visible">
          Level Up is your companion on the journey to a healthier, more balanced life.
          Through personalized missions and challenges, you'll improve your physical and mental well-being.
        </motion.p>
        <motion.button
          className="cta-button"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          onClick={handleNavigateRegister}
        >
          Start your journey
        </motion.button>
      </section>

      {/* BRANDS CAROUSEL */}
      <div className="brand-carousel">
        <div className="brand-track">
          {repeatedBrands.map((img, index) => (
            <img key={index} src={img} alt={`brand-${index}`} className="brand-logo" />
          ))}
        </div>
      </div>

      {/* UNLOCK SECTION */}
      <section className="section unlock" id="unlock">
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible">
          Unlock True Balance
        </motion.h2>
        <div className="unlock-cards">
          {[
            {
              icon: "fa-bullseye",
              title: "Boost your wellness",
              desc: "With each mission you complete, you’ll see tangible progress in your well-being.",
            },
            {
              icon: "fa-chart-line",
              title: "Constant motivation",
              desc: "Missions and achievements will keep you moving forward, growing along the way.",
            },
            {
              icon: "fa-cogs",
              title: "Move at your own pace",
              desc: "Advance on your own path to wellness with a system that adapts to your needs.",
            },
          ].map((card, i) => (
            <motion.div className="card" key={i} variants={fadeInUp} initial="hidden" whileInView="visible">
              <div className="icon">
                <i className={`fas ${card.icon}`} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how" id="how">
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible">
          How it works
        </motion.h2>

        <div className="tabs">
          {["MISSIONS", "PROGRESS", "RESOURCES", "ACHIEVEMENTS"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div className="tab-content" variants={fadeInUp} initial="hidden" whileInView="visible">
          <img src={getImageByTab()} alt={activeTab} />
          <p>
            {activeTab === "MISSIONS" && "Every week, you’ll get missions tailored to your interests, level, and goals. They're built to challenge you while staying achievable and adaptive."}
            {activeTab === "PROGRESS" && "Track your daily and weekly progress easily to stay motivated and on course towards your goals."}
            {activeTab === "RESOURCES" && "Access personalized tips, articles, and expert advice to help you on your journey."}
            {activeTab === "ACHIEVEMENTS" && "Celebrate every milestone you hit with badges, awards, and recognition along your journey."}
          </p>
        </motion.div>
      </section>

      {/* SUBSCRIPTIONS */}
      <section className="section subscriptions" id="subscriptions">
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible">
          Subscriptions
        </motion.h2>
        <div className="unlock-cards">
          {subscriptions.map((plan, i) => (
            <motion.div className="card" key={i} variants={fadeInUp} initial="hidden" whileInView="visible">
              <h3>{plan.plan}</h3>
              <p className="price">{plan.price}</p>
              <ul>
                {plan.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
              <button>{plan.button}</button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section reviews" id="clients">
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible">
          Our clients reviews
        </motion.h2>

        {/* Carrusel normal */}
        <div className="carousel-wrapper">
          <div className="carousel-track normal">
            {tripledReviews.map((r, i) => (
              <div className="testimonial-card" key={i}>
                <img src={r.img} alt={r.name} />
                <p>{r.name}</p>
                <div className="stars">★★★★★</div>
                <p className="review-text">Amazing experience!</p>
              </div>
            ))}
          </div>
        </div>

        {/* Carrusel reverse */}
        <div className="carousel-wrapper reverse">
          <div className="carousel-track reverse-track">
            {quintupledReviews.map((r, i) => (
              <div className="testimonial-card" key={`rev-${i}`}>
                <img src={r.img} alt={r.name} />
                <p>{r.name}</p>
                <div className="stars">★★★★☆</div>
                <p className="review-text">Highly recommend!</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section cta" id="cta">
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible">
          If you want to become one of them and
        </motion.h2>
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible">
          <span>Level Up your life</span>
        </motion.h2>
        <motion.button
          className="cta-button"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          onClick={handleNavigateRegister}
        >
          CLICK HERE
        </motion.button>
      </section>

      <footer className="footer">
        <p>Level Up © 2025</p>
      </footer>
    </div>
  );
};

export default Landing;