import React from "react";
import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

//Modal component
const SalesTable = ({ element }) => {
  return (
    <>
      <tbody>
        <tr
          className={`border-bottom border-black`}
          key={element._id}
          // style={{ height: `${show ? "150px" : ""}` }}
        >
          <td>{element.category}</td>
          <td>{element.product}</td>
          <td>{element.economicOrderQuantity}</td>
          <td>{element.totalProductCount}</td>
          <td
            className={
              element.totalProductCount < 100 ? "text-danger" : "text-success"
            }
          >
            {element.totalProductCount < 100
              ? "Stockout soon"
              : "Adequate stock"}
          </td>
          <td>
            <Button variant="danger">
              <Trash />
            </Button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default SalesTable;
