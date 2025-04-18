// NUEVO componente para crear y editar usuarios con modal
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserFormModal.css";
import { useGlobalReducer } from "../../hooks/useGlobalReducer";

const UserFormModal = ({ isOpen, onClose, userToEdit, onSave }) => {
    const { store } = useGlobalReducer();
    const token = store.auth.token;

    const initialForm = {
        email: "",
        password: "",
        name: "",
        lastname: "",
        dni: "",
        rolId: ""
    };

    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                ...userToEdit,
                password: ""
            });
        } else {
            setFormData(initialForm);
        }
    }, [userToEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userToEdit) {
                const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/users`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                onSave(res.data);
            } else {
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, formData);
                onSave(res.data.user);
            }
            onClose();
        } catch (err) {
            console.error("Error saving user:", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="user-form-modal-overlay" onClick={onClose}>
            <div className="user-form-modal" onClick={(e) => e.stopPropagation()}>
                <h3>{userToEdit ? "Editar Usuario" : "Crear Usuario"}</h3>
                <form onSubmit={handleSubmit} className="user-form" autoComplete="off">
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre"
                        required
                        autoComplete="off"
                    />
                    <input
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Apellido"
                        required
                        autoComplete="off"
                    />
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        autoComplete="off"
                    />
                    <input
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        placeholder="DNI"
                        required
                        autoComplete="off"
                    />
                    <input
                        name="rolId"
                        value={formData.rolId}
                        onChange={handleChange}
                        placeholder="Rol ID"
                        required
                        autoComplete="off"
                    />
                    {!userToEdit && (
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Contraseña"
                            required
                            autoComplete="new-password"
                        />
                    )}
                    <div className="user-form-buttons">
                        <button type="submit" className="save-btn">💾 Guardar</button>
                        <button type="button" className="cancel-btn" onClick={onClose}>❌ Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserFormModal;
