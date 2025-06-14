import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import useGlobalReducer from "../hooks/useGlobalReducer";
let items = [
  { name: "Sobre Nosotros", link: "/AboutUs", internal: true },
  { name: "Profesional", link: "/profesionales", internal: true },
  { name: "Eventos", link: "/Eventos", internal: true },
  {
    name: "Tarifas",
    link: "/Tarifas",
    internal: true,
  },
  {
    name: "Nutricion",
    link: "/nutricion",
    internal: true,
  },
  {
    name: "Deporte",
    link: "/sport",
    internal: true,
  },

  { name: "Login", link: "/login", internal: true },
];
export const Navbar = () => {
  const [menuItems, setMenuItems] = useState(items);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);
  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Store user changed:", store.user);

    if (store.user != null && !menuItems.includes(item => item.name === "Login")) {
      let aux = [...menuItems]
      aux.push({ name: "Perfil", link: "/user", internal: true }, { name: "Logout" });
      const upd = aux.filter(item => item.name !== "Login");
      store.user.is_professional && upd.splice(upd.length-1, 0, { name: "Profesor", link: "/pUser", internal: true });
      setMenuItems(upd);
    }

  }, [store.user]);

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


  const handleLogout = () => { 
    console.log("Logging out...");
    console.log(items);
    
    setMenuItems(prev => prev=items);
    dispatch({ type: "logout" })
    navigate("/");
  }

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
              {item.internal ? (
                <Link to={item.link} className="menu-link">
                  {item.name}
                  <span
                    className="menu-link-after"
                    style={{ width: hoverIndex === index ? "100%" : "0%" }}
                  ></span>
                </Link>
              ) : (
                <a
                  href={item.link}
                  className="menu-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => item.name === "Logout" && handleLogout()}
                >
                  {item.name}
                  <span
                    className="menu-link-after"
                    style={{ width: hoverIndex === index ? "100%" : "0%" }}
                  ></span>
                </a>
              )}
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
