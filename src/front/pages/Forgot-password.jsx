import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://glorious-space-halibut-r49v46gv46qfx5qw-3001.app.github.dev";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [favoritePet, setFavoritePet] = useState("");
    const [busy, setBusy] = useState(false);
    const [resultText, setResultText] = useState(""); // shows password or error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResultText("");
        setBusy(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.trim(),
                    favorite_pet: favoritePet.trim(),
                }),
            });

            if (res.ok) {
                const data = await res.json();
                // Reveal password on success (as you specified for this project)
                setResultText(data?.password ?? "");
            } else {
                setResultText("The information entered is incorrect, please contact the administator");
            }
        } catch {
            setResultText("The information entered is incorrect, please contact the administator");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            <main className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4 p-md-5">
                            <h1 className="h4 text-center mb-2">Forgot Password</h1>
                            <p className="text-muted text-center mb-4">
                                Enter your Email and Favorite Pet then submit to get your password.
                            </p>

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3 text-center">
                                    <label htmlFor="fpEmail" className="form-label">Email</label>
                                    <input
                                        id="fpEmail"
                                        type="email"
                                        className="form-control mx-auto"
                                        style={{ maxWidth: 420 }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        required
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div className="mb-3 text-center">
                                    <label htmlFor="fpPet" className="form-label">Favorite Pet</label>
                                    <input
                                        id="fpPet"
                                        type="text"
                                        className="form-control mx-auto"
                                        style={{ maxWidth: 420 }}
                                        value={favoritePet}
                                        onChange={(e) => setFavoritePet(e.target.value)}
                                        autoComplete="off"
                                        required
                                        placeholder="e.g., Luna"
                                    />
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary" disabled={busy}>
                                        {busy ? "Checking..." : "Submit"}
                                    </button>
                                </div>
                            </form>

                            {/* Box directly under the submit button */}
                            <div
                                className="form-control mt-3 mx-auto text-center"
                                style={{ maxWidth: 420, minHeight: 56, display: "flex", alignItems: "center", justifyContent: "center" }}
                                aria-live="polite"
                            >
                                {resultText}
                            </div>

                            <div className="text-center mt-3">
                                <Link to="/login">Return to sign-in page</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
