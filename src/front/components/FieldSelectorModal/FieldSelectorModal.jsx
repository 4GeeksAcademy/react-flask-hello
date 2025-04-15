import React from "react";
import "./FieldSelectorModal.css";

const FieldSelectorModal = ({ fields, setSelected, onClose, selected }) => {
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOutsideClick}>
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>✖</button>
                <h2>Selecciona la parcela que quieres ver</h2>

                <div className="field-button-grid">
                    {fields.map((field) => (
                        <button
                            key={field.id}
                            className={`field-button ${selected?.id === field.id ? "selected" : ""}`}
                            onClick={() => {
                                setSelected(field);
                                onClose(); // si quieres cerrar al hacer clic en la parcela
                            }}
                        >
                            🌾 {field.name} <br />
                            📍 {field.city}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default FieldSelectorModal;
