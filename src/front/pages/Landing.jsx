// src/front/pages/Landing.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../assets/styles/Landing.module.css";

// Logos
import amazon from "../assets/styles/images/Landing_images/Amazon.png";
import facebook from "../assets/styles/images/Landing_images/facebook-logo-white-full-transparent.png";
import headspace from "../assets/styles/images/Landing_images/Headspace.webp";
import twilio from "../assets/styles/images/Landing_images/Twilio.png";
import verizon from "../assets/styles/images/Landing_images/Verizon.png";

// Tabs
import missionsImg from "../assets/styles/images/Landing_images/waves_2k_upscaled.jpg";
import progressImg from "../assets/styles/images/Landing_images/waves_2k_upscaled.jpg";
import resourcesImg from "../assets/styles/images/Landing_images/waves_2k_upscaled.jpg";
import achievementsImg from "../assets/styles/images/Landing_images/waves_2k_upscaled.jpg";

// Animación
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

const subscriptions = [
  {
    plan: "Beginner",
    price: "FREE",
    features: [
      "3 daily quests per day",
      "Standard Profile Pic",
      "Access to all content",
      "Access to all your stats",
    ],
    button: "Start for free",
  },
  {
    plan: "Pro",
    price: "4,99€",
    features: [
      "All free features +",
      "Unlimited daily quests",
      "Customizable Profile Pic",
      "Access to Extra Content",
    ],
    button: "Pay for Plus",
  },
  {
    plan: "Premium",
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
const tripledReviews = [...reviews, ...reviews, ...reviews];
const quintupledReviews = [...reviews, ...reviews, ...reviews, ...reviews, ...reviews];

const Landing = () => {
  const [activeTab, setActiveTab] = useState("MISSIONS");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = styles.landingBody;
    return () => {
      document.body.className = "";
    };
  }, []);

  const handleNavigateRegister = () => navigate("/register");

  const getImageByTab = () => {
    switch (activeTab) {
      case "MISSIONS": return missionsImg;
      case "PROGRESS": return progressImg;
      case "RESOURCES": return resourcesImg;
      case "ACHIEVEMENTS": return achievementsImg;
      default: return missionsImg;
    }
  };

  return (
    <div className={styles.landingContainer}>
      <Navbar />
      <section className={`${styles.landingSection} ${styles.landingHero}`}>
        <div className={styles.landingHeroOverlay}></div>
        <div className={styles.landingHeroGradient}></div>
        <div className={styles.landingHeroContent}>
          <motion.h1 className={styles.landingHeroTitle} variants={fadeInUp} initial="hidden" whileInView="visible">
            Achieve your goals and <br /> <span>LEVEL UP</span>
          </motion.h1>
          <motion.p className={styles.landingHeroText} variants={fadeInUp} initial="hidden" whileInView="visible">
            Level Up is your companion on the journey to a healthier, more balanced life. Through personalized missions and challenges, you'll improve your physical and mental well-being.
          </motion.p>
          <motion.button className={styles.landingCtaButton} onClick={handleNavigateRegister} variants={fadeInUp} initial="hidden" whileInView="visible">
            Start your journey
          </motion.button>
        </div>
      </section>

      <div className={styles.landingBrandCarousel}>
        <div className={styles.landingBrandTrack}>
          {repeatedBrands.map((img, i) => (
            <img key={i} src={img} alt={`brand-${i}`} className={styles.landingBrandLogo} />
          ))}
        </div>
      </div>

      <section className={`${styles.landingSection} ${styles.landingUnlockSection}`}>
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible">Unlock True Balance</motion.h2>
        <div className={styles.landingUnlockCards}>
          {[
            { icon: "fa-bullseye", title: "Boost your wellness", desc: "With each mission you complete, you’ll see tangible progress in your well-being." },
            { icon: "fa-chart-line", title: "Constant motivation", desc: "Missions and achievements will keep you moving forward, growing along the way." },
            { icon: "fa-cogs", title: "Move at your own pace", desc: "Advance on your own path to wellness with a system that adapts to your needs." }
          ].map((card, i) => (
            <motion.div key={i} className={styles.landingCard} variants={fadeInUp} initial="hidden" whileInView="visible">
              <div className={styles.landingIcon}><i className={`fas ${card.icon}`} /></div>
              <h3 className={styles.landingCardTitle}>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={`${styles.landingSection} ${styles.landingHow}`}>
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible">How it works</motion.h2>
        <div className={styles.landingTabs}>
          {["MISSIONS", "PROGRESS", "RESOURCES", "ACHIEVEMENTS"].map((tab) => (
            <button key={tab} className={`${styles.landingTabButton} ${activeTab === tab ? styles.activeTab : ""}`} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <motion.div className={styles.landingTabContent} variants={fadeInUp} initial="hidden" whileInView="visible">
          <img src={getImageByTab()} alt={activeTab} />
          <p className={styles.landingTabDescription}>
            {activeTab === "MISSIONS" && "Every week, you’ll get missions tailored to your interests..."}
            {activeTab === "PROGRESS" && "Track your daily and weekly progress easily..."}
            {activeTab === "RESOURCES" && "Access personalized tips, articles..."}
            {activeTab === "ACHIEVEMENTS" && "Celebrate every milestone..."}
          </p>
        </motion.div>
      </section>

      <section className={`${styles.landingSection} ${styles.landingSubscriptions}`}>
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible">Subscriptions</motion.h2>
        <div className={styles.landingUnlockCards}>
          {subscriptions.map((plan, i) => (
            <motion.div key={i} className={styles.landingCard} variants={fadeInUp} initial="hidden" whileInView="visible">
              <h3 className={styles.landingCardTitle}>{plan.plan}</h3>
              <p className={styles.landingPrice}>{plan.price}</p>
              <ul>{plan.features.map((f, idx) => <li key={idx}>{f}</li>)}</ul>
              <button className={styles.landingCardButton}>{plan.button}</button>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.landingSection}>
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible">Our clients reviews</motion.h2>
        <div className={styles.landingCarouselWrapper}>
          <div className={styles.landingCarouselTrack}>
            {tripledReviews.map((r, i) => (
              <div key={i} className={styles.landingTestimonialCard}>
                <img src={r.img} alt={r.name} />
                <p>{r.name}</p>
                <div className={styles.landingStars}>★★★★★</div>
                <p className={styles.landingReviewText}>Amazing experience!</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.landingCarouselWrapper} ${styles.reverse}`}>
          <div className={styles.landingCarouselTrack}>
            {quintupledReviews.map((r, i) => (
              <div key={`rev-${i}`} className={styles.landingTestimonialCard}>
                <img src={r.img} alt={r.name} />
                <p>{r.name}</p>
                <div className={styles.landingStars}>★★★★☆</div>
                <p className={styles.landingReviewText}>Highly recommend!</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.landingSection} ${styles.landingCtaFinal}`}>
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible">If you want to become one of them and</motion.h2>
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible"><span>Level Up your life</span></motion.h2>
        <motion.button className={styles.landingCtaButton} onClick={handleNavigateRegister} variants={fadeInUp} initial="hidden" whileInView="visible">
          CLICK HERE
        </motion.button>
      </section>

      <footer className={styles.landingFooter}>
        <p>Level Up © 2025</p>
      </footer>
    </div>
  );
};

export default Landing;