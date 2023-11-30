import { Table, Button } from "react-bootstrap";
import EmptyContent from "../EmptyContent";
const TransferToShelf = ({
  warehouse,
  handleTransferToShelf,
  handleClearAggregateWarehouse,
}) => {
  return (
    <section className="overflow-y-auto" style={{ height: "fit-content" }}>
      <h4 className="text-start mb-2 fw-semibold">
        Available grouped inventory from warehouse
      </h4>
      <Table className="text-secondary mt-5 mb-5 table-border" hover responsive>
        <thead className="bg-secondary text-light">
          <tr>
            <th>Category</th>
            <th>Product</th>
            <th>Economic Order Quantity</th>
            <th>Total Amount</th>
            <th>Fulfilment</th>
          </tr>
        </thead>
        <tbody>
          {warehouse.length &&
            warehouse
              .filter((element) =>
                element.totalProductCount !== 0 ? element : !element
              )
              .map((item) => (
                <tr key={item._id}>
                  <td>{item.category}</td>
                  <td>{item.product}</td>
                  <td>{item.economicOrderQuantity}</td>
                  <td>{item.totalProductCount}</td>
                  <td>
                    <Button
                      className={
                        item.isInShelf
                          ? "btn-danger"
                          : "bg-transparent text-secondary border border-secondary"
                      }
                      title="Transfer warehouse items to shelf"
                      onClick={(_id) => handleTransferToShelf(item._id)}
                      disabled={true}
                    >
                      Transfer to shelf
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      <div className="d-flex flex-row ms-auto">
        <Button
          variant="danger"
          disabled
          onClick={handleClearAggregateWarehouse}
        >
          Clear Aggregated Goods
        </Button>
      </div>
      {!warehouse.length && <EmptyContent />}
    </section>
  );
};

export default TransferToShelf;
