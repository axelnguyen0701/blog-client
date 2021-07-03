import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../features/users/usersSlice";
//eslint-disable-next-line
export default ({ match }) => {
  const { userId } = match.params;
  const user = useSelector((state) =>
    state.users.users.find((user) => user._id === userId)
  );
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.users.fetchStatus);
  const userLoggedIn = useSelector((state) => state.users.loggedIn);
  const currentUser = useSelector((state) => state.users.currentUser);
  useEffect(() => {
    if (userStatus === "idle" && userLoggedIn) {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch, userLoggedIn]);
  const posts = useSelector((state) =>
    state.posts.posts.filter((post) => {
      return post.author._id === userId;
    })
  );
  if (!user) {
    return (
      <section>
        User not found or you must <Link to="/log-in">login</Link> to see this
      </section>
    );
  }

  const renderPost = () => {
    if (currentUser !== "axelnguyen0701") {
      const filteredPosts = posts.filter((post) => post.published);
      return filteredPosts.map((post) => (
        <li key={post._id}>
          <Link to={post.url}>{post.title}</Link>
        </li>
      ));
    }
    return posts.map((post) => (
      <li key={post._id}>
        <Link to={post.url}>{post.title}</Link>
      </li>
    ));
  };
  return (
    <section>
      <h2>{user.username}</h2>
      <p>{user.full_name}</p>
      <ul>{renderPost()}</ul>
    </section>
  );
};
