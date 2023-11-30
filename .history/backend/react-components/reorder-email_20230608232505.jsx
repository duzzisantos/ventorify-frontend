import "bootstrap";
import { Container, Card } from "react-bootstrap";

const ReorderEmail = ({ product, reorderQuantity, category }) => {
  return (
    <Container className="col-9">
      <Card className="col-6 bg-light d-flex flex-column rounded-1 shadow-sm">
        <Card.Header className="text-success">
          Purchase Request for {product}
        </Card.Header>
        <Card.Body>
          <h4>Here are the details below</h4>
          <ul>
            <li>Category: {category}</li>
            <li>Quantity: {reorderQuantity}</li>
          </ul>
          <p>
            Please communicate to us soon with regards to availability, delivery
            or any changes in plans and prices.
          </p>
          <p>Best regards,</p>
          <p>Your Ventorify Purchasing Team</p>
        </Card.Body>
        <Card.Footer className="bg-secondary">
          <small className="text-light">
            Ventorify is your best supplier of supermarket goods. Simply the
            best!
          </small>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ReorderEmail;
