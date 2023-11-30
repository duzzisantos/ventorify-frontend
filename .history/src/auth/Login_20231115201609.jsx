import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

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
      const res = await axios.get("http://localhost:4000/api/auth/login", {
        ...formData,
      });

      const { status, statusText } = res;
      if (status === 200) {
        handleSuccess(statusText);
        navigate("/profile");
      } else {
        handleError(statusText);
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
      <Card className="col-md-12 col-lg-6 text-start">
        <Card.Header className="bg-transparent fw-bold">
          Login to ventorify
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Label htmlFor="username" className="fw-bold px-0">
              Username
            </Form.Label>
            <Form.Control
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={handleChange}
            />
            <hr />
            <Form.Label htmlFor="password" className="fw-bold px-0">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder="Password must contain at least 6 characters"
              value={password}
              onChange={handleChange}
            />
            <Button
              variant="success"
              type="button"
              className="mt-3"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="bg-transparent text-secondary d-flex justify-content-end">
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
