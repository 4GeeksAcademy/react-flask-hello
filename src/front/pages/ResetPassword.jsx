import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import userServices from "../services/userServices";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [validToken, setValidToken] = useState(true);

    // Verificar token al cargar
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await userServices.verifyResetToken(token);
                if (!response.success) {
                    setValidToken(false);
                    setError("El enlace es inválido o ha expirado.");
                }
            } catch (err) {
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

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
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
            setError("Ocurrió un error. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    if (!validToken) {
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
                            minLength={6}
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
                            minLength={6}
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