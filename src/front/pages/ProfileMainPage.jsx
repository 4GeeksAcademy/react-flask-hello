import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/ProfileMainPage.module.css";
import avatarImg from "../assets/styles/images/Moti_Feliz.png";
import genieImg from "../assets/styles/images/Moti_Feliz.png";

const weekDays = ["L", "M", "X", "J", "V", "S", "D"];
const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  let day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

const ProfileMainPage = () => {
  const [profile, setProfile] = useState(null);
  const [missionsToday, setMissionsToday] = useState(() =>
    JSON.parse(localStorage.getItem("profile_missions_today")) || []
  );
  const [statsData, setStatsData] = useState(() =>
    JSON.parse(localStorage.getItem("profile_stats")) || null
  );
  const [motivationalQuote, setMotivationalQuote] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = getFirstDayOfWeek(currentYear, currentMonth);

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);
  
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

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
        setMissionsToday(data.missions_today);
        setStatsData(data.stats);
        localStorage.setItem("profile_missions_today", JSON.stringify(data.missions_today));
        localStorage.setItem("profile_stats", JSON.stringify(data.stats));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    const savedQuote = localStorage.getItem("daily_quote");
    const savedDate = localStorage.getItem("daily_quote_date");

    if (savedQuote && savedDate === todayStr) {
      setMotivationalQuote(savedQuote);
    } else {
      const fetchQuote = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quote`);
          const data = await res.json();
          const quote = `${data[0].q} — ${data[0].a}`;
          setMotivationalQuote(quote);
          localStorage.setItem("daily_quote", quote);
          localStorage.setItem("daily_quote_date", todayStr);
        } catch (err) {
          const fallback = "\u201cEl momento m\u00e1s oportuno para cambiar es ahora.\u201d — Desconocido";
          setMotivationalQuote(fallback);
        }
      };
      fetchQuote();
    }
  }, []);

  if (!profile) return <div className={styles.loading}>Loading...</div>;

  const { user, weekly_progress, calendar, achievements } = profile;

  return (
    <div className={styles.container}>
      <div className={styles.layoutGrid}>
        {/* CARD 1: Profile Info */}
        <div className={`${styles.card} ${styles.card1}`}>
          <h4 className={styles.cardTitle}>
            <strong>Name:</strong> {user.username}
          </h4>
          <p><strong>Years:</strong></p>
          <p><strong>Job:</strong></p>
          <p><strong>City:</strong></p>
          <button className={styles.editButton}>✏️</button>
        </div>

        {/* CARD 2: Today's Tasks */}
        <div className={`${styles.card} ${styles.card2}`}>
          <h4 className={styles.cardTitle}>Today's Tasks</h4>
          <ul className={styles.taskList}>
            {missionsToday.map((task, i) => (
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
            <div className={styles.levelInfo}>
              <p><strong>Lvl {user.level}</strong></p>
              <div className={styles.xpBar}>
                <div
                  className={styles.xpFill}
                  style={{ width: `${(user.xp_total % 1000) / 10}%` }}
                />
              </div>
              <p>{user.xp_total % 1000} / 1000</p>
            </div>
          </div>
        </div>

        {/* CARD 5: Calendar */}
        <div className={`${styles.card} ${styles.card5}`}>
          <div className={styles.calendarHeader}>
            <span onClick={handlePrevMonth} className={styles.calendarArrow}>&lt;</span>
            <span>{monthNames[currentMonth]} {currentYear}</span>
            <span onClick={handleNextMonth} className={styles.calendarArrow}>&gt;</span>
          </div>
          <div className={styles.calendarGrid}>
            {weekDays.map((d, i) => (
              <div key={i} className={styles.calendarDay}>{d}</div>
            ))}
            {calendarDays.map((day, i) => {
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();
              return (
                <div
                  key={i}
                  className={`${styles.calendarDate} ${isToday ? styles.highlightedDate : ""}`}
                >
                  {day ? day : ""}
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
              <p className={styles.statValue}>{statsData?.tasks_completed}</p>
            </div>
            <div>
              <p className={styles.statLabel}>Time in the app</p>
              <p className={styles.statValue}>{statsData?.time_in_app_days} days</p>
            </div>
            <div>
              <p className={styles.statLabel}>Daily missions</p>
              <p className={styles.statValue}>{statsData?.daily_missions_today}</p>
            </div>
            <div>
              <p className={styles.statLabel}>Total XP</p>
              <p className={styles.statValue}>{statsData?.total_xp}</p>
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

        {/* CARD 8: Week's progress */}
        <div className={`${styles.card} ${styles.card8}`}>
          <h4 className={styles.cardTitle}>Week's Progress</h4>
          <p>Total XP Gained This Week</p>

          <div className={styles.levelBar}>
            <div
              className={styles.levelFill}
              style={{ width: `${Math.min((weekly_progress.xp / 4200) * 100, 100)}%` }}
            />
          </div>

          <p><strong>+{weekly_progress.xp} XP</strong></p>

          {weekly_progress.xp >= 4200 && (
            <p style={{ color: '#5CFB7E', fontWeight: 'bold', marginTop: '0.5rem' }}>
              🎉 Weekly goal achieved!
            </p>
          )}
        </div>


        {/* CARD 9: Today's Reflection */}
        <div className={`${styles.card} ${styles.card9}`}>
          <h4 className={styles.cardTitle}>Today's Reflection</h4>
          <p style={{ fontStyle: "italic" }}>{motivationalQuote}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileMainPage;