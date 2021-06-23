import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PostList from "./PostList";
import NavBar from "./Navbar";
import { Container } from "react-bootstrap";
import BlogShow from "./SinglePost";
import NewPostForm from "./NewPostForm";
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
              <Route exact path="/posts/new" component={NewPostForm} />
              <Route exact path="/posts/:postId" component={BlogShow} />

              <Redirect to="/" />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
