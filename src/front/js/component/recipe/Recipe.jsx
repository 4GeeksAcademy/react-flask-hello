import React from "react";
import "./recipe.css";

const Recipe = () => {
  return (
    <div className="gpt3__possibility section__padding" id="possibility">
      <div className="gpt3__possibility-image">
        {/* <img src={possibilityImage} alt="possibility" /> */}
      </div>
      <div className="gpt3__possibility-content">
        <h4>
          <strong>Upgrade to Premium for More Meals</strong>
        </h4>
        <h1 className="gradient__text">
          The possibilities are beyond your imagination
        </h1>
        <p>
          "Welcome to Nourish, where culinary adventures await! Dive into a
          world of tantalizing flavors, aromatic spices, and mouthwatering
          dishes that will tantalize your taste buds and ignite your passion for
          cooking. From sizzling stir-fries to decadent desserts, our diverse
          collection of recipes caters to every craving and skill level. Whether
          you're a seasoned chef or a kitchen newbie, our easy-to-follow
          recipes, vibrant photos, and helpful tips will empower you to create
          delicious meals that will impress family and friends alike. Get ready
          to embark on a delicious journey and discover the joy of cooking with
          NourishNav!"
        </p>
        <h4>
          <strong>Try one of our Delicious and Balanced Recipes</strong>
        </h4>
      </div>
    </div>
  );
};

export default Recipe;
