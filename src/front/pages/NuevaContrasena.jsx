import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export const NuevaContrasena = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMsg("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (response.ok) {
                setShowConfirmation(true);
            } else {
                setMsg(data.error || "Error al actualizar la contraseña");
            }
        } catch (error) {
            setMsg("Error en la conexión con el servidor");
        }
    };

    return (
        <div className="background-container">
            {showConfirmation ? (
                <div className='login-signup-form position-absolute top-50 start-50 translate-middle border rounded-3 p-4'>
                    <div className='text-center'>
                        <i className="ri-checkbox-circle-line text-success fs-1 mb-3"></i>
                        <h2 className='mb-3'>¡Contraseña Actualizada!</h2>
                        <div className='d-flex flex-column gap-2'>
                            <p className='mb-0'>Tu contraseña ha sido actualizada exitosamente.</p>
                            <p className='text-muted small'>Ya puedes iniciar sesión con tu nueva contraseña.</p>
                        </div>
                        <Link
                            to="/"
                            className='btn btn-dark mt-4'
                        >
                            Ir a iniciar sesión
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="login-signup-form position-absolute top-50 start-50 translate-middle border rounded-3 p-3 p-md-4">
                    <h2 className="text-center mb-4">Establecer nueva contraseña</h2>
                    <form onSubmit={handleSubmit} className="px-2">
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control py-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nueva contraseña"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control py-2"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirmar contraseña"
                                required
                            />
                        </div>

                        {msg && (
                            <div className="alert alert-danger d-flex justify-content-center align-items-center py-1 mb-3 gap-2" role="alert">
                                <i className="ri-error-warning-line"></i>
                                <div>{msg}</div>
                            </div>
                        )}

                        <div className="d-flex gap-3 justify-content-end flex-row mt-4">
                            <Link to="/" className="btn btn-secondary w-25">
                                Cancelar
                            </Link>
                            <button type="submit" className="btn btn-dark w-25">
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}