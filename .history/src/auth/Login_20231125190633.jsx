import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Google } from "react-bootstrap-icons";
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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form
        className="col-lg-5 col-md-4 p-4 shadow-lg rounded-3"
        style={{ height: "fit-content" }}
      >
        <div className="justify-content-start d-flex flex-column">
          <h3 className="">Login to Ventorify</h3>
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
          size="md"
          variant="success"
          className="mt-3 d-block"
          onClick={() => {
            logInWithEmailAndPassword(email, password);
            navigate("/landing-page");
          }}
          title="Login"
        >
          Login
        </Button>

        <div className="hstack gap-2 d-flex mt-5 justify-content-between">
          <Button
            onClick={() => {
              signInWithGoogle();
              navigate("/landing-page");
            }}
            className="bg-transparent border border-secondary text-secondary"
            title="Sign in with Google"
          >
            Login with Google <Google />
          </Button>

          <Link to="signup" title="Create an account">
            Do not have an account?
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
