// Lo he creado para envolver las pantallas de autenticación con un diseño útil
export default function AuthShell({ children, title, subtitle }) {
  return (
    <div className="auth-theme">
      <div className="auth-shell">
        <div className="auth-card">
          {title && <div className="auth-title">{title}</div>}
          {subtitle && <div className="auth-sub">{subtitle}</div>}
          {children}
        </div>
      </div>
    </div>
  );
}
