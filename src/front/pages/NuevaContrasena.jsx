import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const NuevaContrasena = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "error" o "success"

    useEffect(() => {
        if (confirmPassword && password !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            setMessageType("error");
        } else if (confirmPassword) {
            setMessage("");
            setMessageType("");
        }
    }, [password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            setMessageType("error");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            });

            const contentType = response.headers.get("Content-Type");
            const data = contentType && contentType.includes("application/json")
                ? await response.json()
                : {};

            if (response.ok) {
                setMessage("Contraseña actualizada con éxito.");
                setMessageType("success");
                setPassword("");
                setConfirmPassword("");
            } else {
                setMessage(data.error || "Error al actualizar la contraseña.");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("No se pudo conectar con el servidor.");
            setMessageType("error");
        }
    };

    return (
        <div className="container mt-5">
            <h4>Establecer nueva contraseña</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nueva contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirmar contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {message && (
                    <p className={`mt-2 ${messageType === "error" ? "text-danger" : "text-success"}`}>
                        {message}
                    </p>
                )}

                <button type="submit" className="btn btn-primary">Actualizar</button>
            </form>
        </div>
    );
};
