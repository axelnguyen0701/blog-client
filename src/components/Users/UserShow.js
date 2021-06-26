import React from "react";
import { useSelector } from "react-redux";

//eslint-disable-next-line
export default ({ match }) => {
  const { userId } = match.params;
  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === userId)
  );

  if (!user) {
    return (
      <section>
        <h2>User not found</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>{user.username}</h2>
      <p>{user.full_name}</p>
    </section>
  );
};
