import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn } from "../features/users/usersSlice";
//eslint-disable-next-line
export default () => {
  const history = useHistory();
  const userLoggedInStatus = useSelector((state) => state.users.loggedIn);
  const dispatch = useDispatch();
  const onLoggedOut = () => {
    if (userLoggedInStatus) {
      localStorage.setItem("user_token", "");
      history.push("/");
      dispatch(userLoggedIn({ loggedIn: false }));
    }
  };

  const renderAuthLinks = () => {
    if (userLoggedInStatus) {
      return (
        <>
          <Link to="/posts/new" className="nav-link">
            New Post
          </Link>
          <Link to="/users" className="nav-link">
            Users
          </Link>
          )
          <Button className="nav-link" onClick={onLoggedOut}>
            Log Out
          </Button>
        </>
      );
    }
    return (
      <>
        <Link to="/sign-up" className="nav-link">
          Sign-up
        </Link>
        <Link to="/log-in" className="nav-link">
          Log-in
        </Link>
      </>
    );
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/" className="navbar-brand">
          Axel's Blog
        </Link>
        <Nav className="ms-auto">{renderAuthLinks()}</Nav>
      </Container>
    </Navbar>
  );
};
