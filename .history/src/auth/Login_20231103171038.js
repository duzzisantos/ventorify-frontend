import { Button } from "bootstrap";
import React from "react";
import { Card, Container, Form } from "react-bootstrap";

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
            <Button>Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
