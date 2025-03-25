import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const Navbar = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [elementsVisible, setElementsVisible] = useState(false);
    const [showElements, setShowElements] = useState(false);

    useEffect(() => {

        if (store.selectedCategory) {

            setShowElements(true);

            setTimeout(() => {
                setElementsVisible(true);
            }, 50);

        } else {

            setElementsVisible(false);

            setTimeout(() => {
                setShowElements(false);
            }, 1000);
        }

    }, [store.selectedCategory]);

    const handleDelete = (id, category) => {
        dispatch({ type: "delete_favorites", payload: { id, category } });
    }

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearch(term)

        console.log("Texto actual del input:", term);
        console.log("Items en store:", store.items);

        if (!term.trim()) {
            setSuggestions([]);
            return;
        }

        const filteredItems = store.items.filter((item) =>
            item.name.toLowerCase().includes(term.toLowerCase())
        );

        setSuggestions(filteredItems.slice(0, 5));
    };

    const handleSuggestionClick = (item) => {
        const category = store.selectedCategory || "unknown";
        navigate(`/${category}/${item.id}`);
        setSearch("");
        setSuggestions([]);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (!search.trim()) {
            return;
        }

        const itemsToSearch = store.selectedCategory
            ? store.items.filter(item => item.category === store.selectedCategory)
            : store.items;

        const foundItem = itemsToSearch.find((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );

        if (foundItem) {
            navigate(`/${foundItem.category}/${foundItem.id}`);
            setSearch("");
            setSuggestions([]);
        }
    };

    const handleCategoryClick = (category) => {
        navigate(`/${category}`);
    };

    const handleLogout = () => {

        dispatch({ type: "logout" });
        navigate("/");

    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">
                    <img
                        src="https://cdn.worldvectorlogo.com/logos/star-wars-2.svg"
                        className="btn starwarsLogo"
                        width="200"
                        height="80"
                    />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse d-flex ">

                    {showElements && (
                        <>
                            <div className={`d-flex slide-in-element slide-delay-3 ${elementsVisible ? 'visible' : 'slide-out-element'}`}>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <button
                                            className="nav-link dropdown-toggle btn p-3"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Favorites {store.favorites.length > 0 && `(${store.favorites.length})`}
                                        </button>
                                        <ul className="dropdown-menu">
                                            {store.favorites.length === 0 ? (
                                                <li>
                                                    <span className="dropdown-item">No favorites yet</span>
                                                </li>
                                            ) : (
                                                store.favorites.map((fav) => (
                                                    <li key={fav.id} className="d-flex p-1 align-items-center">
                                                        <Link className="dropdown-item" to={`/${fav.category}/${fav.id}`}>
                                                            {fav.name}
                                                        </Link>
                                                        <button
                                                            className="btn btn-info text-dark ms-2"
                                                            onClick={() => handleDelete(fav.id, fav.category)}
                                                        >
                                                            X
                                                        </button>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div className="d-flex justify-content-end w-100 m-4">

                                {store.categories && store.categories.map((category, index) => {

                                    return (
                                        <button
                                            key={index}
                                            className={`btn btn-outline-success m-1 slide-in-element slide-delay-${index % 3 + 1} ${elementsVisible ? 'visible' : 'slide-out-element'} ${store.selectedCategory === category ? 'active' : ''}`}
                                            onClick={() => handleCategoryClick(category.name)}
                                        >
                                            {category.name}
                                        </button>
                                    )
                                })}

                                {store.token && (
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                )}

                            </div>

                            <form className="d-flex position-relative" role="search" onSubmit={handleSearchSubmit}>

                                <div className={`d-flex slide-in-element slide-delay-3 ${elementsVisible ? 'visible' : 'slide-out-element'}`}>
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder={`Search ${store.selectedCategory}`}
                                        aria-label="Search"
                                        value={search}
                                        onChange={handleSearchChange}
                                    />
                                    <button className="btn btn-outline-success" type="submit">
                                        Search
                                    </button>

                                    {suggestions.length > 0 && (
                                        <ul className="suggestions-list position-absolute">
                                            {suggestions.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="suggestion-item"
                                                    onClick={() => handleSuggestionClick(item)}
                                                >
                                                    {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                            </form>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};