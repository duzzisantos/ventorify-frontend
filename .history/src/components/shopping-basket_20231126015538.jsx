import React, { useState } from "react";
import { Button, Card, Form, Tab, Tabs, Table } from "react-bootstrap";
import { CartFill, Download } from "react-bootstrap-icons";
import jsPDF from "jspdf";
import axios from "axios";

const ShoppingBasket = ({
  getShelfData,
  selectedQuantity,
  customerId,
  setCustomerId,
  customerName,
  setCustomerName,
  customerAddress,
  setCustomerAddress,
  customerPhone,
  setCustomerPhone,
}) => {
  //send the put request from the shelf to the sales collections and return the quantity
  //input in the sales form - to effect change in the shelf quantity, and calculate revenue
  //in the sales collection

  const uniqueCategories = [
    ...new Set(getShelfData.map((item) => item.category)),
  ];

  const [quantity, setQuantity] = useState({});
  const [generateOrder, setGenerateOrder] = useState([]);

  //function that makes change event dynamic and independeent whilst using mapped inputs
  const updatedQuantity = (product, quantity) => {
    setQuantity({ ...quantity, [product]: Number(quantity) });
  };

  const handleSell = async (product) => {
    console.log(product);
    const postObject = {
      quantitySold: quantity[product],
      customerId: customerId,
      customerName: customerName,
      customerPhone: customerPhone,
      customerAddress: customerAddress,
      product: product,
      category: getShelfData
        .filter((element) => (element.product === product ? element : !element))
        .map((m) => m.category)
        .join(""),
    };

    try {
      const res = await axios.put(
        `http://localhost:4000/api/sales/${product}`,
        postObject
      );
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  //Grab sales data that matches
  const generateOrderSummary = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/sales?customerId=${customerId}`
      );

      if (!response.status === 200) {
        throw new Error(`${response.status}, ${response.statusText}`);
      } else {
        const requiredData = response.data
          .filter((item) => item.salesOperations.customerId === customerId)
          .map((file) => file);
        setGenerateOrder(requiredData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //filters out errors due to negative numbers. Only positive integers are allowed
  const getRemainingGoods = (element) => {
    const quantityAsInteger = Number(quantity[element.product]);
    if (element.totalProductCount && quantityAsInteger) {
      if (quantityAsInteger <= 0) {
        return element.totalProductCount;
      } else if (quantityAsInteger > 0) {
        return element.totalProductCount - quantityAsInteger;
      }
    }
  };

  const filteredOrdersByDate = generateOrder.filter(
    (element) =>
      new Date(element.createdAt).toLocaleDateString() ===
      new Date(Date.now()).toLocaleDateString()
  );

  //Generates PDF file from backend api
  const handleGeneratePDF = async () => {
    // try {
    //   const res = await axios.get(
    //     `http://localhost:4000/api/generate-order?customerId=${customerId}`
    //   );

    //   if (res.status !== 200) {
    //     throw new Error(`${res.status}`, `${res.statusText}`);
    //   } else {
    //     console.log(res.status);
    //   }
    // } catch (err) {
    //   console.err(err.message);
    // }

    const pdfDoc = new jsPDF();

    const headers = Object.keys(generateOrder[0]);
    const rows = generateOrder.map((obj) => headers.map((key) => obj[key]));

    pdfDoc.autoTable({
      head: [headers],
      body: rows,
    });

    pdfDoc.save("orders.pdf");
  };

  return (
    <Card className="col-lg-12 col-sm-12" bg="transparent">
      <Card.Header className="bg-transparent me-auto w-100 text-start fw-semibold">
        <CartFill /> Shopping Basket
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <div className="vstack gap-2">
          <Form>
            <label htmlFor="customerId">Customer ID</label>
            <input
              type="text"
              className="mb-2 form-control  border border-1"
              value={customerId}
              onChange={setCustomerId}
              name="customerId"
              id="customerId"
            />

            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              className="mb-2 form-control  border border-1"
              value={customerName}
              onChange={setCustomerName}
              name="customerName"
              id="customerName"
            />

            <label htmlFor="customerPhone">Customer Phone</label>
            <input
              type="tel"
              className="mb-2 form-control  border border-1"
              value={customerPhone}
              onChange={setCustomerPhone}
              name="customerPhone"
              id="customerPhone"
            />

            <label htmlFor="customerAddress">Customer Address</label>
            <input
              type="text"
              className="mb-2 form-control  border border-1"
              value={customerAddress}
              onChange={setCustomerAddress}
              name="customerAddress"
              id="customerAddress"
            />
          </Form>

          <div
            className="bg-white shadow-sm rounded-2 px-2 py-2"
            style={{ height: "fit-content" }}
          >
            <h6 className="fw-bold mx-2 px-1">
              Fulfil customer order from available goods on shelf
            </h6>

            <Tabs
              className="my-3"
              defaultActiveKey={uniqueCategories[0]}
              id="product-sales-tabs"
            >
              {uniqueCategories.map((element, index) => (
                <Tab eventKey={element} key={index} title={element}>
                  <ul>
                    {getShelfData
                      .filter((item) => item.category === element)
                      .map((file, fileIndex) => (
                        <li
                          key={fileIndex}
                          className="hstack gap-3 my-2 justify-content-start"
                        >
                          <span className="w-25 fw-semibold">
                            {file.product}{" "}
                          </span>

                          <Form className="hstack gap-3 w-75">
                            <input
                              className="form-control-sm border border-secondary"
                              type="number"
                              aria-label="select-product-quantity"
                              value={quantity[file.product]}
                              onChange={(e) =>
                                updatedQuantity(file.product, e.target.value)
                              }
                            />

                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleSell(file.product)}
                              title="Sell Item"
                            >
                              Fulfil
                            </Button>
                          </Form>
                          <output className="px-3 w-25">
                            {getRemainingGoods(file)} left
                          </output>
                        </li>
                      ))}
                  </ul>
                </Tab>
              ))}
            </Tabs>
          </div>
          <section className="my-3 p-3 shadow-sm bg-white py-3 rounded-2">
            <h6 className="fw-bold">Order Summary</h6>
            {customerId && customerName && (
              <Button
                variant="transparent"
                className="border border-secondary mt-2"
                onClick={generateOrderSummary}
                title="Generate Order Summary"
              >
                Generate Summary
              </Button>
            )}

            <Table resposive borderless hover className="mt-2" striped>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Sub total</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrdersByDate.map((item) => (
                  <tr key={item._id}>
                    <td>{item.product}</td>
                    <td>{item.salesOperations.quantitySold}</td>
                    <td>{item.unitPrice}</td>
                    <td>
                      {(
                        item.unitPrice * item.salesOperations.quantitySold
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td className="fw-bold">Total: </td>
                  <td className="fw-bold">
                    {" "}
                    $
                    {filteredOrdersByDate
                      .map((element) => {
                        const { unitPrice, salesOperations } = element;
                        return unitPrice * salesOperations.quantitySold;
                      })
                      .reduce((acc, curr) => acc + curr, 0)}
                  </td>
                </tr>
              </tbody>
            </Table>
            {generateOrder && customerId && customerName && (
              <Button
                size="sm"
                className="border border-secondary bg-transparent text-dark"
                title="Download Order Summary as PDF"
                onClick={() => handleGeneratePDF(customerId)}
              >
                Send PDF <Download />
              </Button>
            )}
          </section>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ShoppingBasket;
