import React from "react";
import { TextAreaAdapter } from "../Form";
import { Form as FormWrapper, Field } from "react-final-form";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createComment } from "../../features/comments/commentsSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const required = (value) => (value ? undefined : "Required");
//eslint-disable-next-line
export default ({ postId }) => {
  const dispatch = useDispatch();

  const userLoggedInStatus = useSelector((state) => state.users.loggedIn);
  const onSubmit = (values) => {
    if (!values.content) return { content: "Required" };
    const data = {
      content: values.content,
      postId,
    };
    dispatch(createComment(data));
  };

  if (!userLoggedInStatus) {
    return (
      <h4>
        <Link to="/log-in">Log In</Link> to Comment
      </h4>
    );
  }
  return (
    <>
      <FormWrapper
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New comment: </Form.Label>
              <Field
                name="content"
                component={TextAreaAdapter}
                validate={required}
                placeholder="text"
                textHeight="10vh"
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
