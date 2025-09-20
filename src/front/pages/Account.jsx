import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export const Account = () => {
    const { store } =
        (typeof useGlobalReducer === "function" ? useGlobalReducer() : { store: {} }) ||
        { store: {} };

    const token = store?.session?.token ?? null;
    const firstName = store?.user?.first_name ?? "Guest";

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        // Public endpoint; no auth header required
        const url = `${API_BASE}/calendar/reserved?tz=America/New_York`;
        fetch(url)
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then((data) => {
                setReservations(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((e) => {
                setErr(e.message);
                setLoading(false);
            });
    }, []);

    if (!token) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="text-center p-4">
                    <h1 className="h4 mb-2">Not authorized</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 d-flex flex-column bg-light">
            {/* Simple header */}
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <span className="navbar-brand">Account</span>
                </div>
            </nav>

            <main className="container py-4 flex-grow-1">
                <h1 className="h4 mb-4">Welcome {firstName}</h1>

                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h2 className="h5 mb-0">Upcoming Reservations</h2>
                    {loading && <span className="text-muted small">Loading…</span>}
                    {err && <span className="text-danger small">Error: {err}</span>}
                </div>

                <div className="row g-3">
                    {reservations.map((r) => (
                        <div key={r.event} className="col-12 col-md-6 col-xl-4">
                            <div className="card shadow-sm h-100">
                                <img
                                    src={r.image || "https://picsum.photos/seed/guest/800/500"}
                                    alt="Event"
                                    className="card-img-top"
                                    style={{ objectFit: "cover", height: 200 }}
                                />
                                <div className="card-body">
                                    {/* Exactly the five items requested */}
                                    <p className="mb-1">
                                        <strong>event (uid):</strong> {r.event}
                                    </p>
                                    <p className="mb-1">
                                        <strong>checkin (start date):</strong> {r.checkin}
                                    </p>
                                    <p className="mb-2">
                                        <strong>checkout (end date):</strong> {r.checkout}
                                    </p>
                                    {r.reservation_url ? (
                                        <a
                                            href={r.reservation_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            reservation_url
                                        </a>
                                    ) : (
                                        <button className="btn btn-sm btn-outline-secondary" disabled>
                                            reservation_url (none)
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {!loading && reservations.length === 0 && !err && (
                        <div className="col-12">
                            <div className="alert alert-info">No reservations found.</div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Account;