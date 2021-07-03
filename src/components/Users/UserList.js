import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/usersSlice";
import { Link } from "react-router-dom";
//eslint-disable-next-line
export default (props) => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.users.error);
  const userStatus = useSelector((state) => state.users.fetchStatus);
  const userLoggedIn = useSelector((state) => state.users.loggedIn);
  useEffect(() => {
    if (userStatus === "idle" && userLoggedIn) {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch, userLoggedIn]);
  if (!userLoggedIn) {
    return (
      <div>
        You must <Link to="/log-in">login</Link> to see this
      </div>
    );
  }
  if (userStatus === "failed") {
    return <div>{error}</div>;
  }

  const renderedUserList = users.map((user) => (
    <li key={user._id}>
      <Link to={user.url} className="display-4">
        {user.username}
      </Link>
      <p>{user.full_name}</p>
    </li>
  ));
  return <div>{renderedUserList}</div>;
};
