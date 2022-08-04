import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './header.css'

function index() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand><Link to='/' id="linkNavbar">COPANGA</Link></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link><Link to='/sensores' id="linkNavbar">Sensores</Link></Nav.Link>
          <Nav.Link><Link to='/' id="linkNavbar">Válvulas</Link></Nav.Link>
          <Nav.Link><Link to='/' id="linkNavbar">Relatórios</Link></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default index