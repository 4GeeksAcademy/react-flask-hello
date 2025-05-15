// src/front/pages/Landing.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Aurora from "../components/Aurora";
import styles from "../assets/styles/Landing.module.css";

// Logos
import amazon from "../assets/styles/images/Landing_images/Amazon.png";
import facebook from "../assets/styles/images/Landing_images/facebook-logo-white-full-transparent.png";
import headspace from "../assets/styles/images/Landing_images/Headspace.png";
import myfitnesspal from "../assets/styles/images/Landing_images/myfitnesspal.png";
import onlyfans from "../assets/styles/images/Landing_images/onlyfans.png";
import twilio from "../assets/styles/images/Landing_images/Twilio.png";
import verizon from "../assets/styles/images/Landing_images/Verizon.png";
import motiFeliz from "../assets/styles/images/Motis/Moti_Feliz.png";
import ptoAmoMancuernas from "../assets/styles/images/Motis/PtoAmoMancuernas.png";
import enamorado from "../assets/styles/images/Motis/Enamorado.png";
import confeti from "../assets/styles/images/Motis/Confeti.png";

// IMPORTS DE AVATARES PARA REVIEWS
import avatar1 from "../assets/styles/images/Avatars/Avatar de mujer con gafas.png";
import avatar2 from "../assets/styles/images/Avatars/Chica con cabello azul y camiseta amarilla.png";
import avatar3 from "../assets/styles/images/Avatars/Joven con camiseta negra y cabello naranja.png";
import avatar4 from "../assets/styles/images/Avatars/Mujer con gafas y sonrisa amigable.png";
import avatar5 from "../assets/styles/images/Avatars/Retrato amistoso de mujer sonriente.png";
import avatar6 from "../assets/styles/images/Avatars/Retrato digital de joven sonriente.png";
import avatar7 from "../assets/styles/images/Avatars/Retrato digital de un joven.png";
import avatar8 from "../assets/styles/images/Avatars/Retrato en estilo minimalista.png";
import avatar9 from "../assets/styles/images/Avatars/Retrato estilizado con gafas negras.png";
import avatar10 from "../assets/styles/images/Avatars/Retrato minimalista de hombre joven.png";

// Tabs
// import missionsImg from "../assets/styles/images/Landing_images/login-bg.jpg";
// import progressImg from "../assets/styles/images/Landing_images/login-bg.jpg";
// import resourcesImg from "../assets/styles/images/Landing_images/login-bg.jpg";
// import achievementsImg from "../assets/styles/images/Landing_images/login-bg.jpg";

// Animación
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const reviews = [
  { name: "Lou Logico - Humorist", img: avatar1, text: "A fun and motivating experience!" },
  { name: "Jean Pierre - Front-End Dev", img: avatar2, text: "The best way to keep growing every week." },
  { name: "Jagger Meister - Boxer", img: avatar3, text: "I love the missions and the progress tracking!" },
  { name: "Jonas Jimbo - Singer", img: avatar4, text: "Super easy to use and very inspiring." },
  { name: "Javy Kardashian - Nurse", img: avatar5, text: "I feel more productive and positive!" },
  { name: "Juan Albertillo - Trucker", img: avatar6, text: "Great for building new habits!" },
];

const reviews2 = [
  { name: "Javy Kardashian - Nurse", img: avatar7, text: "Highly recommend for anyone!" },
  { name: "Juan Albertillo - Trucker", img: avatar8, text: "Perfect for staying on track." },
  { name: "Lou Logico - Humorist", img: avatar9, text: "Love the achievements system!" },
  { name: "Jean Pierre - Front-End Dev", img: avatar10, text: "The stats panel is super clear." },
  { name: "Jagger Meister - Boxer", img: avatar1, text: "I never get bored, always new challenges!" },
  { name: "Jonas Jimbo - Singer", img: avatar2, text: "It keeps me motivated every day." },
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

const brands = [amazon, facebook, headspace, myfitnesspal, onlyfans, twilio, verizon];
const repeatedBrands = Array(10).fill(brands).flat();

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
      case "MISSIONS": return motiFeliz;
      case "PROGRESS": return ptoAmoMancuernas;
      case "RESOURCES": return enamorado;
      case "ACHIEVEMENTS": return confeti;
      default: return motiFeliz;
    }
  };

  const getTextByTab = () => {
    switch (activeTab) {
      case "MISSIONS":
        return "Each week, you'll get missions tailored to your goals: health, learning, habits, creativity...\n Every completed task gives you XP and boosts your stats.\n It's all about staying motivated and tracking real evolution.";
      case "PROGRESS":
        return "Your personal stats panel shows how you're evolving each week.\n Track your level, consistency, energy points, and improvement areas: clean and distraction-free.";
      case "RESOURCES":
        return "Your personal stats panel shows how you're evolving each week.\n Track your level, consistency, energy points, and improvement areas: clean and distraction-free.\nChoose your focus: physical, mental, creative... or mix it all!\n Select the content you want to see and adjust the difficulty of your journey.\n Start easy. Raise the challenge when you're ready. It's up to you!";
      case "ACHIEVEMENTS":
        return "Trak all your progress visually by unlocking achievements and celebrate every milestone!";
      default:
        return "";
    }
  };

  const tripledReviews = [...reviews, ...reviews, ...reviews];
  const quintupledReviews = [...reviews2, ...reviews2, ...reviews2, ...reviews2, ...reviews2];

  return (
    <div className={styles.landingContainer}>
      <Navbar />
      <section className={`${styles.landingSection} ${styles.landingHero}`}>
        <Aurora
          colorStops={["#8e24aa", "#651fff", "#ff6f61"]}
          blend={0.2}
          amplitude={0.8}
          speed={0.8

          }
        />
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
            { icon: "fa-bullseye", title: "Boost your wellness", desc: "With each mission you complete, you'll see tangible progress in your well-being." },
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
          <div className={styles.landingTabContentImgWrapper}>
            <img 
              src={getImageByTab()} 
              alt={activeTab} 
              className={activeTab === "RESOURCES" ? styles.landingTabContentImgEnamorado : undefined}
            />
          </div>
          <p className={styles.landingTabDescription}>
            {getTextByTab().split("\n").map((line, idx) => (
              <span key={idx}>{line}<br /></span>
            ))}
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
              <div key={i} className={styles.landingTestimonialCard} style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <img src={r.img} alt={r.name} style={{margin: '0 auto', width: 70, height: 70, borderRadius: '50%', objectFit: 'cover'}} />
                <p style={{fontWeight: 500, margin: '1rem 0 0.5rem 0'}}>{r.name}</p>
                <div className={styles.landingStars}>★★★★★</div>
                <p className={styles.landingReviewText}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.landingCarouselWrapper} ${styles.reverse}`}>
          <div className={styles.landingCarouselTrack}>
            {quintupledReviews.map((r, i) => (
              <div key={`rev-${i}`} className={styles.landingTestimonialCard} style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <img src={r.img} alt={r.name} style={{margin: '0 auto', width: 70, height: 70, borderRadius: '50%', objectFit: 'cover'}} />
                <p style={{fontWeight: 500, margin: '1rem 0 0.5rem 0'}}>{r.name}</p>
                <div className={styles.landingStars}>★★★★☆</div>
                <p className={styles.landingReviewText}>{r.text}</p>
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