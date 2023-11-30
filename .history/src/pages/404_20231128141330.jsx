import { Container } from "react-bootstrap";
import { EmojiNeutralFill } from "react-bootstrap-icons";

const NotFound404 = () => {
  const { pathname } = window.location;
  return (
    <Container className="text-secondary d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column gap-3">
        <h1 className="fw-bolder">
          {" "}
          <EmojiNeutralFill /> 404 Not Found.
        </h1>
        <h2 className="fs-5">
          Unfortunately, that page with{" "}
          <kbd className="bg-transparent text-dark border">{pathname}</kbd> does
          not exist. Please check carefully, and try again.
        </h2>
      </div>
    </Container>
  );
};

export default NotFound404;
