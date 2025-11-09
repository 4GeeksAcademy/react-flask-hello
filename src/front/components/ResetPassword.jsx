import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import userServices from "../services/userServices";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [validToken, setValidToken] = useState(null);

    // Verificar token al cargar
    useEffect(() => {
        if (!token) {
            setValidToken(false);
            setError("No se proporcionó un token válido.");
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await userServices.verifyResetToken(token);
                if (response.success) {
                    setValidToken(true);
                } else {
                    setValidToken(false);
                    setError("El enlace es inválido o ha expirado.");
                }
            } catch (err) {
                console.error("Error verificando token:", err);
                setValidToken(false);
                setError("El enlace es inválido o ha expirado.");
            }
        };
        verifyToken();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        setLoading(true);

        try {
            const response = await userServices.resetPassword(token, password);

            if (response.success) {
                setMessage(response.message);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                setError(response.message);
            }
        } catch (err) {
            console.error("Error resetting password:", err);
            setError("Ocurrió un error. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    // Mostrar loading mientras verifica
    if (validToken === null) {
        return (
            <div className="container justify-items-center w-50 my-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Verificando...</span>
                    </div>
                    <p className="mt-3">Verificando enlace...</p>
                </div>
            </div>
        );
    }

    if (validToken === false) {
        return (
            <div className="container justify-items-center w-50 my-5">
                <div className="alert alert-danger text-center" role="alert">
                    <h4>Enlace Inválido</h4>
                    <p>{error}</p>
                    <Link to="/request-password-reset" className="btn btn-primary mt-3">
                        Solicitar nuevo enlace
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container justify-items-center w-50 my-5">
            <h1 className="text-center">
                Nueva Contraseña <br />
                <span className="span-text">MentorMatch</span>
            </h1>

            <div className="d-flex justify-content-center">
                <img
                    src="src/front/assets/img/MM-2.png"
                    alt="Hero Illustration"
                    className="logo-image"
                />
            </div>

            <div className="d-flex justify-content-center">
                <form className="form-style p-4" onSubmit={handleSubmit}>
                    {message && (
                        <div className="alert alert-success" role="alert">
                            {message}
                            <br />
                            Redirigiendo al login...
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label">Nueva Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control form-input"
                            required
                            disabled={loading}
                            minLength={8}
                            placeholder="Mínimo 8 caracteres"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirmar Contraseña</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control form-input"
                            required
                            disabled={loading}
                            minLength={8}
                            placeholder="Repite la contraseña"
                        />
                    </div>

                    <div className="d-flex justify-content-center my-2">
                        <button
                            type="submit"
                            className="cta-send"
                            disabled={loading}
                        >
                            {loading ? "Actualizando..." : "Cambiar Contraseña"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;