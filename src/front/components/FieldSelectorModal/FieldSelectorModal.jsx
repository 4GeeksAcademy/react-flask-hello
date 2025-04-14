import React from "react";
import "./FieldSelectorModal.css";

const FieldSelectorModal = ({ fields, onSelect, selected, setSelected }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Selecciona la parcela que quieres ver</h2>

                <div className="field-button-grid">
                    {fields.map((field) => (
                        <button
                            key={field.id}
                            className={`field-button ${selected?.id === field.id ? "selected" : ""}`}
                            onClick={() => setSelected(field)}
                        >
                            🌾 {field.name} <br />
                            📍 {field.city}
                        </button>
                    ))}
                </div>

                <button
                    className="confirm-button"
                    onClick={onSelect}
                    disabled={!selected}
                >
                    Ver Parcela
                </button>
            </div>
        </div>
    );
};

export default FieldSelectorModal;
