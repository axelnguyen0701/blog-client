import React, { useState } from "react";
import { Form as FormWrapper, Field } from "react-final-form";
import { Form, Button } from "react-bootstrap";
import client from "../apis/client";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { updatePosts } from "../features/posts/postsSlice";

const required = (value) => (value ? undefined : "Required");

const InputAdapter = ({ input, meta, ...rest }) => (
  <>
    <Form.Control
      {...input}
      {...rest}
      onChange={(event) => input.onChange(event.target.value)}
      isInvalid={meta.touched && meta.error}
    />
    <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
  </>
);

const TextAreaAdapter = ({ input, meta, ...rest }) => (
  <>
    <Form.Control
      as="textarea"
      {...input}
      {...rest}
      onChange={(event) => input.onChange(event.target.value)}
      isInvalid={meta.touched && meta.error}
    />
    <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
  </>
);

const ToggleAdapter = ({ input: { onChange, checked }, label, ...rest }) => (
  <Form.Check
    type="switch"
    id="published"
    label={label}
    checked={checked}
    onChange={(event) => {
      onChange(event);
    }}
    {...rest}
  />
);

//eslint-disable-next-line
export default () => {
  let history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);

  const onSubmit = async (values) => {
    if (!values.title) return { title: "Required" };
    if (!values.content) return { content: "Required" };
    const requestData = {
      title: values.title,
      content: values.content,
      published: published,
    };
    try {
      await client.post("/posts", requestData);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
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
                value={title}
                onChange={(value) => setTitle(value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Post Content</Form.Label>
              <Field
                name="content"
                value={content}
                component={TextAreaAdapter}
                validate={required}
                placeholder="text"
                onChange={(value) => setContent(value)}
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
