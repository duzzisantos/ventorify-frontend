import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "./firebase";
import "../App.css";
import { Button, Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) {
      alert("Please enter name!");
    } else {
      registerWithEmailAndPassword(name, email, password);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    } else if (user) {
      navigate("/home");
    }
  });

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      {!user && email && (
        <Alert variant="danger" className="col-lg-5 col-md-4">
          Error in signing up! That user name exists.
        </Alert>
      )}
      <Form
        className="col-lg-5 col-md-4 p-4 shadow-sm border rounded-3 text-secondary"
        style={{ height: "fit-content" }}
      >
        <div className="justify-content-start d-flex flex-column">
          <h3 className="fw-bold">Sign up</h3>
          <Form.Label htmlFor="fullName">Full Name</Form.Label>
          <Form.Control
            type="text"
            id="fullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="justify-content-start d-flex flex-column">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="justify-content-start d-flex flex-column">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="hstack gap-2 d-flex mt-5 justify-content-between">
          <Button className="btn-success" onClick={register}>
            Register
          </Button>
          <span className="register-span">
            Already have an account?{" "}
            <a href="/login" className="link">
              Login
            </a>{" "}
            now.
          </span>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
