import React from "react";
import { Container, Card } from "react-bootstrap";

const ShelfChart = ({ data, category, assignColorPerLevel }) => {
  return (
    <Container className="col-md-12 d-flex flex-row flex-wrap mx-0 p-5">
      {data.map((inventory) =>
        inventory.category === category && inventory.isInShelf ? (
          <Card
            key={inventory._id}
            className="rounded-3 col-sm-2 p-5 mx-3 mb-4"
            style={{
              color:
                inventory.batchAmount > 200
                  ? assignColorPerLevel.high
                  : inventory.batchAmount > 100
                  ? assignColorPerLevel.medium
                  : assignColorPerLevel.low,
              backgroundColor: "transparent",
              border: "1px solid #787877",
            }}
          >
            <Card.Title>{inventory.product}</Card.Title>
            <Card.Footer className="mt-auto bg-transparent border-0">
              <p className="fs-3">{inventory.batchAmount}</p>
            </Card.Footer>
          </Card>
        ) : null
      )}
    </Container>
  );
};

export default ShelfChart;
