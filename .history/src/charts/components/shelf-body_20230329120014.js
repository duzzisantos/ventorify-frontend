import React from "react";
import { Table } from "react-bootstrap";

const ShelfBody = ({ data, select, setSelection }) => {
  return (
    <>
      <select className="w-25 mt-3 border border-black mb-3">
        <option>DAIRY</option>
        <option>DRINKS</option>
        <option>MEAT</option>
        <option>DRY</option>
        <option>TOILETERIES</option>
      </select>
      <Table className="border border-black">
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
                <tr
                  key={item._id}
                  className="border-bottom border-black lh-lg"
                ></tr>
              ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShelfBody;
