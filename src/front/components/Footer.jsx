import React from "react";

export const Footer = () => (
  <footer
    className="text-center py-4"
    style={{
      background: "linear-gradient(to right, #1a0033, #330033)",
      color: "#ccc",
      borderTop: "1px solid rgba(255,255,255,0.2)",
      fontFamily: "'Orbitron', sans-serif",
      boxShadow: "0 -2px 10px rgba(255, 0, 204, 0.3)",
    }}
  >
<p>
  Made with{" "}
  <span style={{ color: "#FF00FF", textShadow: "0 0 10px #FF00FF, 0 0 20px #FF00FF" }}>❤️</span> by{" "}
  <span style={{
    color: "#00AFFF",
    textShadow: "0 0 10px #00AFFF, 0 0 20px #00AFFF, 0 0 40px #00AFFF"
  }}>
    Jackie, Israel & Drew.
  </span>
</p>


  </footer>
);
