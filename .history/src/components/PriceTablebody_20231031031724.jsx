import React from "react";

const PriceTableBody = () => {
  return (
    <>
      <tr key={index} className="text-start">
        <td>{_id}</td>
        <td>{product}</td>
        <td>{category}</td>
        <td>{unitPrice}</td>
        <td>
          <Button
            className="text-decoration-none btn btn-outline-success border-0"
            title="Edit price"
            onClick={(id) => handleShowModal(_id)}
            variant="none"
          >
            <Pencil />
          </Button>

          <Button
            variant="none"
            className="btn-outline-danger border-0"
            title="Delete price"
            onClick={(id) => handleDelete(_id)}
          >
            <Trash />
          </Button>
        </td>
      </tr>
    </>
  );
};
