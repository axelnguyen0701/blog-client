import React, { useEffect } from "react";
import { ListGroup, Col, Tab, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../features/posts/postsSlice";
//eslint-disable-next-line
export default (props) => {
  const posts = useSelector((state) => state.posts.posts);
  let renderedPost = [];
  const dispatch = useDispatch();

  const postStatus = useSelector((state) => state.posts.status);
  const userStatus = useSelector((state) => state.users.loggedIn);

  if (!userStatus) {
    renderedPost = posts.filter((post) => post.published);
  } else {
    renderedPost = posts;
  }

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const renderedPostsTab = renderedPost.map((post, index) => (
    <ListGroup.Item action key={post._id} href={`#${index}`}>
      {post.title}
    </ListGroup.Item>
  ));

  const renderedPostsContent = renderedPost.map((post, index) => {
    return (
      <Tab.Pane key={post._id} eventKey={`#${index}`}>
        <Link to={post.url} className="display-4">
          {post.title}
        </Link>
        <p>{`${post.content.slice(0, 20)}...`}</p>
        <hr />
        <p className="text-muted">
          by {post.author.full_name} on {post.formatted_date}
        </p>
      </Tab.Pane>
    );
  });

  const renderTab = () => {
    if (postStatus === "loading") {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else if (postStatus === "failed") {
      return <div>Not found</div>;
    } else {
      return (
        <Tab.Container id="post-group-tabs" defaultActiveKey="#0">
          <Row>
            <Col sm={8}>
              <Tab.Content>{renderedPostsContent}</Tab.Content>
            </Col>
            <Col sm={4}>
              <ListGroup>{renderedPostsTab}</ListGroup>
            </Col>
          </Row>
        </Tab.Container>
      );
    }
  };

  return <>{renderTab()}</>;
};
