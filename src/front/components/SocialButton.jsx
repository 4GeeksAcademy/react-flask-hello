export default function SocialButton({ icon, label, onClick }) {
  return (
    <button type="button" className="social-btn" onClick={onClick}>
      <span className="social-icon">{icon}</span>
      {label}
    </button>
  );
}