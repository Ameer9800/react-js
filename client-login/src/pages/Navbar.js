import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Appbar() {
  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Link to="/home">
            <Navbar.Brand>Navbar</Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Link to="/home">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav className="d-flex">
            <Nav.Link onClick={logOut}>LogOut</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
