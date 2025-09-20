import React, { useEffect, useMemo, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

/** Strip prefixes like "Reserved - " from the event title to get the guest name */
function extractGuestName(eventTitle) {
    if (!eventTitle) return "";
    const cleaned = String(eventTitle).trim();
    const patterns = [
        /^Reserved\s*[-–—]\s*/i,       // Reserved - Name / Reserved–Name / Reserved — Name
        /^Reserva(do|da)?\s*[-–—]\s*/i // Spanish/Portuguese variants (optional)
    ];
    let name = cleaned;
    for (const p of patterns) name = name.replace(p, "");
    return name.trim();
}

/** Format ISO to a readable local date */
function fmtDate(iso) {
    if (!iso) return "";
    try {
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch {
        return iso;
    }
}

/** Convert Google Drive links to a direct-view image URL */
function toDriveDirect(url) {
    if (!url) return null;
    // /file/d/<id>/view
    const m1 = url.match(/https?:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view/i);
    if (m1) return `https://drive.google.com/uc?export=view&id=${m1[1]}`;
    // open?id=<id>
    const m2 = url.match(/https?:\/\/drive\.google\.com\/open\?id=([^&]+)/i);
    if (m2) return `https://drive.google.com/uc?export=view&id=${m2[1]}`;
    // uc?export=view&id=<id>
    const m3 = url.match(/https?:\/\/drive\.google\.com\/uc\?(?:export=\w+&)?id=([^&]+)/i);
    if (m3) return `https://drive.google.com/uc?export=view&id=${m3[1]}`;
    return null;
}

export const Account = () => {
    const { store } =
        (typeof useGlobalReducer === "function" ? useGlobalReducer() : { store: {} }) || { store: {} };

    // Testing bypass
    // const token = store?.session?.token ?? null;
    const token = store?.token ?? true;

    // Show account email
    const email = store?.user?.email ?? "Guest";

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const url = `${API_BASE}/calendar/reserved?tz=America/New_York`;
        fetch(url)
            .then(async (r) => {
                const txt = await r.text();
                if (!r.ok) throw new Error(`HTTP ${r.status}: ${txt.slice(0, 200)}`);
                try {
                    return JSON.parse(txt);
                } catch {
                    throw new Error(`Expected JSON, got: ${txt.slice(0, 120)}`);
                }
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

    // Build UI items:
    // - Prefer backend-provided image (r.image).
    // - If missing, but reservation_url is a public Google Drive link, convert and use that as the image.
    // - Always show the personalized note textbox; do NOT render a reservation button/link.
    const items = useMemo(
        () =>
            reservations.map((r) => {
                const directFromReservation = toDriveDirect(r.reservation_url || "");
                const imageSrc =
                    (r.image && r.image.trim()) ||
                    (directFromReservation && directFromReservation.trim()) ||
                    "https://picsum.photos/seed/guest/600/400";

                return {
                    key: r.event || crypto.randomUUID(),
                    guestName: extractGuestName(r.title || r.event),
                    checkin: fmtDate(r.checkin),
                    checkout: fmtDate(r.checkout),
                    image: imageSrc
                };
            }),
        [reservations]
    );

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
            <main className="container py-4 flex-grow-1">
                <h1 className="h4 mb-4">Welcome {email}</h1>

                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h2 className="h5 mb-0">Upcoming Reservations</h2>
                    {loading && <span className="text-muted small">Loading…</span>}
                    {err && <span className="text-danger small">Error: {err}</span>}
                </div>

                {/* Centered, one-per-row cards */}
                <div className="row g-4">
                    {items.map((it) => (
                        <div key={it.key} className="col-12 d-flex justify-content-center">
                            <div className="card shadow-sm border-0 w-100" style={{ maxWidth: 900 }}>
                                <div className="row g-0 align-items-stretch">
                                    {/* Left: guest picture (from r.image or reservation_url if it's a Drive link) */}
                                    <div className="col-5 col-sm-4 col-md-3">
                                        <img
                                            src={it.image}
                                            alt="Guest"
                                            className="img-fluid w-100 h-100 object-fit-cover rounded-start"
                                            style={{ minHeight: 180 }}
                                        />
                                    </div>

                                    {/* Right: name, then check-in, then check-out, then always show note textbox */}
                                    <div className="col-7 col-sm-8 col-md-9">
                                        <div className="card-body">
                                            <h5 className="card-title mb-2">{it.guestName || "(No name in event)"}</h5>

                                            <div className="mb-1">
                                                <strong>Check-in:</strong> {it.checkin || "—"}
                                            </div>
                                            <div className="mb-3">
                                                <strong>Check-out:</strong> {it.checkout || "—"}
                                            </div>

                                            {/* Always render personalized note textbox */}
                                            <input
                                                type="text"
                                                className="form-control form-control-sm text-muted"
                                                placeholder="write your personalized note here"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {!loading && items.length === 0 && !err && (
                        <div className="col-12 d-flex justify-content-center">
                            <div className="alert alert-info mb-0 w-100" style={{ maxWidth: 900 }}>
                                No reservations found.
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Account;