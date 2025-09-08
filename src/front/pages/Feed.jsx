import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";



const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [selectedSport, setSelectedSport] = useState("all");

    useEffect(() => {
        // Posts iniciales vacíos (los traerás luego desde la API)
        setPosts([]);
    }, []);

    const handleToggleFavorite = (id) => {
        setPosts(posts.map(post =>
            post.id === id ? { ...post, isFavorite: !post.isFavorite } : post
        ));
    };

    const handleJoin = (id) => {
        setPosts(posts.map(post =>
            post.id === id
                ? (post.participants < post.capacity
                    ? { ...post, participants: post.participants + 1 }
                    : post)
                : post
        ));
    };



    let filteredPosts = posts;

    if (activeTab === "favorites") {
        filteredPosts = filteredPosts.filter(post => post.isFavorite);
    }

    if (selectedSport !== "all") {
        filteredPosts = filteredPosts.filter(post => post.sport === selectedSport);
    }



    return (
        <div
            className="bg-light min-vh-100"
            style={{
                backgroundImage: `url("/FondoFeed.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed"
            }}
        >
            <Navbar />

            <div className="container mt-5 text-white">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="btn-group mb-4">
                        <button
                            className={`btn ${activeTab === "all" ? "btn-success" : "btn-outline-success"} text-black`}
                            onClick={() => setActiveTab("all")}
                        >
                            Todos
                        </button>
                        <button
                            className={`btn ${activeTab === "favorites" ? "btn-success" : "btn-outline-success"} text-black`}
                            onClick={() => setActiveTab("favorites")}
                        >
                            Favoritos ❤️
                        </button>

                        <div className="dropdown ms-2">
                            <button
                                className="btn btn-outline-success dropdown-toggle text-black"
                                type="button"
                                id="filterDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Filtros
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                                <li>
                                    <button className="dropdown-item" onClick={() => setSelectedSport("all")}>
                                        Todos los deportes
                                    </button>
                                </li>
                                {["Escalada", "Running", "Ciclismo", "Fitness"].map((sport) => (
                                    <li key={sport}>
                                        <button className="dropdown-item" onClick={() => setSelectedSport(sport)}>
                                            {sport}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>


                    {isLoggedIn && (
                        <button className="btn btn-light text-success" onClick={() => setShowModal(true)}>
                            Crear evento +
                        </button>
                    )}
                </div>


                {filteredPosts.length === 0 ? (
                    <p className="text-black">No hay publicaciones.</p>
                ) : (
                    filteredPosts.map(post => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onToggleFavorite={() => handleToggleFavorite(post.id)}
                            onJoin={() => handleJoin(post.id)}
                        />
                    ))
                )}

            </div>

            {isLoggedIn && (
                <CreatePost
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    setPosts={setPosts}
                />
            )}
        </div>
    );
};

export default Feed;


