import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../assets/styles/EditProfile.module.css";
import avatarImg from "../assets/styles/images/Moti_Feliz.png";
import Particles from "../components/Particles";
import Navbar from "../components/Navbar";
import avatar1 from "../assets/styles/images/Avatars/Avatar de mujer con gafas.png";
import avatar2 from "../assets/styles/images/Avatars/Chica con cabello azul y camiseta amarilla.png";
import avatar3 from "../assets/styles/images/Avatars/Joven con camiseta negra y cabello naranja.png";
import avatar4 from "../assets/styles/images/Avatars/Mujer con gafas y sonrisa amigable.png";
import avatar5 from "../assets/styles/images/Avatars/Retrato amistoso de mujer sonriente.png";
import avatar6 from "../assets/styles/images/Avatars/Retrato digital de joven sonriente.png";
import avatar7 from "../assets/styles/images/Avatars/Retrato digital de un joven.png";
import avatar8 from "../assets/styles/images/Avatars/Retrato en estilo minimalista.png";
import avatar9 from "../assets/styles/images/Avatars/Retrato estilizado con gafas negras.png";
import avatar10 from "../assets/styles/images/Avatars/Retrato minimalista de hombre joven.png";
import avatar11 from "../assets/styles/images/Avatars/Retrato minimalista de joven sonriente.png";
import avatar12 from "../assets/styles/images/Avatars/Retrato minimalista de mujer afro joven.png";
import avatar13 from "../assets/styles/images/Avatars/Retrato minimalista de mujer joven (1).png";
import avatar14 from "../assets/styles/images/Avatars/Retrato minimalista de mujer joven.png";
import avatar15 from "../assets/styles/images/Avatars/Retrato minimalista de mujer sonriente (1).png";
import avatar16 from "../assets/styles/images/Avatars/Retrato minimalista de mujer sonriente.png";
import avatar17 from "../assets/styles/images/Avatars/Retrato minimalista de personaje masculino.png";
import avatar18 from "../assets/styles/images/Avatars/Retrato minimalista krula de mujer joven.png";
import avatar19 from "../assets/styles/images/Avatars/Rostro cálido y acogedor.png";
import avatar20 from "../assets/styles/images/Avatars/Retrato minimalista de un joven.png";

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevPath = useRef(location.state?.from || "/profilemainpage");

  const [profile, setProfile] = useState({
    username: "",
    firstName: "",
    lastName: "",
    age: "",
    country: "",
    city: "",
    hobbies: "",
    avatar: ""
  });
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  const avatares = [
    { id: 1, src: avatar1 },
    { id: 2, src: avatar2 },
    { id: 3, src: avatar3 },
    { id: 4, src: avatar4 },
    { id: 5, src: avatar5 },
    { id: 6, src: avatar6 },
    { id: 7, src: avatar7 },
    { id: 8, src: avatar8 },
    { id: 9, src: avatar9 },
    { id: 10, src: avatar10 },
    { id: 11, src: avatar11 },
    { id: 12, src: avatar12 },
    { id: 13, src: avatar13 },
    { id: 14, src: avatar14 },
    { id: 15, src: avatar15 },
    { id: 16, src: avatar16 },
    { id: 17, src: avatar17 },
    { id: 18, src: avatar18 },
    { id: 19, src: avatar19 },
    { id: 20, src: avatar20 },
  ];

  useEffect(() => {
    setProfile({
      username: "David Castillo",
      firstName: "David",
      lastName: "Castillo",
      age: "29",
      country: "España",
      city: "Barcelona",
      hobbies: "Arquitectura, Diseño, Programación",
      avatar: avatarImg
    });
    setSelectedAvatar(avatarImg);
    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarSelect = async (avatarSrc) => {
    try {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        throw new Error("No hay sesión activa. Por favor, inicia sesión de nuevo.");
      }

      // Guardar en localStorage primero para UI inmediata
      localStorage.setItem("user_avatar", avatarSrc);
      setSelectedAvatar(avatarSrc);
      setProfile(prev => ({
        ...prev,
        avatar: avatarSrc
      }));

      console.log("Enviando petición con:", {
        userId,
        token,
        avatarSrc
      });

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${userId}/avatar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          avatar_url: avatarSrc 
        })
      });

      console.log("Respuesta del servidor:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        throw new Error(errorData.msg || "Error al actualizar el avatar");
      }

      const data = await response.json();
      console.log("Datos recibidos:", data);
      
      if (data.msg === "Avatar actualizado exitosamente") {
        navigate(prevPath.current);
      } else {
        throw new Error(data.msg || "Error al actualizar el avatar");
      }
    } catch (error) {
      console.error("Error completo:", error);
      alert(error.message || "Error al actualizar el avatar. Por favor, inténtalo de nuevo.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("profile_info", JSON.stringify(profile));
    localStorage.setItem("user_avatar", profile.avatar);
    alert("Perfil actualizado exitosamente");
    navigate("/profilemainpage");
  };

  const handleCancel = () => {
    navigate(prevPath.current);
  };

  const handleClose = () => {
    navigate(prevPath.current);
  };

  if (loading) return <div className={styles.editProfileLoading}>Cargando...</div>;

  return (
    <div className={styles.editProfileFullScreen}>
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
      <button className={styles.editProfileClose} onClick={handleClose} aria-label="Cerrar">
        ×
      </button>
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <div className={styles.editProfileContainer}>
          <div className={styles.editProfileCard}>
            <h2 className={styles.editProfileTitle}>Editar Perfil</h2>
            <div className={styles.editProfileAvatarSection}>
              <h3 className={styles.editProfileAvatarTitle}>Selecciona tu Avatar</h3>
              <div className={styles.editProfileAvatarGrid}>
                {avatares.map(avatar => (
                  <div
                    key={avatar.id}
                    className={`${styles.editProfileAvatarOption} ${
                      selectedAvatar === avatar.src ? styles.editProfileAvatarOptionSelected : ""
                    }`}
                    onClick={() => handleAvatarSelect(avatar.src)}
                  >
                    <img 
                      src={avatar.src} 
                      alt={`Avatar ${avatar.id}`} 
                      className={styles.editProfileAvatarImage}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.editProfileButtonGroup}>
                <button 
                  type="button" 
                  className={`${styles.editProfileButton} ${styles.editProfileCancelButton}`}
                  onClick={handleClose}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className={`${styles.editProfileButton} ${styles.editProfileSaveButton}`}
                  onClick={() => {
                    localStorage.setItem("selected_avatar", selectedAvatar);
                    handleClose();
                  }}
                >
                  Aplicar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;