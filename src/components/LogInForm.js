import React, { useState } from "react";
import { InputAdapter, PasswordAdapter } from "./Form";
import { Form as FormWrapper, Field } from "react-final-form";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import client from "../apis/client";
import { userLoggedIn } from "../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
const required = (value) => (value ? undefined : "Required");
//eslint-disable-next-line
export default () => {
  const history = useHistory();
  const [errors, setErrors] = useState("");

  const dispatch = useDispatch();
  const userLoggedInStatus = useSelector((state) => state.users.loggedIn);
  if (userLoggedInStatus) {
    return <div>Already Logged In</div>;
  }

  const onSubmit = async ({ username, password }) => {
    if (!username) return { username: "Required" };
    if (!password) return { password: "Required" };

    try {
      const requestData = {
        username,
        password,
      };
      const res = await client.post("/auth/login", requestData);
      localStorage.setItem("user_token", res.data.token);
      dispatch(userLoggedIn({ loggedIn: true }));
      history.push("/");
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error);
      }
    }
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
