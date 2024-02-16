import React, { useContext } from "react";
import { Context } from "../store/appContext";
import homeHero from "../../img/pitch/overlay/home-hero-overlay.png";
import "../../styles/home.css";
import Hero from "../component/Hero";
import AboutSection from "../sections/about";
import PopularCategories from "../sections/PopularCategories";
import { ContactForm } from "../component/ContactForm";
import SignUpNow from "../sections/SignUpNow";
import PopularEventsTwo from "../sections/PopularEventsTwo";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center">
      <div
        className="hero"
        style={{
          backgroundImage: `url(${homeHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="hero-content">
          <Hero
            header="Welcome to Eventure, Where Experiences Await."
            text={`
              We’re here to bring you a variety of exciting experiences. 
              Whether you love culture, adventure, or simply good times, we’ve got something for everyone. 
              Explore our events and join us in celebrating life’s moments. 
              Let’s create unforgettable memories together!
            `}
          />
        </div>
      </div>

      <AboutSection />

      <PopularEventsTwo className="grey-background" />

      <PopularCategories />

      <SignUpNow />

      <ContactForm />
    </div>
  );
};
