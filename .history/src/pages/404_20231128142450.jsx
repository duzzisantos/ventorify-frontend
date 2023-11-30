import { Container } from "react-bootstrap";
import { EmojiNeutralFill } from "react-bootstrap-icons";

const NotFound404 = ({ user }) => {
  const { pathname } = window.location;
  return (
    <Container className="text-secondary d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column gap-3">
        <h1 className="fw-bolder">
          {" "}
          <EmojiNeutralFill /> 404 Not Found.
        </h1>
        <h2 className="fs-5">
          Unfortunately, the page with{" "}
          <kbd className="bg-transparent text-danger border">{pathname}</kbd>{" "}
          does not exist.{" "}
          {user
            ? "Please check carefully, and try again."
            : "Please either go back to Login or Signup."}
        </h2>
      </div>
    </Container>
  );
};

export default NotFound404;
