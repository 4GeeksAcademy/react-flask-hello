// src/front/pages/Account.jsx
import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Account = () => {
    const { store } =
        (typeof useGlobalReducer === "function" ? useGlobalReducer() : { store: {} }) ||
        { store: {} };

    const token = store?.session?.token ?? null;
    const firstName = store?.user?.first_name ?? "Guest";

    // Placeholder listing (replace with API/store data when available)
    const listing = store?.listing ?? {
        image_url: "https://picsum.photos/id/237/800/600",
        name: "Sample Property Listing",
        street: "123 Example Street",
        city: "Miami",
        state: "FL",
        guest_name: "John Doe",
    };

    const [welcomeMsg, setWelcomeMsg] = useState("");

    // Guard: no token means show login redirect UI
    if (!token) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="text-center p-4">
                    <h1 className="h4 mb-2">Not authorized</h1>
                    <p className="text-muted mb-3">Please log in to view your account.</p>
                    <a className="btn btn-primary" href="/login">
                        Go to Login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <span className="navbar-brand">YourApp</span>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#accNavbar"
                        aria-controls="accNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="accNavbar">
                        <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
                            <li className="nav-item">
                                <button type="button" className="btn btn-outline-light btn-sm">
                                    Account settings
                                </button>
                            </li>
                            <li className="nav-item">
                                <button type="button" className="btn btn-primary btn-sm">
                                    Account settings
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main */}
            <main className="container flex-grow-1 py-5">
                <h1 className="display-6 text-center mb-4">Welcome {firstName}</h1>

                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                        <div className="card shadow-sm border-0">
                            <div className="row g-0">
                                {/* Image left */}
                                <div className="col-md-5">
                                    <img
                                        src={listing.image_url}
                                        alt="Property"
                                        className="img-fluid h-100 w-100 object-fit-cover rounded-start"
                                        style={{ minHeight: 240 }}
                                    />
                                </div>

                                {/* Details right */}
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h5 className="card-title mb-2">{listing.name}</h5>
                                        <p className="card-text mb-1">{listing.street}</p>
                                        <p className="card-text mb-1">
                                            {listing.city}, {listing.state}
                                        </p>
                                        <p className="card-text text-muted">Guest: {listing.guest_name}</p>

                                        {/* Welcome message */}
                                        <div className="mb-2">
                                            <label htmlFor="welcomeMessage" className="form-label">
                                                Personalized welcome
                                            </label>
                                            <textarea
                                                id="welcomeMessage"
                                                className="form-control"
                                                rows={4}
                                                value={welcomeMsg}
                                                onChange={(e) => setWelcomeMsg(e.target.value)}
                                                placeholder="Leave a personalized welcome for your guest"
                                            />
                                        </div>

                                        <div className="d-flex gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => alert("Welcome message saved (demo).")}
                                            >
                                                Save message
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setWelcomeMsg("")}
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* /right */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
