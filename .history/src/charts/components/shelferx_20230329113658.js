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
                    {item.category === "DAIRY" ? item.product : !item.product}
                  </td>
                  <td>
                    {item.category === "DRINKS" ? item.product : !item.product}
                  </td>
                  <td>
                    {item.category === "MEAT" ? item.product : !item.product}
                  </td>
                  <td>
                    {item.category === "DRY" ? item.product : !item.product}
                  </td>
                  <td>{item.category.match(new RegExp("TOILETERIES"))}</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShelfBody;
