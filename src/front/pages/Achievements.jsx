import React from "react";
import styles from "../assets/styles/Achievements.module.css";
import { style } from "framer-motion/client";
import Navbar from "../components/Navbar"
import Particles from "../components/Particles";

const achievements = [
    {
        id: 1,
        title: "First Level",
        description: "Complete your first weekly mission.",
        icon: <i className="fas fa-rocket"></i>,
        unlocked: true
    },
    {
        id: 2,
        title: "Perfect Combo",
        description: "Complete 3 missions in one week.",
        icon: <i className="fas fa-fire"></i>,
        unlocked: true
    },
    {
        id: 3,
        title: "Zen Mode",
        description: "Do a guided meditation.",
        icon: <i className="fas fa-spa"></i>,
        unlocked: true
    },
    {
        id: 4,
        title: "Breathe and Recharge",
        description: "Complete a conscious breathing session.",
        icon: <i className="fas fa-wind"></i>,
        unlocked: true
    },
    {
        id: 5,
        title: "Knowledge Initiate",
        description: "Listen to your first full podcast.",
        icon: <i className="fas fa-headphones-alt"></i>,
        unlocked: true
    },
    {
        id: 6,
        title: "Strength Level",
        description: "Complete a yoga or functional training session.",
        icon: <i className="fas fa-dumbbell"></i>,
        unlocked: false
    },
    {
        id: 7,
        title: "Legendary Day",
        description: "Do yoga and meditation on the same day.",
        icon: <i className="fas fa-peace"></i>,
        unlocked: false
    },
    {
        id: 8,
        title: "Supreme Explorer",
        description: "Explore different branches in one week.",
        icon: <i className="fas fa-leaf"></i>,
        unlocked: false
    },
    {
        id: 9,
        title: "Unstoppable Mission",
        description: "Complete missions for 4 consecutive weeks.",
        icon: <i className="fas fa-trophy"></i>,
        unlocked: false
    },
    {
        id: 10,
        title: "Labyrinth King",
        description: "Complete all branches of the skill tree.",
        icon: <i className="fas fa-crown"></i>,
        unlocked: false
    },
    {
        id: 11,
        title: "Mindfulness Jedi Master",
        description: "Complete 10 meditation sessions.",
        icon: <i className="fas fa-balance-scale"></i>,
        unlocked: false
    },
    {
        id: 12,
        title: "Serenity Winds",
        description: "Do 3 conscious breathing sessions in one week.",
        icon: <i className="fas fa-cloud-sun"></i>,
        unlocked: false
    },
    {
        id: 13,
        title: "Virtual Gymnast",
        description: "Complete 5 yoga or functional training sessions.",
        icon: <i className="fas fa-person-walking"></i>,
        unlocked: false
    },
    {
        id: 14,
        title: "Digital Bibliophile",
        description: "Listen to 3 different podcasts.",
        icon: <i className="fas fa-book"></i>,
        unlocked: false
    },
    {
        id: 15,
        title: "Burst Mode",
        description: "Complete 7 missions in one week.",
        icon: <i className="fas fa-bolt"></i>,
        unlocked: false
    }
  ];

const Achievements = () =>{
    return(
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
            <div className={styles.achievementsNavbarGrid}>
                <Navbar />
            </div>
            <div className={styles.achievementsGrid}>
                {achievements.map((achievement) => (
                    <div
                    className={`${styles.achievementsCard} ${!achievement.unlocked ? styles.achievementsLockedCard : ''}`}
                    key={achievement.id}
                    >
                    <div className={styles.achievementsIcon}>{achievement.icon}</div>
                    <div className={styles.achievementsCardText}>
                        <div className={styles.achievementsTitle}>{achievement.title}</div>
                        <div className={styles.achievementsDescription}>{achievement.description}</div>
                    </div>
                    {!achievement.unlocked && (
                        <div className={styles.achievementsLocked}><i className="fa-solid fa-lock"></i></div>
                    )}
                    </div>
                ))}
            </div>
            </div>
        </div>
    </div>
    )
}

export default Achievements;