import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginForm({ registrationToggle, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ email, password });
  }

  return (
    <div className="form-container">
      <h1 className="title">Log in</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group className="login-register-form" controlId="emailForm">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </Form.Group>
        <Form.Group className="login-register-form" controlId="passwordForm">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </Form.Group>
        <Button id="submit-btn" variant="primary" type="submit">
          Log in
        </Button>
      </form>
      <span>
        Don't have an account?
        <button onClick={() => registrationToggle(true)} variant="light">
          Register here
        </button>
      </span>
    </div>
  );
}

export default LoginForm;
