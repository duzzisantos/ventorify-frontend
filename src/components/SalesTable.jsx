import React from "react";
import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import axios from "axios";
import { http } from "../api-calls/http";

//Modal component
const SalesTable = ({ element, accessToken }) => {
  const { isLocal, isProduction, localhost, webhost } = http;
  const handleDeleteProduct = (id) => {
    axios
      .delete(
        isLocal
          ? `${localhost}/api/aggregate-shelf-items/${id}`
          : isProduction && `${webhost}/api/aggregate-shelf-items/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <>
      <tbody>
        <tr className={`border-bottom border-black`} key={element._id}>
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
            <Button
              variant="none"
              className="btn-outline-danger border-0"
              onClick={(id) => handleDeleteProduct(element._id)}
            >
              <Trash />
            </Button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default SalesTable;
