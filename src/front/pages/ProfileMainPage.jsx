import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/ProfileMainPage.module.css";
import avatarImg from "../assets/styles/images/Moti_Feliz.png";
import genieImg from "../assets/styles/images/Moti_Feliz.png";

const ProfileMainPage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      console.error("user_id not found in localStorage");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${userId}`);
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  if (!profile) return <div className={styles.loading}>Loading...</div>;

  const {
    user,
    missions_today,
    stats,
    weekly_progress,
    calendar,
    achievements,
    reflection
  } = profile;

  return (
    <div className={styles.container}>
      <div className={styles.layoutGrid}>
        {/* CARD 1: Profile Info */}
        <div className={`${styles.card} ${styles.card1}`}>
          <h4 className={styles.cardTitle}>
            <strong>Name:</strong> {user.username}
          </h4>
          <p><strong>Years:</strong> {/* Edad si la tienes */}</p>
          <p><strong>Job:</strong> {/* Profesión si la tienes */}</p>
          <p><strong>City:</strong> {/* Ciudad si la tienes */}</p>
          <button className={styles.editButton}>✏️</button>
        </div>

        {/* CARD 2: Today’s Tasks */}
        <div className={`${styles.card} ${styles.card2}`}>
          <h4 className={styles.cardTitle}>Today’s Tasks</h4>
          <ul className={styles.taskList}>
            {missions_today.map((task, i) => (
              <li key={i} className={styles.taskItem}>
                {task.title}
                <span className={`${styles.statusDot} ${
                  task.status === "completed"
                    ? styles.done
                    : task.status === "in_progress"
                    ? styles.inProgress
                    : styles.pending
                }`} />
              </li>
            ))}
          </ul>
          <button
            className={styles.button}
            onClick={() => navigate('/task')}
          >
            ALL CONTENT
          </button>
        </div>

        {/* CARD 3: Hero */}
        <div className={styles.heroCard}>
          <div className={styles.heroText}>
            <h2>Hello, <strong>{user.username}!</strong></h2>
            <p>Your inner journey continues today.</p>
            <p>Your path to a stronger, wiser, and more focused version of yourself begins with a single step.</p>
            <button
            className={styles.button}
            onClick={() => navigate('/journey')}
            >
              ALL CONTENT
            </button>
          </div>
          <img src={genieImg} alt="Genie" className={styles.heroImage} />
        </div>

        {/* CARD 4: Avatar */}
        <div className={`${styles.card} ${styles.card4}`}>
          <div className={styles.avatarBlock}>
            <img src={avatarImg} alt="Avatar" className={styles.avatarImage} />
            <div>
              <strong>{user.username}</strong>
              <div className={styles.levelBar}>
                <div className={styles.levelFill}></div>
              </div>
              <p>Lvl {user.level}</p>
            </div>
          </div>
        </div>

        {/* CARD 5: Calendar */}
        <div className={`${styles.card} ${styles.card5}`}>
          <div className={styles.calendarHeader}>
            <span>&lt;</span>
            <span>May 2025</span>
            <span>&gt;</span>
          </div>
          <div className={styles.calendarGrid}>
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} className={styles.calendarDay}>{d}</div>
            ))}
            {[...Array(31)].map((_, i) => {
              const date = i + 1;
              const isCompleted = calendar.some(c => new Date(c.date).getDate() === date);
              return (
                <div
                  key={i}
                  className={`${styles.calendarDate} ${isCompleted ? styles.highlightedDate : ""}`}
                >
                  {date}
                </div>
              );
            })}
          </div>
        </div>

        {/* CARD 6: Global Stats */}
        <div className={`${styles.card} ${styles.card6}`}>
          <h4 className={styles.cardTitle}>Global Stats</h4>
          <div className={styles.statsGrid}>
            <div>
              <p className={styles.statLabel}>Tasks completed</p>
              <p className={styles.statValue}>{stats.tasks_completed}</p>
            </div>
            <div>
              <p className={styles.statLabel}>Time in the app</p>
              <p className={styles.statValue}>{stats.time_in_app_days} days</p>
            </div>
            <div>
              <p className={styles.statLabel}>Daily missions</p>
              <p className={styles.statValue}>{stats.daily_missions_today}</p>
            </div>
            <div>
              <p className={styles.statLabel}>Total XP</p>
              <p className={styles.statValue}>{user.xp_total}</p>
            </div>
          </div>
        </div>

        {/* CARD 7: Achievements */}
        <div className={`${styles.card} ${styles.card7}`}>
          <div className={styles.cardHeaderWithBtn}>
            <h4 className={styles.cardTitle}>Achievements</h4>
            <button
            className={styles.button}
            onClick={() => navigate('/achievements')}
            >
              ALL CONTENT
            </button>
          </div>
          <div className={styles.achievementsGrid}>
            {achievements.map((ach, i) => (
              <img
                key={i}
                src={avatarImg}
                alt={ach.title}
                className={styles.achievementIcon}
              />
            ))}
          </div>
        </div>

        {/* CARD 8: Week’s progress */}
        <div className={`${styles.card} ${styles.card8}`}>
          <h4 className={styles.cardTitle}>Week’s progress</h4>
          <p>Missions</p>
          <div className={styles.levelBar}>
            <div className={styles.levelFill}></div>
          </div>
          <p>XP Gained: <strong>+{weekly_progress.xp}</strong></p>
        </div>

        {/* CARD 9: Today’s Reflection */}
        <div className={`${styles.card} ${styles.card9}`}>
          <h4 className={styles.cardTitle}>Today’s Reflection</h4>
          <p>{reflection}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileMainPage;
