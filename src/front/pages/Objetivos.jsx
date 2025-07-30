import React, { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";


export const Objetivos = ({ onSubmitObjetivo }) => {
  const [concepto, setConcepto] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [fechaLimite, setFechaLimite] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [emoji, setEmoji] = useState(null);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoObjetivo = { concepto, cantidad, fechaLimite };
    const objetivosGuardados = JSON.parse(localStorage.getItem("objetivos")) || [];
    objetivosGuardados.push(nuevoObjetivo);
    localStorage.setItem("objetivos", JSON.stringify(objetivosGuardados));
   navigate("/main");
  };

  const onEmojiClick = (emojiObject) => {
    const emojiChar = emojiObject.emoji;

    if (inputRef.current) {
      const input = inputRef.current;
      const start = input.selectionStart;
      const end = input.selectionEnd;

      const newText =
        concepto.substring(0, start) + emojiChar + concepto.substring(end);

      setConcepto(newText);

      setTimeout(() => {
        input.setSelectionRange(start + emojiChar.length, start + emojiChar.length);
        input.focus();
      }, 0);
    } else {
      setConcepto(concepto + emojiChar);
    }

    setEmoji(emojiChar);
    setShowPicker(false);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h5>Crear objetivo de ahorro</h5>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Concepto</label>
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            required
          />

          
          <div className="mt-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPicker(!showPicker)}
              style={{
                width: "45px",
                height: "40px",
                fontSize: "20px",
                padding: 0,
              }}
            >
              {emoji || "😊"}
            </button>
          </div>

          {showPicker && (
            <div style={{ position: "absolute", zIndex: 1000 }}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">
            Cantidad: <strong>{cantidad} €</strong>
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="5000"
            step="50"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha límite</label>
          <input
            type="date"
            className="form-control"
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Crear Objetivo
        </button>
      </form>
    </div>
  );
};