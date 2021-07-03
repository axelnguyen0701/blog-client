import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Dropdown,
  NavItem,
  NavLink,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedOut } from "../features/users/usersSlice";
//eslint-disable-next-line
export default () => {
  const history = useHistory();
  const userLoggedInStatus = useSelector((state) => state.users.loggedIn);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const onLoggedOut = () => {
    if (userLoggedInStatus) {
      localStorage.setItem("user_token", "");
      history.push("/");
      dispatch(userLoggedOut());
    }
  };

  const renderAuthLinks = () => {
    if (userLoggedInStatus) {
      return (
        <>
          <Dropdown as={NavItem}>
            <Dropdown.Toggle as={NavLink}>
              Hi <strong>{currentUser}</strong>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/posts/new">
                Create Post
              </Dropdown.Item>

              <Dropdown.Item as={Link} to="/users">
                Users
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button className="nav-link" onClick={onLoggedOut} variant="dark">
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
