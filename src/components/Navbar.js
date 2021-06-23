import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

//eslint-disable-next-line
export default () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/" className="navbar-brand">
          Axel's Blog
        </Link>
        <Nav className="ms-auto">
          <Link to="/posts/new" className="nav-link">
            New Post
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
