import React from "react";
import PostList from "./PostList";
import { Container } from "react-bootstrap";
class App extends React.Component {
  render() {
    return (
      <Container>
        <PostList />
      </Container>
    );
  }
}

export default App;
