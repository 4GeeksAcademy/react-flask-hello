import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-muted py-3">
      <hr />
      <small>LevelUp © {new Date().getFullYear()}</small>
    </footer>
  );
};

export default Footer;
