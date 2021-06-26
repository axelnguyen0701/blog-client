import { Form } from "react-bootstrap";

export const InputAdapter = ({ input, meta, ...rest }) => (
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

export const PasswordAdapter = ({ input, meta, ...rest }) => (
  <>
    <Form.Control
      {...input}
      {...rest}
      type="password"
      onChange={(event) => input.onChange(event.target.value)}
      isInvalid={meta.touched && meta.error}
    />
    <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
  </>
);

export const TextAreaAdapter = ({ input, meta, ...rest }) => (
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

export const ToggleAdapter = ({
  input: { onChange, checked },
  label,
  ...rest
}) => (
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
