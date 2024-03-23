import React from "react";
import "./recipe.css";
import foodImage2 from "../../assets/foodImage2.jpg";
import buddhaBowl from "../../assets/buddhaBowl.jpg";
import breakfast1 from "../../assets/breakfast1.jpg";
import breakfast2 from "../../assets/breakfast2.jpg";
import breakfast3 from "../../assets/breakfast3.jpg";
import veggieWrap from "../../assets/veggieWrap.jpeg";
import lunch3 from "../../assets/lunch3.jpeg";
import Favorites from "../../front/js/pages/favorites";

const addFavorite = (recipe) => {
  setFavorites((prevFavorites) => {
    // Check if the recipe is already in favorites
    const isFavorite = prevFavorites.some((fav) => fav.id === recipe.id);
    if (!isFavorite) {
      return [...prevFavorites, recipe];
    }
    return prevFavorites;
  });
};

const Recipe = () => {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${foodImage2})` }}
    >
      <div className="container py-5">
        <h1 className="text-center text-white mb-5">Nutrition Made Easy</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title text-white">Recipe of the Day</h5>
                <p className="card-text text-white">
                  Enjoy our Healthy Salmon Bowl: grilled salmon, quinoa, string
                  beans, fresh tomatoes, and zesty citrus dressing. Packed with
                  omega-3s, protein, and vitamins, it's a nutritious delight!
                </p>
                <a href="#" className="btn btn-success d-block mx-auto">
                  View Recipe
                </a>
              </div>
            </div>
          </div>
          {/* <div className="col-md-4">
            <div className="card bg-light p-3">
              <h3 className="text-center mb-4">Join Our Newsletter</h3>
              <p className="text-center">
                Stay updated with our latest recipes, nutrition tips, and
                special offers.
              </p>
              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    placeholder="Your Email Address"
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Subscribe
                </button>
              </form>
            </div>
          </div> */}
        </div>
      </div>
      <div className="container">
        <div className="text-center mb-5">
          <h4 className="mb-4">Find Your Plan</h4>
          <button type="button" className="btn btn-success btn-lg">
            Upgrade Now
          </button>
        </div>
        <div className="recipes-section">
          <h3 className="text-center mb-4">
            Try one of our Delicious and Balanced Recipes
          </h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card h-100 recipe-card">
                <img
                  src={breakfast2}
                  className="card-img-top"
                  alt="Breakfast 1"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Buddha Bowl</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Delicious and Nutritious
                  </h6>
                  <p className="card-text">
                    Discover the perfect balance of flavors and nutrients in our
                    Buddha Bowl. Packed with protein, fiber, and essential
                    vitamins.
                  </p>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => addFavorite(recipe)}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 recipe-card">
                <img
                  src={breakfast1}
                  className="card-img-top"
                  alt="Breakfast 2"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Mediterranean Salad</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Fresh and Flavorful
                  </h6>
                  <p className="card-text">
                    Indulge in the vibrant tastes of the Mediterranean with our
                    refreshing salad. Bursting with fresh veggies, olives, feta
                    cheese, and a tangy vinaigrette.
                  </p>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => addFavorite(recipe)}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 recipe-card">
                <img
                  src={breakfast3}
                  className="card-img-top"
                  alt="Breakfast 3"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Green Smoothie</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Energy Booster
                  </h6>
                  <p className="card-text">
                    Revitalize your day with our Green Smoothie, packed with
                    leafy greens, fruits, and superfoods. It's the perfect way
                    to fuel your body and mind!
                  </p>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => addFavorite(recipe)}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 recipe-card">
                <img
                  src={buddhaBowl}
                  className="card-img-top"
                  alt="Lunch 1"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Buddha Bowl</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Delicious and Nutritious
                  </h6>
                  <p className="card-text">
                    Discover the perfect balance of flavors and nutrients in our
                    Buddha Bowl. Packed with protein, fiber, and essential
                    vitamins.
                  </p>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => addFavorite(recipe)}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 recipe-card">
                <img
                  src={veggieWrap}
                  className="card-img-top"
                  alt="Lunch 2"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Mediterranean Salad</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Fresh and Flavorful
                  </h6>
                  <p className="card-text">
                    Indulge in the vibrant tastes of the Mediterranean with our
                    refreshing salad. Bursting with fresh veggies, olives, feta
                    cheese, and a tangy vinaigrette.
                  </p>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => addFavorite(recipe)}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 recipe-card">
                <img
                  src={lunch3}
                  className="card-img-top"
                  alt="Lunch 3"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Green Smoothie</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Energy Booster
                  </h6>
                  <p className="card-text">
                    Revitalize your day with our Green Smoothie, packed with
                    leafy greens, fruits, and superfoods. It's the perfect way
                    to fuel your body and mind!
                  </p>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => addFavorite(recipe)}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
