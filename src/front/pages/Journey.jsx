import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/Journey.module.css";
import AnimatedPage from "../components/AnimatedPage";
import Navbar2 from "../components/Navbar2";
import Particles from "../components/Particles";

import missionRosita from "../assets/styles/images/MISSION_TAREA_MANUAL_ROSITA.webp";

// Función para generar un número aleatorio entre min y max (inclusive)
const getRandomMissionId = () => {
  return Math.floor(Math.random() * 16) + 1; // IDs del 1 al 16
};

const Journey = () => {
  const navigate = useNavigate();
  const [currentClickedNumber, setCurrentClickedNumber] = useState(1);
  const [missionMap, setMissionMap] = useState(new Map());

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    // Recuperar el progreso actual
    const savedCurrent = localStorage.getItem(`${userId}_currentClickedNumber`);
    if (savedCurrent) {
      setCurrentClickedNumber(parseInt(savedCurrent));
    }

    // Recuperar el mapeo de monedas a misiones
    const savedMissionMap = localStorage.getItem(`${userId}_missionMap`);
    if (savedMissionMap) {
      setMissionMap(new Map(JSON.parse(savedMissionMap)));
    }
  }, []);

  const handleClick = (num) => {
    const userId = localStorage.getItem("user_id");
    if (num === currentClickedNumber) {
      let missionId;
      
      // Si ya existe un ID de misión para esta moneda, usarlo
      if (missionMap.has(num)) {
        missionId = missionMap.get(num);
      } else {
        // Si no, generar uno nuevo
        missionId = getRandomMissionId();
        const newMap = new Map(missionMap);
        newMap.set(num, missionId);
        setMissionMap(newMap);
        // Guardar el mapeo actualizado
        localStorage.setItem(`${userId}_missionMap`, JSON.stringify([...newMap]));
      }

      // Guardar la misión actual y navegar a la tarea
      localStorage.setItem(`${userId}_currentMission`, missionId);
      navigate("/task");
    }
  };

  // Generar array de números del 1 al 16 para las monedas
  const numbers = Array.from({ length: 16 }, (_, i) => i + 1);

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
