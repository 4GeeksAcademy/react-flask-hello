import React, { useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Logo from './Logo';
import SearchBar from './SearchBar';
import '../../styles/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Button, Dropdown } from 'react-bootstrap';
import { Context } from '../store/appContext';

function getInitials(name) {
  if (!name) return '';
  const names = name.split(' ');
  const initials = names.map(n => n[0]).join('');
  return initials.toUpperCase();
}

const NavBar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const isLoggedIn = !!store.token;
  const userName = store.userName;
  const userProfileImageUrl = store.userProfileImageUrl;
  const userInitials = getInitials(userName || "");

  const handleLogout = () => {
    actions.logout();
    navigate('/login');
  };

  return (
    <Navbar bg="body-tertiary" expand="lg" className="align-items-center mb-5 p-0 navbar-custom-bg">
      <div className="container-fluid">
        <Navbar.Brand as={NavLink} to="/"><Logo /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <NavDropdown title="Menu" id="navbarScrollingDropdown" className="custom-dropdown-toggle">
              <NavDropdown.Item as={NavLink} to="/recomendaciones">Recommendations</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/autores">Authors</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/generos">Genres</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/best-seller">Best Seller</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/mas-buscados">Most Wanted</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/random-books">Random Books</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="mx-auto">
            <SearchBar />
          </div>
          <div className="d-flex justify-content-end align-items-center">
            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="" className="p-0" id="dropdown-profile">
                  <div className="profile-image-oval" style={{ backgroundImage: userProfileImageUrl ? `url(${userProfileImageUrl})` : 'none' }}>
                    {!userProfileImageUrl && <span>{userInitials}</span>}
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/perfil">Profile</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/configuraciones">Settings</Dropdown.Item>
                  {/* <Dropdown.Item as={NavLink} to="/favorites">Favorites</Dropdown.Item> */}
                  <Dropdown.Item as={NavLink} to="/mensajes">Messages</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Button onClick={() => navigate('/signup')} variant="primary" className="login-signup-btn me-2">
                  Sign Up
                </Button>
                <Button onClick={() => navigate('/login')} variant="secondary" className="login-signup-btn">
                  Log In
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
