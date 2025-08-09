import { useState, useEffect, useRef } from "react"
import { Bars3Icon, BellIcon, XMarkIcon, UserIcon } from "@heroicons/react/24/outline"

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Mis eventos", href: "#", current: false },
  { name: "Eventos públicos", href: "#", current: false },
  { name: "Calendario", href: "#", current: false },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)


  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="knect-navbar">
      <div className="navbar-bg"></div>
      <div className="navbar-container">
        <div className="navbar-content">
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            type="button"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon />
            ) : (
              <Bars3Icon />
            )}
          </button>

          <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
            <div className="navbar-logo">
              <img src="/Knect-logo.png" alt="Knect logo" />
            </div>

            <nav className="navbar-nav">
              <ul className="navbar-nav-list">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={`navbar-link ${item.current ? "active" : ""}`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="navbar-actions">
            <button className="notification-btn" type="button">
              <BellIcon />
              <span className="notification-badge">3</span>
            </button>

            <div className="profile-menu" ref={profileMenuRef}>
              <button
                className="profile-btn"
                onClick={toggleProfileMenu}
                type="button"
              >
                <div className="profile-avatar">
                  <UserIcon />
                </div>
              </button>


              {isProfileMenuOpen && (
                <div className="profile-dropdown active">
                  <a href="#" className="dropdown-item">
                    <UserIcon />
                    Tu perfil
                  </a>
                  <a href="#" className="dropdown-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Configuración
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item logout">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Cerrar sesión
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {isMobileMenuOpen && (
        <div className="mobile-panel active">
          <ul className="mobile-nav-list">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`mobile-nav-link ${item.current ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}