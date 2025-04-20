import React, { useState } from "react";
import "./FieldManagerModal.css";

const FieldManagerModal = ({ fields, onClose, onUpdate, onDelete }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [editedField, setEditedField] = useState({});

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedField(fields[index]);
    };

    const handleChange = (e) => {
        setEditedField({
            ...editedField,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        onUpdate(editedField);
        setEditIndex(null);
    };

    if (!fields) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content field-manager-modal">
                <div className="modal-header">
                    <h2>🌾 Gestión de Tierras</h2>
                    <button className="close-button" onClick={onClose}>✖</button>
                </div>

                <div className="fields-list">
                    {fields.map((field, index) => (
                        <div key={field.id} className="field-card">
                            {editIndex === index ? (
                                <>
                                    <input name="name" value={editedField.name} onChange={handleChange} placeholder="Nombre" />
                                    <input name="area" value={editedField.area} onChange={handleChange} placeholder="Ha" />
                                    <input name="crop" value={editedField.crop} onChange={handleChange} placeholder="Cultivo" />
                                    <input name="street" value={editedField.street} onChange={handleChange} placeholder="Calle" />
                                    <input name="number" value={editedField.number} onChange={handleChange} placeholder="Número" />
                                    <input name="city" value={editedField.city} onChange={handleChange} placeholder="Ciudad" />
                                    <input name="postal_code" value={editedField.postal_code} onChange={handleChange} placeholder="CP" />

                                    <div className="field-actions">
                                        <button onClick={handleSave} className="save-btn">💾 Guardar</button>
                                        <button onClick={() => setEditIndex(null)} className="cancel-btn">Cancelar</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p><strong>{field.name}</strong> – {field.area} Ha</p>
                                    <p>{field.crop} | {field.street} {field.number}, {field.city}</p>

                                    <div className="field-actions">
                                        <button onClick={() => handleEdit(index)} className="edit-btn">✏️ Editar</button>
                                        <button onClick={() => onDelete(field.id)} className="delete-btn">🗑️ Eliminar</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FieldManagerModal;
