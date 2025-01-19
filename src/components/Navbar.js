import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CheckSquare, LogOut } from 'lucide-react';
import { Navbar as BootstrapNavbar, Nav, Button, Container } from 'react-bootstrap';

const Navbar = ({ token, setToken }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const handleLogout = () => {
    setToken(null);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <BootstrapNavbar 
      fixed="top" 
      bg="white" 
      expand="md" 
      className="border-bottom border-gray-200 shadow-sm"
    >
      <Container fluid className="px-4 mx-auto max-w-7xl">
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          className="d-flex align-items-center"
        >
          <CheckSquare 
            size={32} 
            className="text-primary" 
          />
          <span className="ms-2 fw-bold text-dark fs-4">
            Task Assigner
          </span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav"
          className="border-0"
        >
          {isOpen ? (
            <X size={24} className="text-secondary" />
          ) : (
            <Menu size={24} className="text-secondary" />
          )}
        </BootstrapNavbar.Toggle>

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {token && (
              <>
                <Nav.Link
                  as={Link}
                  to="/assign-task"
                  className={`px-3 py-2 rounded-3 mx-1 ${
                    isActivePath('/assign-task')
                      ? 'bg-primary bg-opacity-10 text-primary'
                      : 'text-secondary hover:bg-light'
                  }`}
                >
                  Assign Task
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/tasks"
                  className={`px-3 py-2 rounded-3 mx-1 ${
                    isActivePath('/tasks')
                      ? 'bg-primary bg-opacity-10 text-primary'
                      : 'text-secondary hover:bg-light'
                  }`}
                >
                  Tasks
                </Nav.Link>
                <Button
                  variant="link"
                  onClick={handleLogout}
                  className="text-secondary hover:text-danger d-flex align-items-center gap-2 text-decoration-none"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;