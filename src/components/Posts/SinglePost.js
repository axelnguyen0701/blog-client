import React from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deletePost } from "../../features/posts/postsSlice";
//eslint-disable-next-line
export default ({ match }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === postId)
  );
  //   const userLoggedInStatus = useSelector((state) => state.users.loggedIn);

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

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <Link to={`${post.url}/edit`} className="btn btn-primary mr-2">
          Edit
        </Link>
        <Button variant="danger" onClick={onDeleteClick}>
          Delete
        </Button>
        <p>{post.content}</p>
      </article>
    </section>
  );
};
