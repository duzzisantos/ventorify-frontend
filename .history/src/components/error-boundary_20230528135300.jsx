import React from "react";

import { Container } from "react-bootstrap";
import { EmojiFrown } from "react-bootstrap-icons";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment
          fluid
          className="bg-light col-md-9 d-flex vh-100 flex-column mb-0 align-items-center justify-content-center text-success"
        >
          <h1 className="fs-5 text-success">
            <EmojiFrown className="fs-1" /> It looks like something went wrong
          </h1>
          <p className="text-success">
            Check the URL address or internet connection and try again.
          </p>
        </React.Fragment>
      );
    }
    return this.props.children;
  }
}
