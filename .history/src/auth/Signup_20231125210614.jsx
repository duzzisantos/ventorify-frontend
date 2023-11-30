import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "./firebase";
import "../App.css";

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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="justify-content-start d-flex flex-column">
        <h3>Sign up</h3>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="sign-btns">
          <button className="register-btn" onClick={register}>
            Register
          </button>
        </div>
        <div>
          <span className="register-span">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Login
            </Link>{" "}
            now.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
