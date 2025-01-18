import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';

const Navbar = ({ token, setToken }) => {
  const handleLogout = () => {
    setToken(null);
  };

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <BootstrapNavbar.Brand as={Link} to="/">Task Assigner..!</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          
          {token && (
            <>
              <Nav.Link as={Link} to="/templates">Templates</Nav.Link>
              <Nav.Link as={Link} to="/create-template">Create Template</Nav.Link>
              <Nav.Link as={Link} to="/assign-task">Assign Task</Nav.Link>
              <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
              <Button variant="link" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
