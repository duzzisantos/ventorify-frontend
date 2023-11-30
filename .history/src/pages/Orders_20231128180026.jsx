import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import OrdersTableBody from "../components/OrdersTableBody";
import { PersonXFill } from "react-bootstrap-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import PaymentModal from "../components/modals/PaymentModal";

const Orders = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [paymentSanctionedBy, setSactionedBy] = useState("");
  const [paymentConfirmationId, setPaymentId] = useState("");
  const [grabId, setGrabId] = useState("");
  const [show, setShow] = useState(false);
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/customer-order");
      if (res.status !== 200) {
        throw new Error(`${res.status}, ${res.statusText}`);
      } else {
        setData(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleShowPaymentModal = (id) => {
    if (id) {
      setShow(true);
    }
  };

  const handleConfirmPayment = (element, _id) => {
    axios
      .put(`http://localhost:4000/api/customer-order/${_id}`, {
        customerHasPaid:
          (element.customerHasPaid && false) ||
          (!element.customerHasPaid && true),
        paymentConfirmationId,
        paymentSanctionedBy,
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => console.warn(err));
    getData();
  };

  const commonClasses =
    "fw-bold col-lg-2 gap-3 text-success border shadow-sm rounded-2 d-flex flex-column justify-content-center align-items-center py-4 col-md-4";

  const countPaid = data.filter((d) => d.customerHasPaid).map((e) => e).length;
  const countUnpaid = data
    .filter((f) => f.customerHasPaid === false)
    .map((g) => g).length;

  const accountReceivables = data
    .filter((k) => k.customerHasPaid === false)
    .map((j) => j.revenue)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <Container className="col-md-10 text-secondary text-start major-wrapper">
      <h1 className="my-5 mb-0 text-start mx-3 fw-bold">Orders</h1>
      <hr />
      <div className="col-md-10 my-4 mx-3 mb-5">
        <div className="col-12 my-3 d-flex gap-4">
          <div className={commonClasses}>
            <span>Paid</span>
            <span>
              <PersonXFill /> {countPaid}
            </span>
          </div>
          <div className={commonClasses}>
            <span>Not Paid</span>
            <span>
              {" "}
              <PersonXFill /> {countUnpaid}
            </span>
          </div>
          <div className={commonClasses}>
            <span>Pending Revenue</span>
            <span>${accountReceivables}</span>
          </div>
        </div>
        <Table bordered striped responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Payment Status</th>
              <th>Sales Value</th>

              <th>Confirm Payment</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <OrdersTableBody
                key={element._id}
                element={element}
                handleShow={(_id) => handleShowPaymentModal(element._id)}
                setGrabId={() => setGrabId(element._id)}
              />
            ))}
          </tbody>
        </Table>
        {show && (
          <PaymentModal
            _id={grabId}
            show={show}
            handleClose={() => setShow(false)}
            handleConfirmation={() => handleConfirmPayment(data, grabId)}
            paymentConfirmationId={paymentConfirmationId}
            paymentSanctionedBy={paymentSanctionedBy}
            setPaymentId={setPaymentId}
            setSanctionedBy={setSactionedBy}
            user={user.displayName ?? user.email}
          />
        )}
      </div>
    </Container>
  );
};

export default Orders;
