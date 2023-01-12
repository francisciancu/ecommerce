import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DateAndClock from "./DateAndClock";
import "../assets/css/headers.css";

function Header(props) {
  return (
    <>
      <Navbar sticky="top" bg="primary" variant="dark" expand="md">
        <Container>
          <Nav>
            <Navbar.Brand>MagON</Navbar.Brand>
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Produse" id="navbarScrollingDropdown">
              <NavDropdown.Item href="">wip</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="info">Search</Button>
          </Form>

          {props.isLogged ? (
            <>
              <div className="welcomeCustomer">Hello {props.customer}</div>
            </>
          ) : (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          )}
          <DateAndClock />
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
