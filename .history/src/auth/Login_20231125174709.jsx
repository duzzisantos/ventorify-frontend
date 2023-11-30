import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "./firebase";
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
    <div className="bg-warning d-flex flex-row justify-content-center pt-5">
      <h3>Login</h3>
      <div className="col-9 mt-5">
        <label htmlFor="login-email">Email</label>
        <input
          type="text"
          id="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          title="Enter email address"
        />{" "}
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          title="Enter password"
        />
        <div className="sign-btns">
          <button
            className="login-btn"
            onClick={() => logInWithEmailAndPassword(email, password)}
            title="Login"
          >
            Login
          </button>
        </div>
        <span className="login-span">
          <Link to="reset" className="link" title="Reset password">
            Forgot Password?
          </Link>
        </span>
        <span className="login-span">
          <Link to="signup" className="link" title="Create an account">
            Do not have an account?
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
