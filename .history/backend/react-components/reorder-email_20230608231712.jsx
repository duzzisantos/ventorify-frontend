import "bootstrap";
import { Container, Card } from "react-bootstrap";

const ReorderEmail = ({
  product,
  totalProductCount,
  reorderQuantity,
  category,
  economicOrderQuantity,
}) => {
  return (
    <Card className="col-6 bg-light d-flex flex-column">
      <Card.Header>Purchase Request for {product}</Card.Header>
      <Card.Body></Card.Body>
    </Card>
  );
};

export default ReorderEmail;
