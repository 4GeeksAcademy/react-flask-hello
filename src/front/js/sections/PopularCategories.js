import React from "react";
import { Link } from "react-router-dom";

import MusicCategoryImage from "../../img/pitch/category/music-category.png";
import ComedyCategoryImage from "../../img/pitch/category/comedy-category.png";
import BusinessCategoryImage from "../../img/pitch/category/business-category.png";
import SportCategoryImage from "../../img/pitch/category/sport-category.png";

const PopularCategories = () => {
    return (
        <div className="container-fluid popular-categories">
            <div className="container">
                <div className="section-header">
                    <h2 className="text-center mt-4 mb-3">Popular Categories</h2>
                </div>

                <div className="row categories-container justify-content-between">
                    <Link to="/events/music" className="col-lg-3 col-md-3 categories-placeholder d-flex flex-column justify-content-center align-items-center" style={{ backgroundImage: `url(${MusicCategoryImage})`, backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', textDecoration: 'none' }}>
                        <h3 className="text-center text-shadow">Music</h3>
                    </Link>
                    <Link to="/events/comedy" className="col-lg-3 col-md-3 categories-placeholder d-flex flex-column justify-content-center align-items-center" style={{ backgroundImage: `url(${ComedyCategoryImage})`, backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', textDecoration: 'none' }}>
                        <h3 className="text-center text-shadow">Comedy</h3>
                    </Link>
                    <Link to="/events/business" className="col-lg-3 col-md-3 categories-placeholder d-flex flex-column justify-content-center align-items-center" style={{ backgroundImage: `url(${BusinessCategoryImage})`, backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', textDecoration: 'none' }}>
                        <h3 className="text-center text-shadow">Business</h3>
                    </Link>
                    <Link to="/events/sports" className="col-lg-3 col-md-3 categories-placeholder d-flex flex-column justify-content-center align-items-center" style={{ backgroundImage: `url(${SportCategoryImage})`, backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', textDecoration: 'none' }}>
                        <h3 className="text-center text-shadow">Sport</h3>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PopularCategories;
