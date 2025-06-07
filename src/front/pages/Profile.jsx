import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        sports: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const toggleEdit = () => setIsEditing(!isEditing);

    return (
        <div
            style={{
                backgroundImage: "url('/Escalada.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                width: "100%",
                position: "relative"
            }}
        >
            <Navbar />

            <div
                className=" align-items-center"
                style={{
                    minHeight: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    paddingTop: "70px",
                    paddingLeft: "70px"
                }}
            >
                <div
                    className="text-center p-5 rounded"
                    style={{
                        maxWidth: "400px",
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        color: "#2f7d5c",
                        width: "100%"
                    }}
                >
                    <img
                        src="/logo_sin_fondo.png"
                        alt="SportConnect"
                        height="50"
                        className="mb-3"
                    />

                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                className="form-control mb-3"
                                name="username"
                                value={profile.username}
                                onChange={handleChange}
                                placeholder="Name"
                            />
                            <input
                                type="email"
                                className="form-control mb-3"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                placeholder="ejemplo@gmail.com"
                            />
                            <input
                                type="text"
                                className="form-control mb-3"
                                name="sports"
                                value={profile.sports}
                                onChange={handleChange}
                                placeholder="Deportes favoritos (separados por coma)"
                            />
                            <button className="btn btn-success" onClick={toggleEdit}>
                                Guardar cambios
                            </button>
                        </>
                    ) : (
                        <>
                            <h2>{profile.username}</h2>
                            <p className="text-muted">{profile.email}</p>

                            <h5 className="mt-4">Deportes favoritos</h5>
                            <ul className="list-inline">
                                {profile.sports
                                    .split(",")
                                    .map((sport, index) => (
                                        <li
                                            key={index}
                                            className="list-inline-item badge bg-success me-2"
                                        >
                                            {sport.trim()}
                                        </li>
                                    ))}
                            </ul>

                            <button className="btn btn-outline-success mt-4" onClick={toggleEdit}>
                                Editar Perfil
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
