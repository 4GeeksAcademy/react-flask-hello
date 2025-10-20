import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid justify-content-end">
    <a class="navbar-brand" href="#">Products</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Shopping Cart</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">QR Code Generator</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact Us</a>
        </li>
       <li class="nav-item">
          <a class="nav-link" href="#">Login</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
	);
};