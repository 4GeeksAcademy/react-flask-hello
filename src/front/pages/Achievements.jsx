import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../assets/styles/Achievements.module.css";
import Navbar2 from "../components/Navbar2";
import Particles from "../components/Particles";

const iconMap = {
  first_level: "fas fa-rocket",
  perfect_combo: "fas fa-fire",
  zen_mode: "fas fa-spa",
  breathe_recharge: "fas fa-wind",
  knowledge_initiate: "fas fa-headphones-alt",
  strength_level: "fas fa-dumbbell",
  legendary_day: "fas fa-peace",
  supreme_explorer: "fas fa-leaf",
  unstoppable_mission: "fas fa-trophy",
  labyrinth_king: "fas fa-crown",
  mindfulness_jedi: "fas fa-balance-scale",
  serenity_winds: "fas fa-cloud-sun",
  virtual_gymnast: "fas fa-person-walking",
  digital_bibliophile: "fas fa-book",
  burst_mode: "fas fa-bolt"
};

const Achievements = () => {
  const [allAchievements, setAllAchievements] = useState([]);
  const [unlockedKeys, setUnlockedKeys] = useState([]);
  const userId = localStorage.getItem("user_id");
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allRes, unlockedRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/achievements`),
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/achievements/${userId}`)
        ]);

        const allData = await allRes.json();
        const unlockedData = await unlockedRes.json();

        setAllAchievements(allData);
        setUnlockedKeys(unlockedData.unlocked_achievements || []);
      } catch (err) {
        console.error("Error fetching achievements:", err);
      }
    };
    fetchData();
  }, [userId, location.pathname]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Particles
        particleColors={['#6725D8', '#6725D8']}
        particleCount={300}
        particleSpread={5}
        speed={0.2}
        particleBaseSize={50}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className={styles.achievementsContainer}>
          <div className={styles.achievementsNavbarGrid}><Navbar2 /></div>
          <div className={styles.achievementsGrid}>
            {allAchievements.map((achievement) => {
              const unlocked = unlockedKeys.includes(achievement.key);
              return (
                <div
                  className={`${styles.achievementsCard} ${!unlocked ? styles.achievementsLockedCard : ''}`}
                  key={achievement.id}
                >
                  <div className={styles.achievementsIcon}>
                    <i className={iconMap[achievement.key] || "fas fa-star"}></i>
                  </div>
                  <div className={styles.achievementsCardText}>
                    <div className={styles.achievementsTitle}>{achievement.title}</div>
                    <div className={styles.achievementsDescription}>{achievement.description}</div>
                  </div>
                  {!unlocked && (
                    <div className={styles.achievementsLocked}>
                      <i className="fa-solid fa-lock"></i>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
