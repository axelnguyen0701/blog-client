import React from "react";
import { TextAreaAdapter } from "../Form";
import { Form as FormWrapper, Field } from "react-final-form";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editComment } from "../../features/comments/commentsSlice";

const required = (value) => (value ? undefined : "Required");
//eslint-disable-next-line
export default ({ postId, content, commentId }) => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    if (!values.content) return { content: "Required" };
    const data = {
      content: values.content,
      postId,
      commentId,
    };
    dispatch(editComment(data));
  };

  return (
    <>
      <FormWrapper
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Edit comment: </Form.Label>
              <Field
                name="content"
                component={TextAreaAdapter}
                validate={required}
                placeholder="text"
                textHeight="10vh"
                initialValue={content}
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
