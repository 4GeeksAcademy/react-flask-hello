import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import "../../styles/navbarUser.css";
import {Link} from "react-router-dom"

export const NavbarUser = () => {
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
    url: "/",
  };

  const menuItems = [
    { 
      name: "Mi perfil", 
      link: "/User" 
    },
    {
      name: "Profesores",
      link: "/Profesores",
    },
    {
      name: "checkOut",
      link: "/checkout",
    },

    { name: "Loging", link: "/Login" },
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
          <Link
            to={logoLink.url}
            className="logo-text"
  
          >
            {logoLink.name}
          </Link>
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
