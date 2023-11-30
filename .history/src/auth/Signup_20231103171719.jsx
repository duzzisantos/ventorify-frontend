import React from "react";
import { Button } from "react-bootstrap";
import { Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = {
    email: "",
    password: "",
    username: "",
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
            />
            <hr />
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              type="text"
              id="email"
              name="email"
              placeholder="Enter email"
              value={email}
            />
            <hr />
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder="Password must contain at least 6 characters"
              value={password}
            />
            <Button type="submit">Sign up</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
