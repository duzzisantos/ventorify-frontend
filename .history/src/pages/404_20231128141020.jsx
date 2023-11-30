import { Container } from "react-bootstrap";
import { EmojiNeutralFill } from "react-bootstrap-icons";

const NotFound404 = () => {
  return (
    <Container className="text-secondary d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column gap-2">
        <h1>
          {" "}
          <EmojiNeutralFill /> 404 Not Found.
        </h1>
        <h2 className="fs-4">
          Unfortunately, that page does not exist. Please check carefully, and
          try again.
        </h2>
      </div>
    </Container>
  );
};

export default NotFound404;
