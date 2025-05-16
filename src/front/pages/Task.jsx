import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../assets/styles/Task.module.css";
import Navbar from "../components/Navbar";
import AnimatedPage from "../components/AnimatedPage";
import Navbar2 from "../components/Navbar2";
import Particles from "../components/Particles";

const content = [
  { id: 1, title: <h2>Workout</h2>, description: "Full-body strength training to improve endurance and muscle tone.", img: <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2669" alt="Workout" /> },
  { id: 2, title: <h2>Running</h2>, description: "Cardio exercise to boost heart health and stamina.", img: <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2670" alt="Running" /> },
  { id: 3, title: <h2>Meditation</h2>, description: "Mindfulness practice to reduce stress and improve focus.", img: <img src="https://images.unsplash.com/photo-1554244933-d876deb6b2ff?q=80&w=2680" alt="Meditation" /> },
  { id: 4, title: <h2>Mobility</h2>, description: "Improve flexibility and prevent injury through mobility drills.", img: <img src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2670" alt="Mobility" /> },
  { id: 5, title: <h2>Yoga</h2>, description: "Combine movement and breath to enhance body-mind connection.", img: <img src="https://images.unsplash.com/photo-1593164842264-854604db2260?q=80&w=2574" alt="Yoga" /> },
  { id: 6, title: <h2>Hydration</h2>, description: "Track your water intake today and stay well hydrated.", img: <img src="https://images.unsplash.com/photo-1582719478181-2c9fae367fd6?q=80&w=2670" alt="Water" /> },
  { id: 7, title: <h2>Healthy Meal</h2>, description: "Prepare and eat a healthy meal packed with vegetables.", img: <img src="https://images.unsplash.com/photo-1604908177522-192186e1931c?q=80&w=2670" alt="Healthy Meal" /> },
  { id: 8, title: <h2>Stretching</h2>, description: "10-minute stretch session to improve posture and blood flow.", img: <img src="https://images.unsplash.com/photo-1588776814546-bc89fd67f1c1?q=80&w=2670" alt="Stretching" /> },
  { id: 9, title: <h2>Digital Detox</h2>, description: "Avoid social media and screens for at least 1 hour today.", img: <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670" alt="Digital Detox" /> },
  { id: 10, title: <h2>Gratitude</h2>, description: "Write down 3 things you're grateful for today.", img: <img src="https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=2670" alt="Gratitude" /> },
  { id: 11, title: <h2>Journaling</h2>, description: "Take 10 minutes to write freely about your day or goals.", img: <img src="https://images.unsplash.com/photo-1588776814546-bc89fd67f1c1?q=80&w=2670" alt="Journaling" /> },
  { id: 12, title: <h2>Mindful Walk</h2>, description: "Go for a walk and focus on sights, sounds, and sensations.", img: <img src="https://images.unsplash.com/photo-1611171711910-c7b1e8d3f408?q=80&w=2670" alt="Mindful Walk" /> },
  { id: 13, title: <h2>Declutter</h2>, description: "Organize one space in your home to reduce visual noise.", img: <img src="https://images.unsplash.com/photo-1560185127-6ed189bf02ec?q=80&w=2670" alt="Decluttering" /> },
  { id: 14, title: <h2>Cold Shower</h2>, description: "Start your day with a cold shower for energy and discipline.", img: <img src="https://images.unsplash.com/photo-1611974789855-bbc80a61fcde?q=80&w=2670" alt="Cold Shower" /> },
  { id: 15, title: <h2>Early Wake-Up</h2>, description: "Wake up 30 minutes earlier and use that time for yourself.", img: <img src="https://images.unsplash.com/photo-1581276879432-15a64a76b314?q=80&w=2670" alt="Wake Up Early" /> },
  { id: 16, title: <h2>Read</h2>, description: "Read 10+ pages from any book that inspires or educates.", img: <img src="https://images.unsplash.com/photo-1544716278-e513176f20b5?q=80&w=2670" alt="Reading" /> },
];

const Task = () => {
  const [mission, setMission] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [achievementMsg, setAchievementMsg] = useState("");
  const [isCompleting, setIsCompleting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isFromContent = location.state?.fromContent;

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const missionId = JSON.parse(localStorage.getItem(`${userId}_currentMission`));
    const selected = content.find((item) => item.id === missionId);
    if (selected) setMission(selected);

    const wasAccepted = JSON.parse(localStorage.getItem(`${userId}_missionAccepted`));
    if (wasAccepted) setAccepted(true);
  }, []);

  const handleAccept = async () => {
    const userId = localStorage.getItem("user_id");
    const missionId = JSON.parse(localStorage.getItem(`${userId}_currentMission`));

    try {
      // Si es desde Content, solo actualizamos el estado local
      if (isFromContent) {
        setAccepted(true);
        localStorage.setItem(`${userId}_missionAccepted`, true);
        return;
      }

      // Si es desde Journey, procedemos con la lógica normal
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usermission`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          user_id: userId, 
          mission_id: missionId,
          from_content: false
        })
      });
      const data = await res.json();
      if (res.ok && data.usermission_id) {
        localStorage.setItem(`${userId}_usermission_id`, data.usermission_id);
        setAccepted(true);
        localStorage.setItem(`${userId}_missionAccepted`, true);
      } else {
        console.error("Error del backend:", data);
      }
    } catch (err) {
      console.error("Error al aceptar misión:", err);
    }
  };

  const handleComplete = async () => {
    if (isCompleting) return;
    setIsCompleting(true);

    const userId = localStorage.getItem("user_id");
    const current = JSON.parse(localStorage.getItem(`${userId}_currentMission`));

    try {
      // Solo actualizamos la misión en el backend si NO viene de Content
      if (!isFromContent) {
        const usermissionId = localStorage.getItem(`${userId}_usermission_id`);
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usermission/${usermissionId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" }
        });

        // Desbloquear logros solo si viene de Journey
        const unlocked = [];
        if (current === 3) unlocked.push("zen_mode");
        if (current === 1 || current === 5) unlocked.push("strength_level");

        const completedCount = JSON.parse(localStorage.getItem(`${userId}_missionsCompleted`)) || 0;
        if (completedCount === 0) unlocked.push("first_level");
        const newCount = completedCount + 1;
        localStorage.setItem(`${userId}_missionsCompleted`, newCount);
        if (newCount === 3) unlocked.push("perfect_combo");

        if (unlocked.length > 0) {
          setAchievementMsg(`🎉 Logro desbloqueado: ${unlocked.join(", ").replace(/_/g, " ")}`);
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/achievements/unlock`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, achievements: unlocked })
          });
        }

        // Actualizar progreso solo si viene de Journey
        localStorage.setItem(`${userId}_currentClickedNumber`, current + 1);
      }
    } catch (err) {
      console.error("Error al completar misión:", err);
    }

    // Limpiar estado local después de completar
    setTimeout(() => {
      setAchievementMsg("");
      localStorage.removeItem(`${userId}_currentMission`);
      localStorage.removeItem(`${userId}_missionAccepted`);
      localStorage.removeItem(`${userId}_usermission_id`);
      navigate(isFromContent ? "/content" : "/journey");
    }, 2000);
  };

  const handleReject = () => {
    const userId = localStorage.getItem("user_id");
    localStorage.removeItem(`${userId}_currentMission`);
    localStorage.removeItem(`${userId}_missionAccepted`);
    navigate(isFromContent ? "/content" : "/journey");
  };

  if (!mission) return <p>Cargando misión...</p>;

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
        <div style={{ position: "relative", zIndex: 10 }}>
          <Navbar2 />
          <div className={styles.taskContainer}>
            <Navbar />
            <div className={styles.taskContent}>
              <div className={styles.taskPhoto}>{mission.img}</div>
              <div className={styles.taskTextContainer}>
                <div className={styles.taskText}>
                  {mission.title}
                  {mission.description}
                  {isFromContent && (
                    <p style={{ color: '#888', fontSize: '0.9em', marginTop: '1rem' }}>
                      Nota: Esta tarea es solo práctica y no sumará experiencia ni desbloqueará logros.
                    </p>
                  )}
                </div>
                <div className={styles.taskButtons}>
                  {!accepted ? (
                    <>
                      <button className={styles.taskAccept} onClick={handleAccept}>Aceptar</button>
                      <button className={styles.taskDeny} onClick={handleReject}>Denegar</button>
                    </>
                  ) : (
                    <button className={styles.taskAccept} onClick={handleComplete}>Completar misión</button>
                  )}
                </div>
                {achievementMsg && (
                  <div style={{ marginTop: "1rem", color: "#5CFB7E", fontWeight: "bold", textAlign: "center" }}>
                    {achievementMsg}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Task;
