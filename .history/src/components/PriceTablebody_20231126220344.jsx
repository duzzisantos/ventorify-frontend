import React from "react";
import { Button } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
const PriceTableBody = ({ element, index, handleShowModal, handleDelete }) => {
  return (
    <tr key={index + element._id} className="text-start text-secondary">
      <td>{element._id}</td>
      <td>{element.product}</td>
      <td>{element.category}</td>
      <td>{element.unitPrice}</td>
      <td>
        <Button
          className="text-decoration-none btn btn-outline-success border-0"
          title="Edit price"
          onClick={() => handleShowModal(element._id)}
          variant="none"
        >
          <Pencil />
        </Button>

        <Button
          variant="none"
          className="btn-outline-danger border-0"
          title="Delete price"
          onClick={() => handleDelete(element._id)}
        >
          <Trash />
        </Button>
      </td>
    </tr>
  );
};

export default PriceTableBody;
