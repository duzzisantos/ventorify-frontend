import React, { useState } from "react";
import { Button, Card, Form, Tab, Tabs } from "react-bootstrap";
import { CartFill, Download } from "react-bootstrap-icons";
import SendOrderConfirmation from "./SendOrderForm";
import { handleGeneratePDF } from "../utils/generatePDF";
import axios from "axios";
import { http } from "../api-calls/http";
import { generateRevenue } from "../utils/generateRevenue";
import { getRemainingGoods } from "../utils/getRemainingGoods";
import GeneratedOrders from "./tables/GeneratedOrders";

const ShoppingBasket = ({
  accessToken,
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

  const [selectedDate, setSelectedDate] = useState("");
  const [quantity, setQuantity] = useState({});
  const [generateOrder, setGenerateOrder] = useState([]);
  const [customerOrderAsPDF, setCustomerOrderAsPDF] = useState("");

  //function that makes change event dynamic and independeent whilst using mapped inputs
  const updatedQuantity = (product, quantity) => {
    setQuantity({ ...quantity, [product]: Number(quantity) });
  };

  const { isLocal, isProduction, localhost, webhost } = http;

  const handleSell = async (product) => {
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
        isLocal
          ? `${localhost}/api/sales/${product}`
          : isProduction && `${webhost}/api/sales/${product}`,
        postObject,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
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
        isLocal
          ? `${localhost}/api/sales?customerId=${customerId}`
          : isProduction && `${webhost}/api/sales?customerId=${customerId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
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

  const filteredOrdersByDate = generateOrder.filter(
    (element) =>
      new Date(element.createdAt).toLocaleDateString() ===
      new Date(selectedDate).toLocaleDateString()
  );

  return (
    <Card className="col-lg-12 col-sm-12" bg="transparent">
      <Card.Header className="bg-transparent me-auto w-100 text-start fw-semibold">
        <CartFill /> Shopping Basket
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <p className="shadow-sm border-start border-5 border-info-subtle p-3 lh-lg">
          <b>Directions</b>: After filling the customer form and fulfilling
          sales, click on <kbd className="bg-secondary">Generate Order</kbd>,
          then query by date and{" "}
          <kbd className="bg-light border border-secondary text-dark">
            Generate PDF
          </kbd>
          {". "} Upload PDF from your local files, then press{" "}
          <kbd className="bg-light border text-dark">Preview</kbd> and finally{" "}
          <kbd className="bg-success">Send Order Details</kbd>
        </p>
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
            className=" shadow-sm rounded-2 px-2 py-2"
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
                            {getRemainingGoods(file, quantity)} left
                          </output>
                        </li>
                      ))}
                  </ul>
                </Tab>
              ))}
            </Tabs>
          </div>
          <section className="my-3 p-3 shadow-sm py-3 rounded-2">
            <h6 className="fw-bold">Order Summary</h6>
            {generateOrder && customerId && customerName && (
              <div className="d-flex hstack gap-3">
                <Button variant="secondary" onClick={generateOrderSummary}>
                  Generate Order
                </Button>
                <div className="d-flex">
                  {" "}
                  <Form.Label
                    htmlFor="selectedDate"
                    className="fw-bold ms-auto visually-hidden"
                  >
                    Select Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    size="md"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    name="selectedDate"
                    id="selectedDate"
                  />
                </div>
                <Button
                  className="border border-secondary bg-transparent text-dark p-1"
                  title="Download Order Summary as PDF"
                  onClick={() =>
                    handleGeneratePDF(
                      filteredOrdersByDate,
                      customerName,
                      generateRevenue
                    )
                  }
                >
                  Generate PDF <Download />
                </Button>
              </div>
            )}

            <GeneratedOrders
              filteredData={filteredOrdersByDate}
              generateRevenue={generateRevenue}
            />
          </section>
          <section className="shadow-sm p-2 rounded-2 card-body">
            <h6 className="fw-bold ">Confirm order</h6>
            <SendOrderConfirmation
              accessToken={accessToken}
              customerName={customerName}
              customerId={customerId}
              setCustomerId={setCustomerId}
              setCustomerName={setCustomerName}
              customerOrderAsPDF={customerOrderAsPDF}
              setCustomerOrderAsPDF={setCustomerOrderAsPDF}
              revenue={generateRevenue(filteredOrdersByDate)}
            />
          </section>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ShoppingBasket;
