import React, { useEffect, useState } from "react";
import styles from "../assets/styles/Task.module.css";
import Navbar from "../components/Navbar";
import AnimatedPage from "../components/AnimatedPage";
import Particles from "../components/Particles";

const Task = () => {
    const [mission, setMission] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found in localStorage");
                    return;
                }

                const response = await fetch("https://redesigned-fiesta-7prqx6pjjg9hr6g9-3001.app.github.dev/api/missions", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error fetching missions:", response.status, errorText);
                    return;
                }

                const missions = await response.json();
                const random = missions[Math.floor(Math.random() * missions.length)];
                setMission(random);
            } catch (error) {
                console.error("Error fetching missions:", error);
            }
        };

        fetchMissions();
    }, []);

    const handleAccept = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`https://redesigned-fiesta-7prqx6pjjg9hr6g9-3001.app.github.dev/api/missions/${mission.id}/accept`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (res.ok) {
                setAccepted(true);
                alert(data.msg);
            } else {
                alert(data.msg || "Error accepting mission");
            }
        } catch (error) {
            console.error("Error accepting mission:", error);
        }
    };

    const handleComplete = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`https://redesigned-fiesta-7prqx6pjjg9hr6g9-3001.app.github.dev/api/missions/${mission.id}/complete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (res.ok) {
                setCompleted(true);
                alert(data.msg);
            } else {
                alert(data.msg || "Error completing mission");
            }
        } catch (error) {
            console.error("Error completing mission:", error);
        }
    };

    if (!mission) return <div>Loading...</div>;

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
                                <img
                                    src={mission.content_url || "https://via.placeholder.com/300"}
                                    alt={mission.title}
                                />
                            </div>
                            <div className={styles.taskTextContainer}>
                                <div className={styles.taskText}>
                                    <h2>{mission.title}</h2>
                                    <p>{mission.description}</p>
                                </div>
                                <div className={styles.taskButtons}>
                                    {!accepted && (
                                        <div className={styles.taskAccept} onClick={handleAccept}>
                                            Aceptar
                                        </div>
                                    )}
                                    {accepted && !completed && (
                                        <div className={styles.taskComplete} onClick={handleComplete}>
                                            Completar
                                        </div>
                                    )}
                                    {completed && (
                                        <div className={styles.taskCompletedMsg}>✅ ¡Misión completada!</div>
                                    )}
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
