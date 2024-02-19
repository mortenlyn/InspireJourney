import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, Route, Routes, Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import Header from "./Header";
import Home from "./pages/Home"

function RegisterForm({ client, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    client
      .post("/user_api/register", { email, username, password })
      .then(function (res) {
        client
          .post("/user_api/login", { email, password })
          .then(function (res) {
            setIsAuthenticated(true);
            navigate("/home"); // navigate to home page
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Header />
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
          Already have an account? <Link to="/login">Login here!</Link>
        </span>
        <span>
          Check out our destinations <Link to="/home">here.</Link>
        </span>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginForm
                client={client}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route 
            path="/home"
            element = {Component={Home}}
            />
        </Routes>
      </div>
    </>
  );
}

export default RegisterForm;
