//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));

//change the navbar colour on click

var signUpBtn = document.getElementById('signUpBtn');
var logInBtn = document.getElementById('logInBtn');

signUpBtn.addEventListener('click', function() {
  signUpBtn.style.backgroundColor = '#FF8D91';
});

