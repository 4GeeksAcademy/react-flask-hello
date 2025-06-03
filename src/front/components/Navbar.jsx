import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import "../../styles/navbar.css";

export const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }

    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logoLink = {
    name: (
      <>
        DMPC<span className="logo-highlight">ProFit</span>
      </>
    ),
    url: "https://ubiquitous-disco-r4pjvwprwv4rhwjjj-3000.app.github.dev/",
  };

  const menuItems = [
    { name: "Sobre Nosotros", link: "#" },
    {
      name: "Nutricion",
      link: "https://ubiquitous-disco-r4pjvwprwv4rhwjjj-3000.app.github.dev/nutricion",
    },
    {
      name: "Deporte",
      link: "https://ubiquitous-disco-r4pjvwprwv4rhwjjj-3000.app.github.dev/sport",
    },
    {
      name: "Profesional",
      link: "https://ubiquitous-disco-r4pjvwprwv4rhwjjj-3000.app.github.dev/entrenadores",
    },
    { name: "Loging", link: "#" },
  ];

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <div style={{ height: `${navbarHeight}px` }}></div>

      <nav
        ref={navbarRef}
        className="navbar"
        style={{
          background: `linear-gradient(135deg, #94B4C1 ${scrollProgress}%, #ECEFCA 100%)`,
        }}
      >
        <div className="logo">
          <a
            href={logoLink.url}
            className="logo-text"
            rel="noopener noreferrer"
          >
            {logoLink.name}
          </a>
        </div>

        <ul
          className={`menu ${isMobile ? "mobile" : ""} ${mobileMenuOpen ? "open" : ""}`}
        >
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${hoverIndex === index ? "hover" : ""}`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <a href={item.link} className="menu-link">
                {item.name}
                <span
                  className="menu-link-after"
                  style={{ width: hoverIndex === index ? "100%" : "0%" }}
                ></span>
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-btn"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
    </>
  );
};
