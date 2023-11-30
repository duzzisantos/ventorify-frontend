import React from "react";
import { ExclamationSquareFill } from "react-bootstrap-icons";

const EmptyContent = () => {
  return (
    <span className="col bg-transparent text-success fs-5 mb-5 border-0 shadow-sm">
      <span className="d-block text-center py-2">
        <ExclamationSquareFill className="fs-2 mb-2" />
        <small>
          Unfortunately, there is nothing to show here at the moment.
        </small>
      </span>
    </span>
  );
};

export default EmptyContent;
