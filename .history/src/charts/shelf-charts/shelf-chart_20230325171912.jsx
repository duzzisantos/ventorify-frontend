import React from "react";
import { Container, Card } from "react-bootstrap";

const ShelfChart = ({ element, assignColorPerLevel }) => {
  return (
    <Container className="col-md-12 d-flex flex-row flex-wrap mx-0 p-5">
      <Card
        key={element._id}
        className="rounded-3 col-sm-2 p-5 mx-3 mb-4"
        style={{
          color:
            element.batchAmount > 200
              ? assignColorPerLevel.high
              : element.batchAmount > 100
              ? assignColorPerLevel.medium
              : assignColorPerLevel.low,
          backgroundColor: "transparent",
          border: "1px solid #787877",
        }}
      >
        <Card.Title>{element.product}</Card.Title>
        <Card.Footer className="mt-auto bg-transparent border-0">
          <p className="fs-3">{element.batchAmount}</p>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ShelfChart;
