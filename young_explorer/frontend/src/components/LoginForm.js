import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";

function LoginForm({ client, setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    return client
      .post("/user_api/login", { email, password })
      .then(function (res) {
        setCurrentUser(res.data);
        navigate("/home"); // navigate to home page
      })
      .catch(function (error) {
        console.log(error);
      });
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
        Don't have an account? <Link to="/register">Register here!</Link>
      </span>
      <span>
        Check out our destinations <Link to="/home">here.</Link>
      </span>
    </div>
  );
}

export default LoginForm;
