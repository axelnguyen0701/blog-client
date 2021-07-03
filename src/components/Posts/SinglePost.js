import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Spinner, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deletePost } from "../../features/posts/postsSlice";
import { fetchPosts } from "../../features/posts/postsSlice";
import CommentShow from "../Comments/CommentShow";
import CommentForm from "../Comments/NewCommentForm";

//eslint-disable-next-line
export default ({ match }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === postId)
  );
  const currentUser = useSelector((state) => state.users.currentUser);
  //   const userLoggedInStatus = useSelector((state) => state.users.loggedIn);
  const postStatus = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const onDeleteClick = () => {
    dispatch(deletePost({ id: postId }));
    history.push("/");
  };
  if (postStatus === "loading" || postStatus === "idle") {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const renderButtons = () => {
    if (currentUser === "axelnguyen0701") {
      return (
        <span className="ml-auto">
          <Link to={`${post.url}/edit`} className="btn btn-secondary mr-2">
            Edit
          </Link>
          <Button variant="danger" onClick={onDeleteClick}>
            Delete
          </Button>
        </span>
      );
    }
  };

  return (
    <>
      <section>
        <article className="post">
          <div className="d-flex">
            <h1 className="d-inline mr-3">{post.title}</h1>
            {renderButtons()}
          </div>
          <div className="text-muted float-right">
            on {post.formatted_date} by{" "}
            <em>
              <strong>
                <Link to={post.author.url}>{post.author.username}</Link>
              </strong>
            </em>
          </div>
          <br />
          <p>{post.content}</p>
        </article>
      </section>
      <section>
        <h3>Comments</h3>
        <Row>
          <Col lg={6}>
            <CommentShow postId={postId} />
          </Col>
          <Col lg={6}>
            <CommentForm postId={postId} />
          </Col>
        </Row>
      </section>
    </>
  );
};
