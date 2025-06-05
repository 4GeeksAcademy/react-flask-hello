import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        sports: ""
    });

    useEffect(() => {
        // Obtener datos del usuario desde localStorage
        const userData = JSON.parse(localStorage.getItem("userData"));

        if (userData) {
            setProfile({
                username: userData.name || "",
                email: userData.email || "",
                sports: userData.sports || ""
            });
        }
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));


        const updatedUserData = {
            ...userData,
            sports: profile.sports
        };

        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        setIsEditing(false);
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

                            <h2>{profile.username}</h2>
                            <p className="text-muted">{profile.email}</p>


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

                            <button className="btn btn-outline-success mt-4" onClick={handleSave}>
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
