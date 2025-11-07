// Lo he creado para mostrar un aviso genérico relacionado con la autenticación
export function AuthNotice({ icon = "📩", title = "Mira tu email", text = "te hemos enviado las instrucciones a tu email" }) {
  return (
    <div style={{
      background: "#1a2740", borderRadius: 16, padding: "16px 14px",
      display: "flex", gap: 12, alignItems: "center", border: "1px solid rgba(255,255,255,.06)"
    }}>
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div className="small-note">{text}</div>
      </div>
    </div>
  );
}
