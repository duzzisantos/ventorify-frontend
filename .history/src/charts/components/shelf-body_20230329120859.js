import React from "react";
import { Table, Card } from "react-bootstrap";

const ShelfBody = ({ data, select, setSelection }) => {
  return (
    <>
      <div className="d-flex flex-row justify-content-end mb-3">
        <select className="w-25 mt-3 border border-black p-1">
          <option>DAIRY</option>
          <option>DRINKS</option>
          <option>MEAT</option>
          <option>DRY</option>
          <option>TOILETERIES</option>
        </select>
      </div>
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
          <div className="w-100">
            {data
              .filter(
                (item) => item === item.category.match(new RegExp("DAIRY"), "i")
              )
              .map((element) => (
                <Card key={element.id}>{element.product}</Card>
              ))}
          </div>
          <div className="w-100">
            {data
              .filter(
                (item) =>
                  item === item.category.match(new RegExp("DRINKS"), "i")
              )
              .map((element) => (
                <Card key={element.id}>{element.product}</Card>
              ))}
          </div>
        </tbody>
      </Table>
    </>
  );
};

export default ShelfBody;
