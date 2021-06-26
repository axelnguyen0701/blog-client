import React, { useState } from "react";
import { InputAdapter, TextAreaAdapter, ToggleAdapter } from "../Form";
import { Form as FormWrapper, Field } from "react-final-form";
import { Form, Button } from "react-bootstrap";
import client from "../../apis/client";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
const required = (value) => (value ? undefined : "Required");
//eslint-disable-next-line
export default ({ match }) => {
  const { postId } = match.params;
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post.id === postId)
  );

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }
  const history = useHistory();
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
      await client.put(`/posts/${postId}`, requestData);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Edit Post Form</h1>
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
                initialValue={post.title}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Post Content</Form.Label>
              <Field
                name="content"
                component={TextAreaAdapter}
                validate={required}
                initialValue={post.content}
              />
            </Form.Group>

            <Form.Group>
              <Field
                name="published"
                label="Published?"
                checked={published}
                component={ToggleAdapter}
                onChange={(value) => setPublished(value.target.checked)}
                initialValue
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
