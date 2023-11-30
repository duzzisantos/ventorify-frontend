import React, { useState } from "react";
import { Card } from "react-bootstrap";

const ShelfBody = ({ data }) => {
  const [select, setSelection] = useState("DRINKS");
  return (
    <>
      <div className="d-flex flex-row justify-content-end mb-3">
        <select
          className="w-25 mt-3 border border-black p-1"
          onChange={(e) => setSelection(e.target.value)}
        >
          <option value={""}>--Select--</option>
          <option value={"DAIRY"}>DAIRY</option>
          <option value={"DRINKS"}>DRINKS</option>
          <option value={"MEAT"}>MEAT</option>
          <option value={"DRY"}>DRY</option>
          <option value={"TOILETERIES"}>TOILETERIES</option>
        </select>
      </div>

      <div className="d-flex flex-row flex-wrap">
        {data.map((item) => {
          if (
            item.hasLeftWarehouse &&
            !item.hasBeenSold &&
            item.category.match(new RegExp(select), "i")
          ) {
            return (
              <>
                <Card
                  key={item._id}
                  className={`border border-black ${
                    item.batchAmount < 100 ? "text-danger" : "text-success"
                  } rounded-1 p-5 d-block mx-2`}
                  style={{ height: "180px", width: "200px" }}
                >
                  <div key={item.product}>{item.product}</div>
                  <div key={item}>{item.batchAmount}</div>
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
