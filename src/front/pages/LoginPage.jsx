import { Link } from "react-router-dom";
import "../login.css";

export const LoginPage = () => {

    return (
        <div className="login-page-container">
            <div className="container-fluid h-100">
                <div className="row h-100 g-0">
                        <div className="ps-2 pt-4">
                        <Link to="/" className="back-link">
                            <i className="fas fa-arrow-left"></i> Volver
                        </Link>
                        </div>
                        <div className="col-md-7 d-none d-md-flex left-panel">
                        <div className="d-flex flex-column justify-content-center align-items-center text-center w-100">
                            <img src="tu-ruta-al-logo.png" alt="AutoTekc Logo" className="img-fluid mb-4" />
                            <h1 className="logo-text fw-bold mb-3" style={{ fontSize: '2.8rem' }}>AutoTekc</h1>
                            <h4 className="text-dark-emphasis mb-0" style={{ maxWidth: '600px' }}>Conduciendo hacia el futuro del cuidado automotriz. Ingresa para gestionar tu experiencia.</h4>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 d-flex align-items-center justify-content-center p-3">
                        <div className="login-card w-100">
                            <div className="flex-grow-1">
                                <h2 className="text-center fw-bold mb-2 welcome-text">Bienvenido</h2>
                                <p className="text-center">Inicia tu camino al cuidado de tu auto.</p>

                                <form>
                                    <div className="my-5">
                                        <label htmlFor="email" className="form-label visually-hidden">Correo electrónico</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                            <input type="email" className="form-control" id="email" placeholder="Correo electrónico" />
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <label htmlFor="password" className="form-label visually-hidden">Contraseña</label>
                                        <div className="input-group">
                                            <span className="input-group-text"><i className="fas fa-lock"></i></span>
                                            <input type="password" className="form-control" id="password" placeholder="Contraseña" />
                                        </div>
                                    </div>
                                    <div className="mt-2 mb-5 form-check">
                                        <input type="checkbox" className="form-check-input" id="rememberMe" />
                                        <label className="form-check-label text-white" htmlFor="rememberMe">Recordarme</label>
                                    </div>
                                    <div className="d-grid gap-2 my-5">
                                        <button type="submit" className="btn btn-primary btn-lg">Login</button>
                                    </div>
                                    <div className="text-center mt-5">
                                        <a href="#" className="fw-bold">¿Has olvidado tu contraseña?</a>
                                    </div>
                                </form>
                            </div>

                            <div className="register-section mt-auto">
                                <p className="mb-0">¿Aún no tienes una cuenta? <a href="#" className="fw-bold">Regístrate acá</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;