import React, { useEffect } from "react";
import { ListGroup, Col, Tab, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postsSlice";
//eslint-disable-next-line
export default (props) => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const postStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const renderedPostsTab = posts.map((post, index) => (
    <ListGroup.Item action key={post._id} href={`#${index}`}>
      {post.title}
    </ListGroup.Item>
  ));

  const renderedPostsContent = posts.map((post, index) => {
    return (
      <Tab.Pane key={post._id} eventKey={`#${index}`}>
        <p>{post.content}</p>
        <hr />
        <p className="text-muted">
          by {post.author.full_name} on {post.formatted_date}
        </p>
      </Tab.Pane>
    );
  });

  return (
    <>
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
    </>
  );
};
