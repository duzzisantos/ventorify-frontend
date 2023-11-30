import { Table } from "react-bootstrap";

const GeneratedOrders = ({ filteredData, generateRevenue }) => {
  return (
    <Table responsive borderless hover className="mt-2" striped>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Sub total</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item) => (
          <tr key={item._id}>
            <td>{item.product}</td>
            <td>{item.salesOperations.quantitySold}</td>
            <td>{item.unitPrice}</td>
            <td>
              {(item.unitPrice * item.salesOperations.quantitySold).toFixed(2)}
            </td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td></td>
          <td className="fw-bold">Total: </td>
          <td className="fw-bold"> ${generateRevenue(filteredData)}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default GeneratedOrders;
