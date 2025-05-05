import React from "react";
import styles from "../assets/styles/Task.module.css";
import { h4, style } from "framer-motion/client";
import Navbar from "../components/Navbar"
import AnimatedPage from "../components/AnimatedPage";
import Particles from "../components/Particles";

const content = [
    {
      id: 1,
      title: <h2>Workout</h2>,
      description: "A full-body strength training routine designed to challenge your muscles and boost your endurance. Whether you're lifting weights or doing bodyweight exercises, this session will help improve physical performance and build a resilient physique over time.",
      img: (
        <img
          src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Workout"
        />
      ),
    },
    {
      id: 2,
      title: <h2>Running</h2>,
      description: "An invigorating cardio experience designed to elevate your heart rate, strengthen your cardiovascular system, and clear your mind. Whether you're sprinting or jogging, running consistently enhances stamina and releases endorphins for improved mood and focus.",
      img: (
        <img
          src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Running"
        />
      ),
    },
    {
      id: 3,
      title: <h2>Meditate</h2>,
      description: "A mindful practice focused on calming the mind, reducing stress, and enhancing self-awareness. Through deep breathing and focused attention, meditation promotes emotional stability, reduces anxiety, and improves overall mental clarity and well-being.",
      img: (
        <img
          src="https://images.unsplash.com/photo-1554244933-d876deb6b2ff?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Meditate"
        />
      ),
    },
    {
      id: 4,
      title: <h2>Mobility</h2>,
      description: "A dynamic session that emphasizes joint health, range of motion, and fluid movement. Mobility work is essential for preventing injuries, improving posture, and enhancing performance in other physical activities by keeping the body agile and functional.",
      img: (
        <img
          src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Mobility"
        />
      ),
    },
    {
      id: 5,
      title: <h2>Yoga</h2>,
      description: "A holistic practice that combines physical postures, breathing techniques, and meditation. Yoga improves flexibility, strengthens muscles, and promotes a deeper connection between body and mind. It's ideal for reducing stress and cultivating balance in life.",
      img: (
        <img
          src="https://images.unsplash.com/photo-1593164842264-854604db2260?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Yoga"
        />
      ),
    },
  ];

const Task = () => {
    const randomContent = content[Math.floor(Math.random() * content.length)];

    return (
        <AnimatedPage>
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
        <div className={styles.taskContainer}>
                <Navbar />
            <div className={styles.taskContent}>
                <div className={styles.taskPhoto}>
                    {randomContent.img}
                </div>
                <div className={styles.taskTextContainer}>
                    <div className={styles.taskText}>
                        {randomContent.title}
                        {randomContent.description}
                    </div>
                    <div className={styles.taskButtons}>
                        <div className={styles.taskAccept}>
                            Accept
                        </div>
                        <div className={styles.taskDeny}>
                            Deny
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
        </AnimatedPage>
    );
};

export default Task;