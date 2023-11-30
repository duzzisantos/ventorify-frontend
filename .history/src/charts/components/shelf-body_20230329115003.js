import React from "react";
import { Table, Card } from "react-bootstrap";

const ShelfBody = ({ data }) => {
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
                <tr key={item._id} className="border-bottom border-black lh-lg">
                  <Card>
                    {item.category === "DAIRY" ? item.product : !item.product}
                  </Card>

                  <td>
                    <Card>
                      {item.category === "DRINKS"
                        ? item.product
                        : !item.product}
                    </Card>
                  </td>
                  <td>
                    <Card>
                      {item.category === "MEAT" ? item.product : !item.product}
                    </Card>
                  </td>
                  <td>
                    <Card>
                      {item.category === "DRY" ? item.product : !item.product}
                    </Card>
                  </td>
                  <td>
                    {" "}
                    <Card>
                      {item.category === "TOILETERIES"
                        ? item.product
                        : !item.product}
                    </Card>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  );
};

export default ShelfBody;
