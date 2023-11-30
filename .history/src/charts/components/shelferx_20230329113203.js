import React from "react";
import { Table } from "react-bootstrap";

const ShelfBody = ({ data }) => {
  return (
    <>
      <Table>
        <thead>
          <tr className="text-uppercase text-success">
            <th>Dairy</th>
            <th>Drinks</th>
            <th>Meat</th>
            <th>Dry</th>
            <th>Toileteries</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data
              .filter((element) =>
                element.hasLeftWarehouse && !element.hasBeenSold
                  ? element
                  : !element
              )
              .map((item) => (
                <tr key={item._id} className="border-bottom border-black">
                  <td>
                    {item
                      .filter((c) => c === c.match(new RegExp("DAIRY"), "i"))
                      .map((d) => d)}
                  </td>
                  <td>{item.category.match(new RegExp("DRINKS"), "gi")}</td>
                  <td>{item.category.match(new RegExp("MEAT"), "gi")}</td>
                  <td>{item.category.match(new RegExp("DRY"), "gi")}</td>
                  <td>{item.category.match(new RegExp("TOILETERIES"))}</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShelfBody;
