import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useGlobalReducer";

export default function Navbar() {
  const { store, actions } = useStore();
  const user = store.user;
  const nav = useNavigate();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // cerrar al hacer click fuera
  useEffect(() => {
    function onDocClick(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const goLogout = () => {
    actions.logout();
    setOpen(false);
    nav("/login");
  };

  const username = user?.username || (user?.email || "").split("@")[0] || "user";

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">Tasky</Link>
        <Link to="/post-task" className="btn-primary">Post a task</Link>
        <Link to="/browse">Browse tasks</Link>
        {user && <Link to="/my-tasks">My tasks</Link>}
      </div>

      <div className="nav-right">
        <Link to="/help">Help</Link>

        {!user ? (
          <>
            <Link to="/login" className="btn-login">Login</Link>
            <Link to="/register" className="btn-signup">Sign up</Link>
          </>
        ) : (
          <div className="user-menu" ref={ref}>
            <button
              className="user-trigger"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
            >
              <span className="avatar" aria-hidden />
              <span className="user-name">{user.name?.split(" ")[0] || "User"}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" className={`chev ${open ? "rot" : ""}`}><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
            </button>

            {open && (
              <div className="menu-popper" role="menu">
                <div className="menu-head">
                  <div className="menu-title">{user.name || username}</div>
                  <div className="menu-sub">Public profile</div>
                </div>

                <Link to={`/u/${username}`} className="menu-item" role="menuitem" onClick={() => setOpen(false)}>
                  Public profile
                </Link>

                <Link to="/account" className="menu-item" role="menuitem" onClick={() => setOpen(false)}>
                  Settings
                </Link>

                <div className="menu-divider" />

                <button className="menu-item danger" role="menuitem" onClick={goLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}