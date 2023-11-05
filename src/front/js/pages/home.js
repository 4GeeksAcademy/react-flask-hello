import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import HomeOfferCard from "../component/HomeOfferCard.jsx";
import HomeReviewCard from "../component/HomeReviewCard.jsx";


import FilterMenu from "../component/FilterMenu.js";
import LitlleSlide from "../component/LitlleSlide.jsx";
import GeneralInfoDiv from "../component/GeneralInfoDiv.jsx";
import { Link } from "react-router-dom";



export const Home = () => {
  const { store, actions } = useContext(Context);
  return (
    <>


      {store.user.is_admin &&
        <div className="btn-home-admin">
          <Link to='/admin'>
            <button className="btn-admin">Espacio Admin</button>
          </Link>
        </div>
      }

      <LitlleSlide />
      <FilterMenu />
      <HomeOfferCard />
      <HomeReviewCard />
      <GeneralInfoDiv />

    </>
  );
};
