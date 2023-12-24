import React, { useState, useEffect } from "react";
import axios from "axios";
import { http } from "../api-calls/http";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import WarehouseShelf from "../charts/components/WarehouseShelf";
import EmptyContent from "../components/EmptyContent";

const WareHouse = ({ accessToken }) => {
  const [suggestion, setSuggestion] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { isLocal, isProduction, webhost, localhost } = http;
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          isLocal
            ? `${localhost}/api/aggregate-goods`
            : isProduction && `${webhost}/api/aggregate-goods`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = res.data;
        setSuggestion(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [accessToken, isLocal, isProduction, webhost, localhost]);

  const handleReorder = async (_id) => {
    try {
      const res = await axios.get(
        isLocal
          ? `${localhost}/api/reorder/${_id}`
          : isProduction && `${webhost}/api/reorder/${_id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log(res.data.message);
    } catch (err) {
      console.error(err.message);
    }
  };

  //deletes all warehouse data. Danger!!!
  const handleClearWareHouse = () => {
    axios
      .delete(
        isLocal
          ? `${localhost}/api/warehouse`
          : isProduction && `${webhost}/api/warehouse`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Deletion confirmation modal

  const renderConfirmDeletion = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to clear warehouse?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Note, this process is permanent! Do you want to continue?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="transparent"
              className="border-1 border-secondary"
              onClick={handleClose}
            >
              No
            </Button>
            <Button variant="danger" onClick={handleClearWareHouse}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  return (
    <Container className="col-md-10 text-secondary major-wrapper">
      <div className="my-5 mb-0 text-start mx-3">
        <h1 className="fw-bold">Warehouse</h1>
        <p>
          View products currently stocked in warehouse and monitor inventory
          level indicators across categories.
        </p>
      </div>

      <div className="my-4 mx-3">
        <WarehouseShelf data={suggestion} />
      </div>
      <div className="my-4 mx-4">
        <h4 className="text-start mb-3 fw-bold">Suggested re-orders</h4>
        <Table className="text-secondary table-border" hover responsive>
          <thead className="bg-secondary text-light">
            <tr>
              <th>Category</th>
              <th>Product</th>
              <th>EOQ</th>
              <th>Deficit</th>
              <th>Priority</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {suggestion.length > 0 &&
              suggestion
                .filter((data) => (data.totalProductCount < 100 ? data : !data))
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.category}</td>
                    <td>{item.product}</td>
                    <td>{item.economicOrderQuantity}</td>
                    <td className="text-danger">
                      {item.economicOrderQuantity - item.totalProductCount}
                    </td>
                    <td>High</td>
                    <td>
                      <Button
                        className="bg-transparent border border-secondary text-secondary"
                        title="Place order to request new inventory"
                        onClick={(_id) => handleReorder(item._id)}
                      >
                        Place order
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>

        <div className="me-auto mb-0 align-items-end justify-content-start d-flex flex-row">
          <Button
            title="Only authorized admin can delete warehouse data"
            disabled={true}
            className="btn btn-danger text-end"
            onClick={handleShow} //This is a dangerous request, set extra control measures like a modal with T&Cs and signature
          >
            Clear warehouse
          </Button>
        </div>
        {(!suggestion.length || suggestion === undefined) && <EmptyContent />}
      </div>
      {renderConfirmDeletion()}
    </Container>
  );
};

export default WareHouse;
