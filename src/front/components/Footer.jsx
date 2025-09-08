import React from "react";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
	<footer className="footer mt-auto py-3 text-center">
	  <p className="mb-1">
		<strong>WhiteGlove <span className="text-primary">BnB</span></strong> • Simple stays, polished details.
	  </p>
	  <p className="mb-0">
		<small>© {year} WhiteGlove BnB</small>
	  </p>
	</footer>
  );
};
