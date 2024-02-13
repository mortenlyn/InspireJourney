import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function RegisterForm({ registrationToggle, onRegister }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onRegister({ email, username, password });
  }

  return (
    <div className="form-container">
      <h1 className="title">Register</h1>
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
        <Form.Group className="login-register-form" controlId="usernameForm">
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          Register
        </Button>
      </form>
      <span>
        Already have an account?
        <button onClick={() => registrationToggle(false)} variant="light">
          Log in here
        </button>
      </span>
    </div>
  );
}

export default RegisterForm;
