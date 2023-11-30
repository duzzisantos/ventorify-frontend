import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/landing-page");
  });
  return (
    <div className="d-flex flex-row justify-content-center pt-5 vh-100">
      <Form className="mt-5">
        <div className="justify-content-start d-flex flex-column">
          <h3 className="">Login</h3>
          <Form.Label htmlFor="login-email">Email</Form.Label>
          <Form.Control
            type="text"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            title="Enter email address"
          />{" "}
        </div>
        <div className="justify-content-start d-flex flex-column">
          <Form.Label htmlFor="login-password">Password</Form.Label>
          <Form.Control
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            title="Enter password"
          />
        </div>

        <Button
          className="login-btn"
          onClick={() => {
            logInWithEmailAndPassword(email, password);
            navigate("/landing-page");
          }}
          title="Login"
        >
          Login
        </Button>

        <span className="login-span">
          <Link to="reset" className="link" title="Reset password">
            Forgot Password?
          </Link>
        </span>
        <span className="login-span">
          <Button
            onClick={() => {
              signInWithGoogle();
              navigate("/landing-page");
            }}
            className="link"
            title="Reset password"
          >
            Login with Google
          </Button>
        </span>
        <span className="login-span">
          <Link to="signup" className="link" title="Create an account">
            Do not have an account?
          </Link>
        </span>
      </Form>
    </div>
  );
};

export default Login;
