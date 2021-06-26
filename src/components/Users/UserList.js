import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/usersSlice";
import { Link } from "react-router-dom";
//eslint-disable-next-line
export default (props) => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const userStatus = useSelector((state) => state.users.status);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

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
