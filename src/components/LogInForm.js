import React from "react";
import { InputAdapter, PasswordAdapter } from "./Form";
import { Form as FormWrapper, Field } from "react-final-form";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/users/usersSlice";
const required = (value) => (value ? undefined : "Required");
//eslint-disable-next-line
export default () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const errors = useSelector((state) => state.users.error);
  const userLoggedInStatus = useSelector((state) => state.users.loggedIn);
  if (userLoggedInStatus) {
    return <div>Already Logged In</div>;
  }

  const onSubmit = async ({ username, password }) => {
    if (!username) return { username: "Required" };
    if (!password) return { password: "Required" };

    const requestData = {
      username,
      password,
    };
    dispatch(loginUser(requestData));
    history.push("/");
  };

  return (
    <>
      <h1>User Log-In</h1>
      <h4 className="text-danger"> {errors ? errors : ""}</h4>
      <FormWrapper
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Field
                name="username"
                component={InputAdapter}
                validate={required}
                placeholder="JohnDoe123"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Field
                name="password"
                component={PasswordAdapter}
                validate={required}
                placeholder="Password"
              />
            </Form.Group>

            <div className="buttons">
              <Button type="submit" disabled={submitting}>
                Submit
              </Button>
            </div>
          </Form>
        )}
      />
    </>
  );
};
