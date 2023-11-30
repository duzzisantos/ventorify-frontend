import React, { useState } from "react";
import { Table, Card } from "react-bootstrap";

const ShelfBody = ({ data }) => {
  const [select, setSelection] = useState("");
  return (
    <>
      <div className="d-flex flex-row justify-content-end mb-3">
        <select
          className="w-25 mt-3 border border-black p-1"
          onChange={(e) => setSelection(e.target.value)}
        >
          <option value={"DAIRY"}>DAIRY</option>
          <option value={"DRINKS"}>DRINKS</option>
          <option value={"MEAT"}>MEAT</option>
          <option value={"DRY"}>DRY</option>
          <option value={"TOILETERIES"}>TOILETERIES</option>
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
              .map((item) =>
                select === "DAIRY"
                  ? item
                  : // : select === "DRINKS"
                    // ? item
                    // : select === "MEAT"
                    // ? item
                    // : select === "DRY"
                    // ? item
                    // : select === "TOILETERIES"
                    // ? item
                    !item
              )
              .map((element) => (
                <Card
                  key={element._id}
                  className="border border-black rounded-1 p-4"
                >
                  {element.product}
                </Card>
              ))}
          </div>
        </tbody>
      </Table>
    </>
  );
};

export default ShelfBody;
