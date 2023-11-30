import React from "react";
import { Card } from "react-bootstrap";

const GeneralChart = ({ element, assignColorPerLevel }) => {
  return (
    <div className="col d-flex flex-wrap mx-0 p-3">
      <Card
        key={element._id}
        className="rounded-3 col-sm-2 p-5 mx-3 mb-4 bg-none table-border"
        style={{
          color:
            element.batchAmount > 200
              ? assignColorPerLevel.high
              : element.batchAmount > 100
              ? assignColorPerLevel.medium
              : assignColorPerLevel.low,
        }}
      >
        <Card.Title>{element.product}</Card.Title>
        <Card.Footer className="mt-auto bg-transparent border-0">
          <p className="fs-3">{element.batchAmount}</p>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default GeneralChart;
