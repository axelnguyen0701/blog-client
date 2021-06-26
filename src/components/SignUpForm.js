import React, { useState } from "react";
import { InputAdapter, PasswordAdapter } from "./Form";
import { Form as FormWrapper, Field } from "react-final-form";
import { Form, Button } from "react-bootstrap";
import client from "../apis/client";
const required = (value) => (value ? undefined : "Required");

//eslint-disable-next-line
export default () => {
  const [errors, setErrors] = useState("");
  const onSubmit = async ({
    username,
    first_name,
    last_name,
    password,
    password_confirmation,
  }) => {
    if (!username) return { username: "Required" };
    if (!first_name) return { first_name: "Required" };
    if (!last_name) return { last_name: "Required" };
    if (!password) return { password: "Required" };
    if (!password_confirmation) return { password_confirmation: "Required" };

    try {
      const requestData = {
        username,
        first_name,
        last_name,
        password,
        password_confirmation,
      };
      const res = await client.post("/auth/sign-up", requestData);
      localStorage.setItem("user_token", res.data.token);
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
      <h1>User Sign-Up</h1>
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
              <Form.Label>First Name</Form.Label>
              <Field
                name="first_name"
                component={InputAdapter}
                validate={required}
                placeholder="John"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Field
                name="last_name"
                component={InputAdapter}
                validate={required}
                placeholder="Doe"
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

            <Form.Group>
              <Form.Label>Password Confirmation</Form.Label>
              <Field
                name="password_confirmation"
                component={PasswordAdapter}
                validate={required}
                placeholder="Password Confirmation"
              />
            </Form.Group>

            <div className="buttons">
              <Button type="submit" disabled={submitting}>
                Submit
              </Button>
              <Button
                type="button"
                onClick={form.reset}
                className="ml-2"
                disabled={submitting || pristine}
              >
                Reset
              </Button>
            </div>
          </Form>
        )}
      />
    </>
  );
};
