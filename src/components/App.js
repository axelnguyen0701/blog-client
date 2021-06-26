import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PostList from "./Posts/PostList";
import NavBar from "./Navbar";
import { Container } from "react-bootstrap";
import SinglePost from "./Posts/SinglePost";
import NewPostForm from "./Posts/NewPostForm";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import UserList from "./Users/UserList";
import UserShow from "./Users/UserShow";
import EditPostForm from "./Posts/EditPostForm";
class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar />
        <div className="App vh-100">
          <Container className="mt-5">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <>
                    <PostList />
                  </>
                )}
              />
              <Route exact path="/sign-up" component={SignUpForm} />
              <Route exact path="/log-in" component={LogInForm} />
              <Route exact path="/users" component={UserList} />
              <Route exact path="/posts/new" component={NewPostForm} />
              <Route exact path="/posts/:postId" component={SinglePost} />
              <Route
                exact
                path="/posts/:postId/edit"
                component={EditPostForm}
              />
              <Route exact path="/users/:userId" component={UserShow} />

              <Redirect to="/" />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
