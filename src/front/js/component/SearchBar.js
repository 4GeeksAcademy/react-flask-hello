import React, { useState, useContext, useEffect, useCallback, useRef } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../../styles/searchbar.css';
import debounce from 'lodash.debounce';

// Componente SearchBar con lógica de búsqueda y resultados
const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { store, actions } = useContext(Context);

    const searchContainerRef = useRef(null);


    const handleSearch = useCallback(debounce(async (searchTerm) => {
        if (!searchTerm.trim()) {
            setIsMenuOpen(false);
            return;
        }
        setLoading(true);
        await actions.setBooks(searchTerm);
        setLoading(false);
        setIsMenuOpen(true);
    }, 500), []); // 


    useEffect(() => {
        handleSearch(search);

    }, [search]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFocus = () => {

        if (search.trim() && store.resultados.length > 0) {
            setIsMenuOpen(true);
        }
    };

    return (
        <div ref={searchContainerRef} className="search-bar-container">
            <form onSubmit={(e) => e.preventDefault()} className="d-flex" role="search">
                <input
                    className="form-control me-2 searchbar form-control"
                    type="search"
                    placeholder="Search for books, authors, publishers..."
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={handleFocus}
                />
                <button className="btn btn-outline-dark search-btn" type="submit">
                    <FontAwesomeIcon icon={loading ? faSpinner : faMagnifyingGlass} spin={loading} />
                </button>
            </form>
            {isMenuOpen && (
                <div className="collapse show" id="collapseSearchResults">
                    {loading ? (
                        <p>Buscando...</p>
                    ) : (
                        <ul>
                            {store.resultados.map((resultado, index) => (
                                <li className="py-2 hoverEffect" key={index}>{resultado.title}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
