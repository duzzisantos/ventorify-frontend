import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/auth-login",
        {
          ...formData,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/landing-page");
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
    });
  };
  return (
    <Container className="vh-100 mt-5 pt-5">
      <Card>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form>
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
              Login
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer>
          <span>
            Don't have an account yet? <Link to={"/signup"}>Sign up</Link>
          </span>
          <ToastContainer />
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Login;
