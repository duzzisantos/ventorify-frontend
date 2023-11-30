import { Button } from "react-bootstrap";
import React from "react";
import { Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  return (
    <Container>
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
            />
            <hr />
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder="Password must contain at least 6 characters"
            />
            <Button type="submit">Login</Button>
          </Form>
        </Card.Body>
        <Card.Footer>
          <span>
            Don't have an account yet? <Link to={"/signup"}>Sign up</Link>
          </span>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Login;
