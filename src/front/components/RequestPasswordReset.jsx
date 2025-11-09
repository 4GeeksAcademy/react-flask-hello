import { useState } from "react";
import { Link } from "react-router-dom";
import userServices from "../services/userServices";

const RequestPasswordReset = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await userServices.requestPasswordReset(email);

            if (response.success) {
                setMessage(response.message);
                setEmail("");
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError("Ocurrió un error. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container justify-items-center w-50 my-5">
            <h1 className="text-center">
                Restablecer Contraseña <br />
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
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <p className="text-center mb-3">
                        Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
                    </p>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control form-input"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="d-flex justify-content-center my-2">
                        <button
                            type="submit"
                            className="cta-send"
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar Enlace"}
                        </button>
                    </div>

                    <div className="text-center mt-3">
                        <Link to="/login">Volver al inicio de sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestPasswordReset;