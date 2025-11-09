//Input que permite texto y opcionalmente toggle para mostrar/ocultar (para passwords)

import { useState } from "react";

export default function TextInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  withToggle = false,
  required = true,
}) {
  const [show, setShow] = useState(false);
  const finalType = withToggle ? (show ? "text" : "password") : type;

  return (
    <div className="mb-3 position-relative">
      {label && <label className="form-label">{label}</label>}
      <input
        className="form-control input-dark"
        type={finalType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
      />
      {withToggle && (
        <button
          type="button"
          className="eye-btn"
          onClick={() => setShow((s) => !s)}
          aria-label="toggle password"
        >
          {show ? "🙈" : "👁️"}
        </button>
      )}
    </div>
  );
}
