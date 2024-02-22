import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, Route, Routes, Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import Header from "./Header";

function LoginForm({ client, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    return client
      .post("/user_api/login", { email, password })
      .then(function (res) {
        setIsAuthenticated(true);
        navigate("/home"); // navigate to home page
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Header />
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
        <Routes>
          <Route
            path="/register"
            element={
              <RegisterForm
                client={client}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default LoginForm;
