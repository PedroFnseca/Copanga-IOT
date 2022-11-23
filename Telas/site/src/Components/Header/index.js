import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";

function index() {
  return (
    <Navbar bg="light" variant="light" id="r">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              src={require("../../Imagens/logoofc.png")}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </Navbar.Brand>
        {/* <Navbar.Brand><Link to='/' id="linkNavbar">COPANGA</Link></Navbar.Brand> */}
        <Nav className="me-auto">
          <Nav.Link>
            <Link to="/sensores" id="linkNavbar">
              Sensores
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/valvulas" id="linkNavbar">
              Válvulas
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/relatorios" id="linkNavbar">
              Relatórios
            </Link>
          </Nav.Link>
          {/* <Nav.Link>
            <Link to="/meteorologia" id="linkNavbar">
              Meteorologia
            </Link>
          </Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default index;
