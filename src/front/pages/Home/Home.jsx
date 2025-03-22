import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./Home.css";

export const API_STARWARS = "https://glorious-waddle-4jgg67pp944q2q55x-3000.app.github.dev/";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetch(API_STARWARS + "clases/");
                if (!response.ok) {
                    throw new Error("We can't get the categories");
                }
                const data = await response.json();
                console.log(data)
                dispatch({ type: "set_categories", payload: data.available_classes });
            } catch (error) {
                console.log(error);
            }
        };

        getCategories();

        if (window.location.pathname === '/') {
            dispatch({ type: "set_selected_category", payload: null });
        }

    }, []);

    const handleCategoryClick = (category) => {

        dispatch({ type: "set_selected_category", payload: category });

    };

    const fixedPositions = [
        { top: "25%", left: "60%" },
        { top: "40%", left: "30%" },
        { top: "50%", left: "55%" },
        { top: "70%", left: "40%" },
        { top: "85%", left: "55%" },
    ];

    return (
        <div className="categories">
            {store.categories.map((category, index) => {
                const position = fixedPositions[index % fixedPositions.length];


                return (
                    <Link
                        key={index}
                        to={`/${category}`}
                        className="category-btn"
                        style={position}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </Link>
                );
            })}
        </div>
    );
};