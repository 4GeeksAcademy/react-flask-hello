import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
<nav class="navbar">
  <div class="container-fluid">
    <a class="navbar-brand"><img src="/logoCrema.png" className="logo-navbar" alt="Logo" /></a>
    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>
	);
};