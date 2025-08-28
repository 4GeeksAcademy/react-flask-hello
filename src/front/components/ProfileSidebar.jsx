import { Link, useLocation } from "react-router-dom";

export default function ProfileSidebar() {
  const { pathname } = useLocation();
  const Item = ({ to, children }) => (
    <Link
      to={to}
      style={{
        display: "block",
        padding: "12px 14px",
        borderRadius: 12,
        color: pathname === to ? "#0f172a" : "#334155",
        background: pathname === to ? "#eaf1ff" : "transparent",
        fontWeight: pathname === to ? 700 : 500,
      }}
    >
      {children}
    </Link>
  );

  return (
    <aside className="acc-sidebar">
      <div className="acc-avatar" />
      <div className="acc-name">Tu perfil</div>
      <nav className="acc-nav">
        <Item to="/account">Home</Item>
        <Item to="/account">My Tasker Dashboard</Item>
        <Item to="/account">Payment methods</Item>
        <Item to="/account">Notifications</Item>
        <Item to="/account">Settings</Item>
      </nav>
    </aside>
  );
}