import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/ProfileMainPage.module.css";
import avatarImg from "../assets/styles/images/Moti_Feliz.png";
import genieImg from "../assets/styles/images/Moti_Feliz.png";
import Particles from "../components/Particles";

const ranks = [
  { name: 'Iron', minLevel: 1, image: 'src/front/assets/styles/images/Motis/Moti_Hierro.png' },
  { name: 'Bronze', minLevel: 2, image: 'src/front/assets/styles/images/Motis/Moti_Bronce.png' },
  { name: 'Silver', minLevel: 5, image: 'src/front/assets/styles/images/Motis/Moti_Plata.png' },
  { name: 'Gold', minLevel: 10, image: 'src/front/assets/styles/images/Motis/Moti_Oro.png' },
  { name: 'Emerald', minLevel: 20, image: 'src/front/assets/styles/images/Motis/Moti_Esmeralda.png' },
  { name: 'Ruby', minLevel: 30, image: 'src/front/assets/styles/images/Motis/Moti_Rubi.png' },
  { name: 'Diamond', minLevel: 50, image: 'src/front/assets/styles/images/Motis/Moti_Diamante.png' },
  { name: 'Iridescent', minLevel: 100, image: 'src/front/assets/styles/images/Motis/Moti_Iridiscente.png' }
];

const getCurrentRank = (level) => {
  return ranks.reduce((highest, rank) => {
    if (level >= rank.minLevel && rank.minLevel >= highest.minLevel) {
      return rank;
    }
    return highest;
  }, ranks[0]);
};

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

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_avatar");
    localStorage.removeItem("profile_missions_today");
    localStorage.removeItem("profile_stats");
    localStorage.removeItem("daily_quote");
    localStorage.removeItem("daily_quote_date");
    
    // Redirigir al login
    navigate("/login");
  };

  useEffect(() => {
    if (!userId) {
      console.error("user_id not found in localStorage");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
        
        if (data.user?.avatar) {
          localStorage.setItem("user_avatar", data.user.avatar);
        }
        
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

    // Add an interval to periodically refresh the profile data
    const refreshInterval = setInterval(fetchProfile, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(refreshInterval);
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
      <button 
        className={styles.logoutButton}
        onClick={handleLogout}
        title="Cerrar sesión"
      >
        <i className="fas fa-sign-out-alt"></i>
      </button>
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
      <div className={styles.layoutGrid}>
        {/* CARD 1: Profile Info */}
        <div className={`${styles.card} ${styles.card1}`}>
          <h3 className={styles.cardTitle}>
            Your Rank
          </h3>
          <div className={styles.rankDisplay}>
            {(() => {
              const currentRank = getCurrentRank(user.level);
              return (
                <>
                  <img 
                    src={currentRank.image}
                    alt={`${currentRank.name} Rank`}
                    className={styles.rankMoty}
                  />
                  <h4 style={{ 
                    margin: '0.5rem 0 0 0',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {currentRank.name}
                  </h4>
                  <p style={{ 
                    margin: '0.5rem 0 0 0',
                    fontSize: '0.9rem',
                    opacity: '0.8' 
                  }}>
                    Level {user.level}
                  </p>
                </>
              );
            })()}
          </div>
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
            <div className={styles.avatarContainer}>
              <img 
                src={localStorage.getItem("user_avatar") || user.avatar_url || genieImg} 
                alt="Avatar" 
                className={styles.avatarImage} 
              />
              <button 
                className={styles.editProfileButton}
                onClick={() => navigate('/edit-profile')}
                title="Edit Profile"
              >
                <i className="fas fa-edit"></i>
              </button>
            </div>
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
            {achievements.map((achievement, i) => (
              <div key={i} className={styles.achievementIcon}>
                <i className={iconMap[achievement.key] || "fas fa-star"} />
              </div>
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