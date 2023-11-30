import { Card } from "react-bootstrap";

const LandingPageTemplate = ({ header, mainContent, image }) => {
  return (
    <Card
      className="bg-transparent border-0 rounded-0 shadow-sm col-sm-5"
      style={{ height: "450px" }}
    >
      <Card.Header className="bg-transparent fs-3 fw-bold border-bottom-0 py-3">
        {header}
      </Card.Header>

      <Card.Body>
        <Card.Img
          src={image}
          alt={header}
          style={{ height: "200px", width: "270px" }}
        />
        <Card.Text className="fs-6 lh-md">{mainContent}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LandingPageTemplate;
