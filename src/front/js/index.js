//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/index.scss";

import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
