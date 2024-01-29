import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer container-full mt-auto py-5 d-flex justify-content-center">
		
  
	  <div className="footer-item d-flex flex-column">
		<h4 className="footer-header">Browse The Site</h4>
		<a className="footer-link">Home</a>
		<a className="footer-link">Events</a>
		<a className="footer-link">Contact</a>
		<a className="footer-link">Sign Up</a>
	  </div>
  
	  <div className="footer-item d-flex flex-column">
		<h4 className="footer-header">Contact Us</h4>
		<p className="footer-paragraph">mail@email.com</p>
		<p className="footer-paragraph">Tel: +447581 182629</p>
		<p className="footer-paragraph">Tel: +447581 182629</p>
	  </div>
  
	  <div className="footer-item d-flex flex-column">
		<h4 className="footer-header">Find Us</h4>
		<p className="footer-paragraph">123 Events Avenue</p>
		<p className="footer-paragraph">Belfast</p>
		<p className="footer-paragraph">BT1 4HW</p>
	  </div>
  
	</footer>
  );