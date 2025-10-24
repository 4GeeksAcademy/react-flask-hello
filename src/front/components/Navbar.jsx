import { Link } from "react-router-dom";
import logo from "../assets/img/Logo.png"
export const Navbar = () => {

  return (


    <nav className="navbar navbar-expand-lg bg-transparent ">
      
      <div className="container-fluid ">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <Link to="/">
          <img
            src={logo}
            alt="Logo"
            width="360"
            height="56"
            className="d-inline-block align-text-top me-2"
          />
          </Link>
        </a>
        <div className="d-flex">
        <a className="navbar-brand m-3 " href="#">Products</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item m-3">
              <a className="nav-link active" aria-current="page" href="#">Shopping Cart</a>
            </li>
            <li className="nav-item m-3">
              <a className="nav-link" href="#">QR Code Generator</a>
            </li>
          
            <li className="nav-item">
              <Link to="/Login" className="btn btn-danger m-3 px-4" ><strong>Login</strong></Link>
            </li>
          </ul>
        </div>
        </div>
      </div>
      
    </nav>
  );
};