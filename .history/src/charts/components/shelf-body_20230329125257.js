import React, { useState } from "react";
import { Card } from "react-bootstrap";

const ShelfBody = ({ data, assignColor }) => {
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

      <div className="d-flex flex-row flex-wrap">
        {data.map((item) => {
          if (item.category.match(new RegExp(select), "i")) {
            return (
              <>
                <Card
                  key={item._id}
                  className={`border border-black rounded-1 p-5 d-block mx-2`}
                  style={{ height: "180px", width: "200px" }}
                >
                  <div>{item.product}</div>
                  <div>{item.batchAmount}</div>
                </Card>
              </>
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};

export default ShelfBody;
