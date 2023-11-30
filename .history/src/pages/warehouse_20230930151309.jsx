import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import WarehouseShelf from "../charts/components/warehouse-shelf";
import EmptyContent from "../components/empty-content";

const WareHouse = () => {
  const [suggestion, setSuggestion] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/aggregate-goods"
        );
        const data = res.data;
        setSuggestion(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleReorder = async (_id) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/reorder/${_id}`);
      console.log(res.data.message);
    } catch (err) {
      console.error(err.message);
    }
  };

  //deletes all warehouse data. Danger!!!
  const handleClearWareHouse = () => {
    axios
      .delete("http://localhost:4000/api/warehouse")
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to clear warehouse?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Note, this process is irreversible! Do you want to continue?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="transparent"
              className="border-1 border-secondary"
              onClick={handleClose}
            >
              No
            </Button>
            <Button variant="success" onClick={handleClearWareHouse}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  return (
    <Container className="col-md-10 text-secondary major-wrapper">
      <div className="my-5 text-start mx-3">
        <h1>Warehouse</h1>
        <p>
          View products currently stocked in warehouse and monitor inventory
          level indicators across categories.
        </p>
      </div>
      {/* <div className="my-4 mx-3">
        <WarehouseShelf data={suggestion} />
      </div> */}
      <div className="my-4 mx-4">
        <h4 className="text-start mb-3">Suggested re-orders</h4>
        <Table className="text-secondary table-border">
          <thead className="bg-success text-light">
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
            {suggestion.length < 1 ? (
              <EmptyContent />
            ) : (
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
                ))
            )}
          </tbody>
        </Table>
        <div className="me-auto mb-0 align-items-end justify-content-start d-flex flex-row">
          <Button
            title="Only authorized admin can delete warehouse data"
            className="btn btn-danger text-end"
            onClick={handleShow} //This is a dangerous request, set extra control measures like a modal with T&Cs and signature
          >
            Clear warehouse
          </Button>
        </div>
      </div>
      {renderConfirmDeletion()}
    </Container>
  );
};

export default WareHouse;
