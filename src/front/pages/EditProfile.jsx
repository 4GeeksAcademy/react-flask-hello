import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../assets/styles/EditProfile.module.css";
import avatarImg from "../assets/styles/images/Moti_Feliz.png";
import Particles from "../components/Particles";
import Navbar from "../components/Navbar";

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
    { id: 1, src: avatarImg },
    { id: 2, src: avatarImg },
    { id: 3, src: avatarImg },
    { id: 4, src: avatarImg },
    { id: 5, src: avatarImg },
    { id: 6, src: avatarImg },
    { id: 7, src: avatarImg },
    { id: 8, src: avatarImg },
    { id: 9, src: avatarImg },
    { id: 10, src: avatarImg }
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

  const handleAvatarSelect = (avatarSrc) => {
    setSelectedAvatar(avatarSrc);
    setProfile(prev => ({
      ...prev,
      avatar: avatarSrc
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            <form onSubmit={handleSubmit} className={styles.editProfileForm}>
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
              </div>
              <div className={styles.editProfileFormSection}>
                <div className={styles.editProfileInputGroup}>
                  <label htmlFor="username" className={styles.editProfileLabel}>
                    Nombre de Usuario
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profile.username}
                    onChange={handleInputChange}
                    className={styles.editProfileInput}
                    required
                  />
                </div>
                <div className={styles.editProfileInputGroup}>
                  <label htmlFor="firstName" className={styles.editProfileLabel}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    className={styles.editProfileInput}
                  />
                </div>
                <div className={styles.editProfileInputGroup}>
                  <label htmlFor="lastName" className={styles.editProfileLabel}>
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    className={styles.editProfileInput}
                  />
                </div>
                <div className={styles.editProfileInputGroup}>
                  <label htmlFor="age" className={styles.editProfileLabel}>
                    Edad
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={profile.age}
                    onChange={handleInputChange}
                    className={styles.editProfileInput}
                    min="1"
                    max="120"
                  />
                </div>
                <div className={styles.editProfileInputGroup}>
                  <label htmlFor="country" className={styles.editProfileLabel}>
                    País
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={profile.country}
                    onChange={handleInputChange}
                    className={styles.editProfileInput}
                    placeholder="España"
                  />
                </div>
                <div className={styles.editProfileInputGroup}>
                  <label htmlFor="city" className={styles.editProfileLabel}>
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={profile.city}
                    onChange={handleInputChange}
                    className={styles.editProfileInput}
                    placeholder="Barcelona"
                  />
                </div>
              </div>
              <div className={styles.editProfileHobbiesFullWidth}>
                <label htmlFor="hobbies" className={styles.editProfileLabel}>
                  Hobbies
                </label>
                <textarea
                  id="hobbies"
                  name="hobbies"
                  value={profile.hobbies}
                  onChange={handleInputChange}
                  className={`${styles.editProfileInput} ${styles.editProfileTextarea}`}
                  placeholder="Describe tus hobbies e intereses..."
                />
              </div>
              <div className={styles.editProfileButtonGroup}>
                <button 
                  type="button" 
                  className={`${styles.editProfileButton} ${styles.editProfileCancelButton}`}
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className={`${styles.editProfileButton} ${styles.editProfileSaveButton}`}
                >
                  Confirmar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;