import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//eslint-disable-next-line
export default ({ match }) => {
  const { postId } = match.params;
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === postId)
  );
  //   const userLoggedInStatus = useSelector((state) => state.users.loggedIn);

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
        <Link to={`${post.url}/edit`}>Edit</Link>
        <p>{post.content}</p>
      </article>
    </section>
  );
};
