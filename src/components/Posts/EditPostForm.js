import React, { useState } from "react";
import { InputAdapter, TextAreaAdapter, ToggleAdapter } from "../Form";
import { Form as FormWrapper, Field } from "react-final-form";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../../features/posts/postsSlice";
import { useHistory } from "react-router";
const required = (value) => (value ? undefined : "Required");
//eslint-disable-next-line
export default ({ match }) => {
  const { postId } = match.params;
  const history = useHistory();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.posts.posts.find((post) => post._id === postId)
  );

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }
  const [published, setPublished] = useState(false);

  const onSubmit = (values) => {
    if (!values.title) return { title: "Required" };
    if (!values.content) return { content: "Required" };
    const requestData = {
      title: values.title,
      content: values.content,
      published: published,
      id: postId,
    };
    dispatch(editPost(requestData));
    history.push("/posts/" + postId);
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
