import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/auth-signup",
        {
          ...formData,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setFormData({
      ...formData,
      email: "",
      password: "",
      username: "",
    });
  };

  const { email, password, username } = formData;
  return (
    <Container>
      <Card>
        <Card.Header>Sign up</Card.Header>
        <Card.Body>
          <Form>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="text"
              id="username"
              name="username"
              placeholder="Enter user name"
              value={username}
              onChange={handleChange}
            />
            <hr />
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              type="text"
              id="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleChange}
            />
            <hr />
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder="Password must contain at least 6 characters"
              value={password}
              onChange={handleChange}
            />
            <Button type="button" onClick={handleSubmit}>
              Sign up
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer>
          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Signup;
