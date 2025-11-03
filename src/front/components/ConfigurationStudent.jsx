import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UploadAvatar from "./UploadAvatar";
import { getNames } from "country-list";
import CategoriesSelect from "./CategoriesSelect";
import SkillsSelect from "./SkillsSelect";
import useGlobalReducer from "../hooks/useGlobalReducer";
import userServices from "../services/userServices";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

const ConfigurationStudent = () => {
  const { role } = useParams();
  const countries = getNames();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const { store } = useGlobalReducer();
  const [update, setUpdate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const options = [
    { value: "webdev", label: "Desarrollo Web" },
    { value: "ia", label: "Inteligencia Artificial" },
    { value: "datasci", label: "Ciencia de Datos" },
    { value: "cyber", label: "Ciberseguridad" },
    { value: "mobile", label: "Desarrollo Móvil" },
    { value: "devops", label: "DevOps" },
    { value: "uiux", label: "Diseño UI/UX" },
  ];

  const popularsSkill = [
    { value: "react", label: "React" },
    { value: "node", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "docker", label: "Docker" },
    { value: "git", label: "Git" },
  ];

  const [formData, setFormData] = useState({
    avatar: "",
    username: "",
    name: "",
    location: "España",           // valor por defecto
    experience_level: "BEGINNER", // valor por defecto
    interests: [],
    skills: [],
    language: "SPANISH",          // valor por defecto
  });

  // Cargar perfil del estudiante
  useEffect(() => {
    if (!store.user) return;
    userServices.getStudentProfile(store.user.id).then((data) => {
      if (data) {
        setUpdate(true);
        setFormData({
          username: data.username || "",
          name: data.name || "",
          location: data.location || "España",
          language: data.language || "SPANISH",
          experience_level: data.experience_level || "BEGINNER",
        });

        const formattedInterests = options.filter((opt) =>
          data.interests?.includes(opt.value)
        );
        setSelectedCategories(formattedInterests);

        const formattedSkills = popularsSkill.filter((sk) =>
          data.skills?.includes(sk.value)
        );
        setSkills(formattedSkills);
      }
    });
  }, [store.user]);

  // Limpiar alertas después de 3 segundos
  useEffect(() => {
    if (success || alertError) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setAlertError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, alertError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoriesValues = selectedCategories.map((c) => c.value);
    const skillsValues = skills.map((s) => s.value);

    const dataToSend = {
      ...formData,
      interests: categoriesValues,
      skills: skillsValues,
      avatar: store.user.avatarUrl,
      user_id: store.user.id,
      language: formData.language || "SPANISH",
      location: formData.location || "España",
    };

    const action = update
      ? userServices.updateStudentProfile(dataToSend, store.user.id)
      : userServices.createStudentProfile(dataToSend);

    action
      .then((res) => (res.success ? setSuccess(true) : setAlertError(true)))
      .catch(() => setAlertError(true));
  };

  return (
    <>
      {role === "student" && (
        <>
          <div className="my-4">
            <h2>Configura tu cuenta</h2>
            <UploadAvatar />
          </div>

          {success && <AlertSuccess message="Perfil guardado correctamente" />}
          {alertError && <AlertError message="Error al guardar el perfil" />}

          <form className="p-3" onSubmit={handleSubmit}>
            {/* Información personal */}
            <div className="form-metorprofile mb-5 p-5">
              <div className="h4 titles-form">Información personal</div>
              <p className="fs-6 info-form">Visible a los miembros</p>

              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Nombre de usuario</label>
                    <input
                      type="text"
                      value={formData.username}
                      name="username"
                      onChange={handleChange}
                      className="form-control form-input"
                      required
                    />
                  </div>
                </div>

                <div className="col-sm-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      value={formData.name}
                      name="name"
                      onChange={handleChange}
                      className="form-control form-input"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Ubicación</label>
                    <select
                      className="form-select form-input"
                      value={formData.location}
                      name="location"
                      onChange={handleChange}
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Lenguaje</label>
                    <select
                      className="form-select form-input"
                      value={formData.language}
                      name="language"
                      onChange={handleChange}
                    >
                      <option value="SPANISH">Español</option>
                      <option value="ENGLISH">Inglés</option>
                      <option value="FRENCH">Francés</option>
                      <option value="GERMAN">Alemán</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Nivel de experiencia</label>
                    <select
                      className="form-select form-input"
                      value={formData.experience_level}
                      name="experience_level"
                      onChange={handleChange}
                    >
                      <option value="BEGINNER">Principiante</option>
                      <option value="INTERMEDIATE">Intermedio</option>
                      <option value="ADVANCED">Avanzado</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Especialización */}
            <div className="form-metorprofile mb-5 p-5">
              <div className="h4 titles-form">Especialización</div>
              <p className="fs-6 info-form">
                Indica en qué categorías estás interesado
              </p>
              <CategoriesSelect
                value={selectedCategories}
                onChange={setSelectedCategories}
                options={options}
              />
            </div>

            {/* Skills */}
            <div className="form-metorprofile mb-5 p-5">
              <SkillsSelect
                skills={skills}
                setSkills={setSkills}
                popularsSkill={popularsSkill}
              />
              <p className="info-form">
                Describe tu experiencia para conectar con mentores
              </p>
            </div>

            <div className="d-flex justify-content-end my-2" >
              {success && <AlertSuccess />}
              {alertError && <AlertError />}
              <button type="submit" className="cta-send ms-5 ">Guardar</button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default ConfigurationStudent;
