import { Container } from "react-bootstrap";
import { EmojiNeutralFill } from "react-bootstrap-icons";

const NotFound404 = () => {
  return (
    <Container>
      <EmojiNeutralFill />
      <h1 className="fs-2">404 Not Found.</h1>
      <h2 className="fs-4">
        That page does not exist. Either login, signup or check the URL again
      </h2>
    </Container>
  );
};
