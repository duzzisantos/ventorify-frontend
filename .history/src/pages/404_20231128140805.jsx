import { Container } from "react-bootstrap";
import { EmojiNeutralFill } from "react-bootstrap-icons";

const NotFound404 = () => {
  return (
    <Container className="text-secondary d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column">
        <h1>
          {" "}
          <EmojiNeutralFill className="fs-4" /> 404 Not Found.
        </h1>
        <h2 className="fs-4">
          That page does not exist. Either login, signup or check the URL again
        </h2>
      </div>
    </Container>
  );
};

export default NotFound404;
