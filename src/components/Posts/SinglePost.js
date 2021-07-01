import React from "react";
import { useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deletePost } from "../../features/posts/postsSlice";
import CommentShow from "../Comments/CommentShow";
//eslint-disable-next-line
export default ({ match }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === postId)
  );
  const userLoggedInStatus = useSelector((state) => state.users.loggedIn);
  //   const userLoggedInStatus = useSelector((state) => state.users.loggedIn);
  const postStatus = useSelector((state) => state.posts.status);
  const onDeleteClick = () => {
    dispatch(deletePost({ id: postId }));
    history.push("/");
  };

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  if (postStatus === "loading") {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <section>
        <article className="post">
          <h2>{post.title}</h2>
          {userLoggedInStatus ? (
            <div className="mt-2">
              <Link to={`${post.url}/edit`} className="btn btn-primary mr-2">
                Edit
              </Link>
              <Button variant="danger" onClick={onDeleteClick}>
                Delete
              </Button>
            </div>
          ) : null}

          <p>{post.content}</p>
        </article>
      </section>
      <section>
        <h1>Comments</h1>
        <CommentShow postId={postId} />
      </section>
    </>
  );
};
