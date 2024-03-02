import React, { Component, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import Home from "./pages/Home";

function RegisterForm({ client, setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    }
    else if (password !== confirmPassword) {
      setPasswordError("Passwords don't match");
    } 
    else{
      client
      .post("/user_api/register", { email, username, password })
      .then(function (res) {
        client
          .post("/user_api/login", { email, password })
          .then(function (res) {
            client.get("/user_api/user").then(function (res) {
              localStorage.setItem(
                "currentUser",
                JSON.stringify(res.data.user)
              );
              localStorage.setItem(
                "superuser",
                JSON.stringify(res.data.superuser)
              );
              setCurrentUser(res.data.user);
            });
          })
          .catch(function (error) {
            console.log(error);
          });
        navigate("/home"); // navigate to home page
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          setEmailError("Email already exists. Please use a different email.");
        }
      });
    }
  }

  return (
    <div className="form-container">
      <h1 className="title">Register</h1>
      <form onSubmit={handleSubmit}>
        <Form.Group className="login-register-form" controlId="emailForm">
          {emailError && (
            <span className="error-message">{emailError}</span>
          )}
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
        {passwordError && (
            <span className="error-message">{passwordError}</span>
          )}
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </Form.Group>
        <Form.Group className="login-register-form" controlId="reEnterPasswordForm">
          <Form.Control
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
    </div>
  );
}

export default RegisterForm;
