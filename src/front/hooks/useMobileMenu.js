import { useEffect } from "react";

const useMobileMenu = () => {
  useEffect(() => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    const handleBurgerClick = () => {
      nav.classList.toggle("nav-active");
      burger.classList.toggle("toggle");

      // Animación para los enlaces
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });
    };

    const handleLinkClick = () => {
      nav.classList.remove("nav-active");
      burger.classList.remove("toggle");
      navLinks.forEach((link) => {
        link.style.animation = "";
      });
    };

    burger.addEventListener("click", handleBurgerClick);
    navLinks.forEach((link) => link.addEventListener("click", handleLinkClick));

    return () => {
      burger.removeEventListener("click", handleBurgerClick);
      navLinks.forEach((link) =>
        link.removeEventListener("click", handleLinkClick)
      );
    };
  }, []);
};

export default useMobileMenu;
