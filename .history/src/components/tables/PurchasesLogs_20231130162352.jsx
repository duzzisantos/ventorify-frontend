import { Table } from "react-bootstrap";
import { CartFill } from "react-bootstrap-icons";

const PurchasesLogs = ({ purchases, EmptyContent }) => {
  return (
    <div className="mx-3 text-start mb-3 d-flex flex-column">
      <p className="my-p fw-bold">
        <CartFill /> Purchase logs
      </p>
      <div className="overflow-auto" style={{ height: "fit-content" }}>
        <Table className="text-secondary table-border" hover responsive>
          <thead className="bg-secondary text-white">
            <tr>
              <th>Category</th>
              <th>Product</th>
              <th>EOQ</th>
              <th>Price</th>
              <th>Reorder Quantity</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((element) => (
              <tr key={element._id}>
                <td>{element.category}</td>
                <td>{element.product}</td>
                <td>{element.economicOrderQuantity}</td>
                <td>{element.price}</td>
                <td>{element.totalProductCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {!purchases && <EmptyContent />}
      </div>
    </div>
  );
};

export default PurchasesLogs;
