import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import './Header.css';

function Header() {
  return (
    <header className="header">
    <Navbar bg="light" data-bs-theme="light">
      <div className="container">
      <Nav variant='tabs'>
        <Nav.Link as={Link} href='/' to='/'>Home</Nav.Link>
        <Nav.Link as={Link} href='/eventos' to='/eventos'>Eventos</Nav.Link>
        <Nav.Link as={Link} href='/ingressos' to='/ingressos'>Ingressos</Nav.Link>
    </Nav>
      </div>
      </Navbar>
    </header>
  );
}

export default Header;
