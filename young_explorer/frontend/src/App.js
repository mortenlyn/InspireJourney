import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    client
      .get("/user_api/user")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function update_link_btn() {
    if (registrationToggle) {
      document.getElementById("link-btn").innerHTML = "Register here";
      setRegistrationToggle(false);
    } else {
      document.getElementById("link-btn").innerHTML = "Log in here";
      setRegistrationToggle(true);
    }
  }

  function register(e) {
    e.preventDefault();
    client
      .post("/user_api/register", {
        email: email,
        username: username,
        password: password,
      })
      .then(function (res) {
        client
          .post("/user_api/login", {
            email: email,
            password: password,
          })
          .then(function (res) {
            setCurrentUser(true);
          });
      });
  }

  function login(e) {
    e.preventDefault();
    client
      .post("/user_api/login", {
        email: email,
        password: password,
      })
      .then(function (res) {
        setCurrentUser(true);
      });
  }

  function logout(e) {
    e.preventDefault();
    client
      .post("/user_api/logout", { withCredentials: true })
      .then(function (res) {
        setCurrentUser(false);
      });
  }

  if (currentUser) {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand className="nav-title">Young Explorer</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <form onSubmit={(e) => logout(e)}>
                <Button className="logout-btn" type="submit" variant="light">
                  Log out
                </Button>
              </form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="center">
          <h2>You're logged in!</h2>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand className="nav-title">Young Explorer</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
        </Container>
      </Navbar>
      {registrationToggle ? (
        <div className="center">
          <div className="form-container">
            <h1 className="title">Register</h1>
            <Form onSubmit={(e) => register(e)}>
              <Form.Group className="login-register-form" controlId="emailForm">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </Form.Group>
              <Form.Group
                className="login-register-form"
                controlId="usernameForm"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                />
              </Form.Group>
              <Form.Group
                className="login-register-form"
                controlId="passwordForm"
              >
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
            </Form>
            <span>
              Already have an account?
              <Button id="link-btn" onClick={update_link_btn} variant="light">
                Log in here
              </Button>
            </span>
          </div>
        </div>
      ) : (
        <div className="center">
          <div className="form-container">
            <h1 className="title">Log in</h1>
            <Form onSubmit={(e) => login(e)}>
              <Form.Group className="login-register-form" controlId="emailForm">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </Form.Group>
              <Form.Group
                className="login-register-form"
                controlId="passwordForm"
              >
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
            </Form>
            <span>
              Don't have an account?
              <Button id="link-btn" onClick={update_link_btn} variant="light">
                Register here
              </Button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
