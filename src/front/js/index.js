//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import {Support} from './pages/support'
import Layout from "./layout";
// import BookDetails from './front/js/pages/book-details'

//include your index.scss file into the bundle
import "../styles/index.css";



//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));

