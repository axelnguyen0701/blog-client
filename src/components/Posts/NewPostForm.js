import React, { useState } from "react";
import { InputAdapter, TextAreaAdapter, ToggleAdapter } from "../Form";
import { Form as FormWrapper, Field } from "react-final-form";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { createPost } from "../../features/posts/postsSlice";
const required = (value) => (value ? undefined : "Required");
//eslint-disable-next-line
export default () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [published, setPublished] = useState(false);

  const onSubmit = (values) => {
    if (!values.title) return { title: "Required" };
    if (!values.content) return { content: "Required" };
    const requestData = {
      title: values.title,
      content: values.content,
      published: published,
    };
    dispatch(createPost(requestData));
    history.push("/");
  };

  return (
    <>
      <h1>New Post Form</h1>
      <FormWrapper
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Post Title</Form.Label>
              <Field
                name="title"
                component={InputAdapter}
                validate={required}
                placeholder="text"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Post Content</Form.Label>
              <Field
                name="content"
                component={TextAreaAdapter}
                validate={required}
                placeholder="text"
              />
            </Form.Group>

            <Form.Group>
              <Field
                name="published"
                label="Published?"
                checked={published}
                component={ToggleAdapter}
                onChange={(value) => setPublished(value.target.checked)}
              />
            </Form.Group>

            <div className="buttons">
              <Button type="submit" disabled={submitting}>
                Submit
              </Button>
              <Button
                type="button"
                onClick={form.reset}
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
