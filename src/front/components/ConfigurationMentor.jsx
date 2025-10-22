import React from "react"
import { useParams } from "react-router-dom";
import UploadAvatar from "./UploadAvatar";
import { div } from "framer-motion/client";
import { useState } from "react";
import { getNames } from "country-list";
import CategoriesSelect from "./CategoriesSelect";
import SkillsSelect from "./SkillsSelect";

const ConfigurationMentor = () => {
    const { role } = useParams();
    const countries = getNames()
    const [selectedCategories, setSelectedCategories] = useState([])
    const [skills, setSkills] = useState([])

    const [formData, setFormData] = useState({
        username:" ",
        name:" ",
        avatar:" ",
        location:" ",
        hourlyRate:" ",
        yearsExperience:" ",
        linkedinUrl:" ",
        website:" ",
        interests:" ",
        bio:" ",






    });

    const handleChange = () => {
        
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const categoriesValues = selectedCategories.map(categorie => categorie.value)

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
                                                value={formData.hourlyRate}
                                                name="hourlyRate"
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
                                                value={formData.yearsExperience}
                                                name="yearsExperience"
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
                                                value={formData.linkedinUrl}
                                                name="linkedinUrl"
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
                                              onChange={setSelectedCategories}/>

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
                                                />
                                           <p className="info-form">Describe tu experiencia para conectar con aprendices con intereses similares</p>
                                        </div>
                                    </div>
                                </div>
                            </div>






                            <div className="d-flex justify-content-end my-2" >
                                <button type="submit" className="cta-send">Guardar</button>
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