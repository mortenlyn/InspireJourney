import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";

function LoginForm({ client, setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    return client
      .post("/user_api/login", { email, password })
      .then(function (res) {
        client.get("/user_api/user").then(function (res) {
          localStorage.setItem("currentUser", JSON.stringify(res.data.user));
          localStorage.setItem("superuser", JSON.stringify(res.data.superuser));
          setCurrentUser(res.data.user);
        });
        navigate("/home"); // navigate to home page
      })
      .catch(function (error) {
        if (error.response) {
          setError("Incorrect email or password. Please try again.");
        }
        console.log(error);
      });
  }

  return (
    <div className="form-container" style={{minHeight: "750px"}}>
      <h1 className="title">Log in</h1>
      {error && <div className="error-message">{error}</div>}
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
      <span style={{color: "var(--primary-text-color)"}}>
        Don't have an account? <Link to="/register">Register here!</Link>
      </span>
      <span style={{color: "var(--primary-text-color)"}}>
        Check out our destinations <Link to="/home">here.</Link>
      </span>
    </div>
  );
}

export default LoginForm;
