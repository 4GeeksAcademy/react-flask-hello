import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";

export const AddNewGasto = () => {
  const [concepto, setConcepto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [emoji, setEmoji] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const onEmojiClick = (emojiObject) => {
    setEmoji(emojiObject.emoji);
    setShowPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!concepto.trim()) {
      alert("El concepto es obligatorio");
      setLoading(false);
      return;
    }

    if (isNaN(cantidad) || parseFloat(cantidad) <= 0) {
      alert("La cantidad debe ser un número mayor que cero");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No hay token. Inicia sesión.");
      setLoading(false);
      return;
    }

    const gastoData = {
      concepto: concepto,
      cantidad: parseFloat(cantidad),
      emoji: emoji
    };

    try {
      const response = await fetch(`${API_BASE_URL}api/gasto/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(gastoData),
      });

      const result = await response.json();

      if (response.ok) {
        // Guardar localmente el gasto para usar en frontend
        const gastosGuardados = JSON.parse(localStorage.getItem("gastos")) || [];
        gastosGuardados.push({
          concepto,
          cantidad: parseFloat(cantidad),
          emoji,
          fecha: new Date().toISOString(),
        });
        localStorage.setItem("gastos", JSON.stringify(gastosGuardados));
        setMensaje(`✅ Gasto guardado: ${concepto} ${emoji} - ${cantidad}€`);
    setTimeout(() => {
      navigate("/main"); 
    }, 1000);

        setMensaje(`✅ Gasto guardado: ${concepto} ${emoji} - ${cantidad}€`);
        setConcepto("");
        setCantidad("");
        setEmoji("");
      } else {
        setMensaje("❌ Error: " + (result.msg || "No se pudo guardar el gasto"));
      }
    } catch (error) {
      setMensaje("❌ Error de conexión al guardar el gasto");
      console.error("Error al enviar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addgasto-container">
      <form className="addgasto-form-wrapper" onSubmit={handleSubmit}>
        <div className="addgasto-title">
          <h1>¡Añade otro gasto!</h1>
        </div>

        <div className="addgasto-form-content">
          {/* INPUT CONCEPTO */}
          <div className="mb-4">
            <label htmlFor="concepto" className="form-label">Concepto del gasto</label>
            <input
              type="text"
              id="concepto"
              className="form-control"
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              placeholder="Ej. Comida, transporte..."
              required
            />
          </div>

          {/* INPUT CANTIDAD */}
          <div className="mb-4">
            <label htmlFor="cantidad" className="form-label">Cantidad (€)</label>
            <input
              type="number"
              id="cantidad"
              className="form-control"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          {/* EMOJI PICKER */}
          <div className="mb-4 position-relative">
            <label className="form-label">Emoji (opcional)</label>
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPicker(!showPicker)}
              >
                {emoji || "😀"}
              </button>
              {showPicker && (
                <div className="addgasto-emoji-picker-wrapper">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
          </div>

          {/* BOTÓN */}
          <div className="mb-3 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary addgasto-btn-guardar"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar gasto"}
            </button>
          </div>

          {/* MENSAJE */}
          {mensaje && (
            <div className="text-center mt-3">
              <p>{mensaje}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};