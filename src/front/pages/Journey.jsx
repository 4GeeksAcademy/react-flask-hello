import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/Journey.module.css";
import AnimatedPage from "../components/AnimatedPage";
import Navbar2 from "../components/Navbar2";
import Particles from "../components/Particles";

import missionRosita from "../assets/styles/images/MISSION_TAREA_MANUAL_ROSITA.webp";

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Journey = () => {
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState([]);
  const [currentClickedNumber, setCurrentClickedNumber] = useState(1);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const savedNumbers = localStorage.getItem(`${userId}_shuffledNumbers`);
    const savedCurrent = localStorage.getItem(`${userId}_currentClickedNumber`);

    if (savedNumbers) {
      setNumbers(JSON.parse(savedNumbers));
    } else {
      const shuffled = shuffleArray(Array.from({ length: 16 }, (_, i) => i + 1));
      setNumbers(shuffled);
      localStorage.setItem(`${userId}_shuffledNumbers`, JSON.stringify(shuffled));
    }

    if (savedCurrent) {
      setCurrentClickedNumber(parseInt(savedCurrent));
    }
  }, []);

  const handleClick = (num) => {
    const userId = localStorage.getItem("user_id");
    if (num === currentClickedNumber) {
      localStorage.setItem(`${userId}_currentMission`, JSON.stringify(num));
      navigate("/task");
    }
  };

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
          <Navbar2 />
          <div className={styles.journeyContainer}>
            <div className={styles.journeyCalendarButtons}>
              {numbers.map((num) => {
                const isCurrent = num === currentClickedNumber;
                const isCompleted = num < currentClickedNumber;

                const background = isCurrent
                  ? "radial-gradient(circle at 30% 30%, #FF8F84, #FB645C)"
                  : isCompleted
                  ? "radial-gradient(circle at 30% 30%, #98FFD0, #5CFB7E)"
                  : "radial-gradient(circle at 30% 30%, #7E768A, #4E465C)";

                return (
                  <div
                    key={num}
                    className={`${styles.journeyButton} ${isCurrent ? styles.flipEnabled : ""}`}
                    onClick={() => handleClick(num)}
                    style={{ background, cursor: isCurrent ? "pointer" : "not-allowed" }}
                  >
                    <div className={styles.cardFront}><h1>{num}</h1></div>
                    <div className={styles.cardBack}>
                      <img src={missionRosita} alt="MotyActive" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Journey;
