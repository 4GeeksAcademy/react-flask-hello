import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export const AddNewGasto = () => {
  const [concepto, setConcepto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [emoji, setEmoji] = useState("");
  const [showPicker, setShowPicker] = useState(false);


  const onEmojiClick = (emojiObject, event) => {
    setEmoji(emojiObject.emoji);
    setShowPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!concepto.trim()) {
      alert("El concepto es obligatorio");
      return;
    }
    if (isNaN(cantidad) || parseFloat(cantidad) <= 0) {
      alert("La cantidad debe ser un número mayor que cero");
      return;
    }

  
    const gasto = {
      concepto: concepto.trim(),
      cantidad: parseFloat(cantidad),
      emoji: emoji || ""
    };

    try {
      const res = await fetch("http://localhost:3001/api/gastos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(gasto)
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Error al guardar el gasto: " + (errorData.error || "Desconocido"));
        return;
      }

      const data = await res.json();

      alert(`Gasto guardado:\n${data.emoji} ${data.concepto} - €${data.cantidad}`);

      setConcepto("");
      setCantidad("");
      setEmoji("");
      setShowPicker(false);

    } catch (error) {
      alert("Error de conexión con el servidor: " + error.message);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#ffffff",
        minHeight: "80vh",
      }}
    >
      <form
        className="w-100"
        style={{ maxWidth: "600px" }}
        onSubmit={handleSubmit}
      >
        <div
          className="text-center"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          <h1>¡Añade otro gasto!</h1>
        </div>
        <div
          className="p-5 rounded shadow-lg"
          style={{
            backgroundColor: "#ffffff",
            width: "100%",
            maxWidth: "600px",
            paddingTop: "60px",
            paddingBottom: "60px",
          }}
        >
          <div className="mb-4">
            <label htmlFor="concepto" className="form-label">
              Concepto del gasto
            </label>
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

          <div className="mb-4">
            <label htmlFor="cantidad" className="form-label">
              Cantidad (€)
            </label>
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

          <div className="mb-4">
            <label className="form-label">Emoji (opcional)</label>
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPicker(!showPicker)}
              >
                {emoji || "😀"} {/* Muestra el emoji o uno por defecto */}
              </button>

              {showPicker && (
                <div
                  style={{
                    position: "absolute",
                    zIndex: 999,
                  }}
                >
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
          </div>

          <div className="mb-3 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#b7ff00",
                color: "black",
                border: "1px solid #b7ff00",
              }}
            >
              Guardar gasto
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
