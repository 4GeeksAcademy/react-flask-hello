import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import useGlobalReducer from "../hooks/useGlobalReducer";

let items = [
  { name: "Sobre Nosotros", link: "/AboutUs", internal: true },
  { name: "Profesionales", link: "/profesionales", internal: true },
  { name: "Eventos", link: "/Eventos", internal: true },
  { name: "Tarifas", link: "/Tarifas", internal: true },
  { name: "Nutricion", link: "/nutricion", internal: true },
  { name: "Deporte", link: "/sport", internal: true },
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
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.user) {
      console.log("Actualizando menu con imagen:", store.user.imagen);

      let aux = [...items.filter(item =>
        item.name !== "Login" &&
        item.name !== "Perfil" &&
        item.name !== "Profesor" &&
        item.name !== "Logout"
      )];

      const avatarUrl = store.user.imagen
        ? store.user.imagen.startsWith("http")
          ? store.user.imagen
          : `${store.user.imagen}?t=${Date.now()}`
        : "/default-avatar.png"; 


      if (store.user.is_professional) {
        aux.push({
          name: "Profesor",
          link: "/pUser",
          internal: true,
          isImage: true,
          imageUrl: avatarUrl,
        });
      } else {
        aux.push({
          name: "Perfil",
          link: "/user",
          internal: true,
          isImage: true,
          imageUrl: avatarUrl,
        });
      }

      aux.push({ name: "Logout" });
      setMenuItems(aux);
    }
  }, [store.user?.imagen, store.user?.is_professional]);


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
    setMenuItems(items);
    dispatch({ type: "logout" });
    navigate("/");
  };

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
          <Link to={logoLink.url} className="logo-text">
            {logoLink.name}
          </Link>
        </div>

        <ul className={`menu ${isMobile ? "mobile" : ""} ${mobileMenuOpen ? "open" : ""}`}>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${hoverIndex === index ? "hover" : ""}`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {item.isImage && item.imageUrl ? (
                <Link to={item.link} className="menu-link image-link">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="menu-avatar"
                    onError={(e) => {
                      e.target.src = "/logoCrema1.png";
                    }}
                  />
                </Link>
              ) : item.internal ? (
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
                  onClick={(e) => {
                    if (item.name === "Logout") {
                      e.preventDefault();
                      handleLogout();
                    }
                  }}
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

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
    </>
  );
};