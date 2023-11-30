import React from "react";
import { Button } from "react-bootstrap";
import { Card, Container, Form } from "react-bootstrap";

const Signup = () => {
  return (
    <Container>
      <Card>
        <Card.Header>Sign up</Card.Header>
        <Card.Body>
          <Form>
            <Form.Label htmlFor="email">Username</Form.Label>
            <Form.Control
              type="text"
              id="email"
              name="email"
              placeholder="Enter email"
            />
            <hr />
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
            <Button type="submit">Sign up</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
