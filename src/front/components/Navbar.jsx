// src/front/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useGlobalReducer";

export function Navbar() {
  const { store, actions } = useStore();
  const user = store.user;
  const nav = useNavigate();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function onLogout() {
    actions.logout?.();
    setOpen(false);
    nav("/", { replace: true });
  }

  const username =
    user?.username ||
    (user?.name ? user.name.toLowerCase().replace(/\s+/g, "") : "me");

  return (
    <nav style={navStyle}>
      <div style={navInner}>
        <Link to="/" className="brand" style={brand}>
          Tasky
        </Link>

        <div style={links}>
          <Link to="/post" className="btn btn-primary" aria-label="Post a task">
            Post a task
          </Link>
          <Link to="/browse" className="link">
            Browse tasks
          </Link>
          <Link to="/my" className="link">
            My tasks
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link to="/help" className="link">
            Help
          </Link>

          {user ? (
            <div ref={ref} style={{ position: "relative" }}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
                style={avatarBtn}
                title={`Hi, ${user.name || username}`}
              >
                <Avatar name={user.name || username} />
                <span className="sr-only">User menu</span>
              </button>

              {open && (
                <div role="menu" aria-label="User" style={menu}>
                  <Link
                    role="menuitem"
                    to={`/u/${username}`}
                    className="menu-item"
                    onClick={() => setOpen(false)}
                  >
                    Public profile
                  </Link>
                  <Link
                    role="menuitem"
                    to="/account"
                    className="menu-item"
                    onClick={() => setOpen(false)}
                  >
                    Account
                  </Link>
                  <button role="menuitem" onClick={onLogout} className="menu-item danger">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Log in
              </Link>
              <Link to="/register" className="btn">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ---------- UI helpers ---------- */
function Avatar({ name = "U" }) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      aria-label="Avatar"
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "#1d4ed8",
        color: "#fff",
        display: "grid",
        placeItems: "center",
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {initials}
    </div>
  );
}

/* ---------- estilos mínimos ---------- */
const navStyle = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  background: "#fff",
  borderBottom: "1px solid #e2e8f0",
};

const navInner = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  padding: "10px 16px",
  maxWidth: 1200,
  margin: "0 auto",
};

const brand = { fontWeight: 800, fontSize: 20, color: "#0f172a", textDecoration: "none" };

const links = {
  display: "flex",
  alignItems: "center",
  gap: 14,
};

const avatarBtn = {
  border: 0,
  background: "transparent",
  cursor: "pointer",
  padding: 2,
  borderRadius: 999,
};

const menu = {
  position: "absolute",
  right: 0,
  top: "110%",
  minWidth: 220,
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  boxShadow: "0 12px 24px rgba(15,23,42,.12)",
  padding: 8,
  display: "grid",
};