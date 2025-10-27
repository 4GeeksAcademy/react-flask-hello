import React, { useEffect } from "react"
import { useParams } from "react-router-dom";
import UploadAvatar from "./UploadAvatar";
import { div } from "framer-motion/client";
import { useState } from "react";
import { getNames } from "country-list";
import CategoriesSelect from "./CategoriesSelect";
import SkillsSelect from "./SkillsSelect";
import useGlobalReducer from "../hooks/useGlobalReducer";
import userServices from "../services/userServices";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

const ConfigurationMentor = () => {
    const { role } = useParams();
    const countries = getNames()
    const [selectedCategories, setSelectedCategories] = useState([])
    const [skills, setSkills] = useState([])
    const { store, dispatch } = useGlobalReducer()
    const [update, setUpdate] = useState(false)
    const [success, setSuccess] = useState(false)
    const [alertError, setAlertError] = useState(false)

    const options = [
        { value: "webdev", label: "Desarrollo Web" },
        { value: "ia", label: "Inteligencia Artificial" },
        { value: "datasci", label: "Ciencia de Datos" },
        { value: "cyber", label: "Ciberseguridad" },
        { value: "mobile", label: "Desarrollo Móvil" },
        { value: "devops", label: "DevOps" },
        { value: "uiux", label: "Diseño UI/UX" },
    ]

    const popularsSkill = [
        { value: "react", label: "React" },
        { value: "node", label: "Node.js" },
        { value: "python", label: "Python" },
        { value: "docker", label: "Docker" },
        { value: "git", label: "Git" },
    ]


    const [formData, setFormData] = useState({
        avatar: " ",
        username: " ",
        name: " ",
        location: " ",
        hourly_rate: " ",
        years_experience: " ",
        linkedin_url: " ",
        website: " ",
        interests: " ",
        bio: " ",
        skills: " ",
        language: " "

    });

    useEffect(() => {
        userServices.getMentorProfile(store.user.id).then(async data => {
            // console.log(data)
            if (data != undefined) {
                setUpdate(true)
                setFormData({
                    username: data.username,
                    name: data.name,
                    location: data.location,
                    hourly_rate: data.hourly_rate,
                    linkedin_url: data.linkedin_url,
                    website: data.website,
                    bio: data.bio,
                    language: data.language,
                    years_experience: data.years_experience
                })

                //Damos formatos a los campos de skill y Intereses
                const formattedInterests = options.filter(opt =>
                    data.interests?.includes(opt.value)
                );
                setSelectedCategories(formattedInterests);

                const formattedSkills = popularsSkill.filter(sk =>
                    data.skills?.includes(sk.value)
                )
                setSkills(formattedSkills)

                //console.log("Datos del perfil--->", data)
            }
        })
    }, []);


    useEffect(() => {
        if (success || alertError) {
            const timer = setTimeout(() => {
                setSuccess(false);
                setAlertError(false)
            }, 3000); 
        
              
            return () => clearTimeout(timer);
        }
    }, [success, alertError]);


    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        //console.log("Data Mentor---->>>>>", formData)

    }



    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log("Aqui store user--->", store.user)
        const categoriesValues = selectedCategories.map(categorie => categorie.value)
        const skillsValues = skills.map(skill => skill.value)
        // console.log("Categorias seleccionadas--->>", categoriesValues)

        const dataToSend = {
            ...formData,
            interests: categoriesValues,
            skills: skillsValues,
            avatar: store.user.avatarUrl,
            user_id: store.user.id

        }
        console.log("Informacion del perfil--->>", dataToSend)

        if (update) {
            userServices.putMentorProfile(dataToSend, store.user.id).then(data => {
                console.log("Data desde el back----->", data)

                if (data.success) {
                    setSuccess(true)
                } else{
                    setAlertError(true)
                }

            })
        } else {
            userServices.mentorprofile(dataToSend).then(data => {
                console.log("Data desde el back----->", data)

                if (data.success) {
                    setSuccess(true)
                } else{
                    setAlertError(true)
                }

            })

        }


    }




    return (
        <>
            {role === 'mentor' &&
                <>

                    <div className="my-4">
                        <h2 >Configura tu cuenta</h2>

                        <UploadAvatar />
                    </div>
                    <div  >
                        <form className="p-3" onSubmit={handleSubmit}>
                            <div className="form-metorprofile mb-5 p-5"> {/*primera parte del perfil */}
                                <div className="h4 titles-form">Informacion personal</div>
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
                                                id="exampleInputUserName"
                                                aria-describedby="usernameHelp"
                                                required
                                            ></input>
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
                                                id="exampleInputName"
                                                aria-describedby="nameHelp"
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Ubicación</label>

                                            <select className="form-select form-input" id="inputGroupSelect01" value={formData.location} name="location" onChange={handleChange}>
                                                {countries.map(country => (
                                                    <option key={country} value={country}>{country}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Tarifa por hora</label>
                                            <input
                                                type="number"
                                                value={formData.hourly_rate}
                                                name="hourly_rate"
                                                onChange={handleChange}
                                                className="form-control form-input"
                                                id="exampleInputhourlyRate"
                                                aria-describedby="hourlyRateHelp"

                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Años de experiencia</label>
                                            <input
                                                type="number"
                                                value={formData.years_experience}
                                                name="years_experience"
                                                onChange={handleChange}
                                                className="form-control form-input"
                                                id="exampleInputyearsExperience"
                                                aria-describedby="yearsExperienceHelp"
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">LinkedIn URL</label>
                                            <input
                                                type="text"
                                                value={formData.linkedin_url}
                                                name="linkedin_url"
                                                onChange={handleChange}
                                                className="form-control form-input"
                                                id="exampleInputlinkedinUrl"
                                                aria-describedby="hourlylinkedinUrl"

                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Website personal</label>
                                            <input
                                                type="text"
                                                value={formData.website}
                                                name="website"
                                                onChange={handleChange}
                                                className="form-control form-input"
                                                id="exampleInputwebsite"
                                                aria-describedby="websiteHelp"
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label">Lenguaje</label>

                                                <select className="form-select form-input" id="inputGroupSelect01" value={formData.language} name="language" onChange={handleChange}>
                                                    <option selected>Indica su idioma...</option>
                                                    <option value="SPANISH">Español</option>
                                                    <option value="ENGLISH">Ingles</option>
                                                    <option value="FRENCH">Frances</option>
                                                    <option value="GERMAN">Aleman</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-metorprofile mb-5 p-5"> {/*segunda parte del perfil */}
                                <div className="h4 titles-form">Especialización</div>
                                <p className="fs-6  info-form">Indica en que categorias estas interesado</p>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <CategoriesSelect
                                                value={selectedCategories}
                                                onChange={setSelectedCategories}
                                                options={options} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-metorprofile mb-5 p-5"> {/*tercera parte del perfil */}
                                <div className="h4 titles-form">Tu perfil de mentor</div>
                                <p className="fs-6  info-form">Escribe el texto de tu perfil de mentor y deja que tus aprendices sepan que temas cubres</p>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Biografia</label>
                                            <textarea
                                                rows={5}
                                                cols={50}
                                                value={formData.bio}
                                                name="bio"
                                                onChange={handleChange}
                                                className="form-control form-input"
                                                id="exampleInputBio"
                                                aria-describedby="bioHelp"
                                            ></textarea>
                                            <p className="info-form">Cuéntanos (y a tus aprendices) un poco sobre ti. Habla de ti en primera persona, como si hablaras directamente con un aprendiz. Esto será público.</p>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <SkillsSelect
                                                skills={skills}
                                                setSkills={setSkills}
                                                popularsSkill={popularsSkill}
                                            />
                                            <p className="info-form">Describe tu experiencia para conectar con aprendices con intereses similares</p>
                                        </div>
                                    </div>
                                </div>
                            </div>






                            <div className="d-flex justify-content-end my-2" >
                                {success && <AlertSuccess />}
                                 {alertError && <AlertError />}
                                <button type="submit" className="cta-send ms-5 ">Guardar</button>
                            </div>
                        </form>
                    </div>
                </>
            }
            {role === 'student' &&
                <h2>Aqui renderiza Configuracion de {role}</h2>
            }

        </>
    )
}

export default ConfigurationMentor