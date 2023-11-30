import React from "react";
import { Table } from "react-bootstrap";

const Shelfer = ({ data }) => {
  return (
    <>
      <tbody>
        {data.length > 0 &&
          data
            .filter((element) =>
              !element.hasLeftWarehouse && element.hasBeenSold
                ? element
                : !element
            )
            .map((item) => (
              <tr key={item._id} className="border-bottom border-black">
                <td>{item.category.match(new RegExp("DAIRY"), "gi")}</td>
                <td>{item.category.match(new RegExp("DRINKS"), "gi")}</td>
                <td>{item.category.match(new RegExp("MEAT"), "gi")}</td>
                <td>{item.category.match(new RegExp("DRY"), "gi")}</td>
                <td>{item.category.match(new RegExp("TOILETERIES"))}</td>
              </tr>
            ))}
      </tbody>
    </>
  );
};

export default Shelfer;
