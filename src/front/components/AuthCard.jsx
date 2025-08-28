// src/front/components/AuthCard.jsx
export default function AuthCard({ title = "Welcome", children }) {
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">{title}</h1>
        <p className="auth-subtitle">Create your account to start posting and doing tasks</p>
        {children}
      </div>
    </div>
  );
}