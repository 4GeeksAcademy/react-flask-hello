import React from "react";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar2 from "../components/Navbar2";
import CarouselContent from "../components/CarouselContent";
import Aurora from "../components/Aurora";
import styles from "../assets/styles/Content.module.css";

// Imágenes locales para las tasks
import coldshowerImg from "../assets/styles/images/coldshower.png";
import journalingImg from "../assets/styles/images/journaling.jpg";
import earlywakeupImg from "../assets/styles/images/early_wakeup.jpg";
import mindfulwalkImg from "../assets/styles/images/mindful_walk.jpg";
import declutterImg from "../assets/styles/images/declutter.jpg";
import hydrationImg from "../assets/styles/images/hydration.jpg";
import gratitudeImg from "../assets/styles/images/gratitude.jpg";
import healthymealImg from "../assets/styles/images/healthy_meal.jpg";

const Content = () => {
  const navigate = useNavigate();

  const videos = [
    {
      thumbnail: "https://res.cloudinary.com/dgknhbs4e/image/upload/v1747374955/videosimg_m7ihuo.jpg",
      title: "Meditación Guiada",
      url: "https://res.cloudinary.com/dgknhbs4e/video/upload/v1747349307/7_Principios_Estoicos_para_MANTENER_La_Calma__Estoicismo_bzkc44.mp4",
      type: "video"
    },
    {
      thumbnail: "https://res.cloudinary.com/dgknhbs4e/image/upload/v1747374955/videosimg_m7ihuo.jpg",
      title: "Ejercicios de Respiración",
      url: "https://res.cloudinary.com/dgknhbs4e/video/upload/v1747349283/7_PRINCIPIOS_De_La_Mujer_Estoica__ESTOICISMO_emuefg.mp4",
      type: "video"
    }
  ];

  const podcasts = [
    {
      thumbnail: "https://res.cloudinary.com/dgknhbs4e/image/upload/v1747374947/podcastimg_hq6avc.png",
      title: "Mindfulness Diario",
      url: "https://res.cloudinary.com/dgknhbs4e/video/upload/v1747349249/Para_quienes_luchan_con_el_d%C3%A9ficit_de_atenci%C3%B3n_dkhjhm.mp3",
      type: "audio"
    },
    {
      thumbnail: "https://res.cloudinary.com/dgknhbs4e/image/upload/v1747374947/podcastimg_hq6avc.png",
      title: "Música Relajante",
      url: "https://res.cloudinary.com/dgknhbs4e/video/upload/v1747349245/Miedo_al_cambio_y_a_lo_nuevo_voz2_wnp51c.mp3",
      type: "audio"
    },
    {
      thumbnail: "https://res.cloudinary.com/dgknhbs4e/image/upload/v1747374947/podcastimg_hq6avc.png",
      title: "Música Relajante",
      url: "https://res.cloudinary.com/dgknhbs4e/video/upload/v1747349283/7_PRINCIPIOS_De_La_Mujer_Estoica__ESTOICISMO_emuefg.mp4",
      type: "audio"
    },
    {
      thumbnail: "https://res.cloudinary.com/dgknhbs4e/image/upload/v1747374947/podcastimg_hq6avc.png",
      title: "Música Relajante",
      url: "https://res.cloudinary.com/dgknhbs4e/video/upload/v1747349283/7_PRINCIPIOS_De_La_Mujer_Estoica__ESTOICISMO_emuefg.mp4",
      type: "audio"
    },
    {
      thumbnail: "https://res.cloudinary.com/dgknhbs4e/image/upload/v1747374947/podcastimg_hq6avc.png",
      title: "Música Relajante",
      url: "https://res.cloudinary.com/dgknhbs4e/video/upload/v1747349245/Cuando_los_dem%C3%A1s_no_te_entienden_yzfciz.mp3",
      type: "audio"
    }
  ];

  const tasks = [
    {
      thumbnail: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5",
      title: "Workout",
      description: "Full-body strength training to improve endurance and muscle tone.",
      missionId: 1,
      type: "task"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
      title: "Running",
      description: "Cardio exercise to boost heart health and stamina.",
      missionId: 2,
      type: "task"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1554244933-d876deb6b2ff",
      title: "Meditation",
      description: "Mindfulness practice to reduce stress and improve focus.",
      missionId: 3,
      type: "task"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0",
      title: "Mobility",
      description: "Improve flexibility and prevent injury through mobility drills.",
      missionId: 4,
      type: "task"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1593164842264-854604db2260",
      title: "Yoga",
      description: "Combine movement and breath to enhance body-mind connection.",
      missionId: 5,
      type: "task"
    },
    {
      thumbnail: hydrationImg,
      title: "Hydration",
      description: "Track your water intake today and stay well hydrated.",
      missionId: 6,
      type: "task"
    },
    {
      thumbnail: healthymealImg,
      title: "Healthy Meal",
      description: "Prepare and eat a healthy meal packed with vegetables.",
      missionId: 7,
      type: "task"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1588776814546-bc89fd67f1c1",
      title: "Stretching",
      description: "10-minute stretch session to improve posture and blood flow.",
      missionId: 8,
      type: "task"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      title: "Digital Detox",
      description: "Avoid social media and screens for at least 1 hour today.",
      missionId: 9,
      type: "task"
    },
    {
      thumbnail: gratitudeImg,
      title: "Gratitude",
      description: "Write down 3 things you're grateful for today.",
      missionId: 10,
      type: "task"
    },
    {
      thumbnail: journalingImg,
      title: "Journaling",
      description: "Take 10 minutes to write freely about your day or goals.",
      missionId: 11,
      type: "task"
    },
    {
      thumbnail: mindfulwalkImg,
      title: "Mindful Walk",
      description: "Go for a walk and focus on sights, sounds, and sensations.",
      missionId: 12,
      type: "task"
    },
    {
      thumbnail: declutterImg,
      title: "Declutter",
      description: "Organize one space in your home to reduce visual noise.",
      missionId: 13,
      type: "task"
    },
    {
      thumbnail: coldshowerImg,
      title: "Cold Shower",
      description: "Start your day with a cold shower for energy and discipline.",
      missionId: 14,
      type: "task"
    },
    {
      thumbnail: earlywakeupImg,
      title: "Early Wake-Up",
      description: "Wake up 30 minutes earlier and use that time for yourself.",
      missionId: 15,
      type: "task"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1544716278-e513176f20b5",
      title: "Read",
      description: "Read 10+ pages from any book that inspires or educates.",
      missionId: 16,
      type: "task"
    }
  ];

  const handleItemClick = (item) => {
    if (item.type === 'task') {
      const userId = localStorage.getItem("user_id");
      localStorage.setItem(`${userId}_currentMission`, item.missionId);
      navigate("/task", {
        state: { fromContent: true }
      });
    } else {
      navigate("/task-video", {
        state: {
          mediaType: item.type,
          url: item.url,
          title: item.title
        }
      });
    }
  };

  return (
    <ScrollToTop>
      <div className={styles.contentPage}>
        <Aurora
          colorStops={["#8e24aa", "#651fff", "#ff6f61"]}
          blend={0.2}
          amplitude={0.8}
          speed={0.8}
        />
        <div className={styles.contentOverlay}></div>
        <Navbar2 />
        <main className={styles.contentMainArea}>
          <section className={styles.contentSection}>
            <h2 className={styles.contentSectionTitle}>Videos</h2>
            <CarouselContent items={videos} onItemClick={handleItemClick} />
          </section>

          <section className={styles.contentSection}>
            <h2 className={styles.contentSectionTitle}>Podcasts</h2>
            <CarouselContent items={podcasts} onItemClick={handleItemClick} />
          </section>

          <section className={styles.contentSection}>
            <h2 className={styles.contentSectionTitle}>Tasks</h2>
            <CarouselContent items={tasks} onItemClick={handleItemClick} />
          </section>
        </main>
      </div>
    </ScrollToTop>
  );
};

export default Content;
