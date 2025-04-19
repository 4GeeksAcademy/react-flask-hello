// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const candidates = [
            document.querySelector(".content-container"),
            document.querySelector(".app-root"),
            document.getElementById("root"),
            document.body,
            document.documentElement,
        ];

        for (let el of candidates) {
            if (el && typeof el.scrollTo === "function") {
                el.scrollTo({ top: 0, behavior: "smooth" }); // 🧈 animación suave activada
            }
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;
