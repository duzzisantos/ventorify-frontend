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
    <Card>
      <Card.Header>Purchase Request for {product}</Card.Header>
    </Card>
  );
};

export default ReorderEmail;
