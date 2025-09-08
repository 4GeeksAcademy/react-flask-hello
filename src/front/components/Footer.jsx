import React from "react";

export const Footer = () => (
  <footer
    className="text-center py-4"
    style={{
      background: "rgba(240,245,251,0.8)",
      color: "#555",
      borderTop: "1px solid rgba(0,0,0,0.1)",
    }}
  >
    <p>
      Check the{" "}
      <a
        href="https://4geeks.com/docs/start/react-flask-template"
        target="_blank"
        rel="noopener"
        style={{ color: "#FF1493" }}
      >
        template documentation
      </a>{" "}
      for help.
    </p>
    <p>
      Made with <span style={{ color: "#FF1493" }}>❤️</span> by{" "}
      <a href="http://www.4geeksacademy.com" style={{ color: "#00BFFF" }}>
        4Geeks Academy
      </a>
    </p>
  </footer>
);
