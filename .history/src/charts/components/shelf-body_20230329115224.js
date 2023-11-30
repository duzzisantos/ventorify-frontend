import React from "react";
import { Table } from "react-bootstrap";

const ShelfBody = ({ data, select, setSelection }) => {
  return (
    <>
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
                
              ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShelfBody;
