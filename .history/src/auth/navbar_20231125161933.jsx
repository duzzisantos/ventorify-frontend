import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { db, auth, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { MoonFill, SunFill, TreeFill } from "react-bootstrap-icons";
import { FormCheck } from "react-bootstrap";

function Navigation({ onChange, ref, bg }) {
  return (
    <>
      <Navbar
        ref={ref}
        bg={bg}
        expand="lg"
        className="col-md-12 mt-0 shadow-sm"
        fixed="top"
      >
        <Container fluid>
          <Navbar.Brand className="fs-3 pt-0">
            <Link to={"/"} className="text-decoration-none text-success">
              <TreeFill />
              ventorify
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 col-12"
              style={{ maxHeight: "130px", color: "white" }}
              navbarScroll
            >
              <NavLink
                to={"/warehouse"}
                className="mx-2 text-decoration-none text-secondary"
              >
                Warehouse
              </NavLink>
              <NavLink
                to={"/shelf"}
                className="mx-2 text-decoration-none text-secondary"
              >
                Shelf
              </NavLink>
              <NavLink
                to={"/sales"}
                className="mx-2 text-decoration-none text-secondary"
              >
                Sales
              </NavLink>
              <NavLink
                to={"/create"}
                className="mx-2 text-decoration-none text-secondary"
              >
                Create record
              </NavLink>
              <NavLink
                className="mx-2 text-decoration-none text-secondary"
                to={"/prices"}
              >
                Prices
              </NavLink>
              <div className="d-flex flex-row hstack gap-2 mx-5 fs-5">
                <SunFill className="text-secondary" />
                <FormCheck
                  type="switch"
                  aria-label="Toggle dark mode"
                  onChange={onChange}
                />
                <MoonFill className="text-secondary" />
              </div>
              <div className="ms-auto">
                {/* <Button className="bg-transparent text-dark border border-secondary">
                  Lol
                </Button> */}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Modal
        show={}
        onHide={handleProfileToggleClose}
        size="sm"
        keyboard="false"
        style={{ marginLeft: "40%", marginTop: "2.5%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>My Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="d-flex flex-column px-4 py-4 lh-lg"
          style={{ fontSize: "14px" }}
        >
          <p>
            <PersonFill />
          </p>
          <hr />
          <p>
            <EnvelopeCheckFill />
          </p>
          <hr />
          <p>
            <ShieldLockFill />
          </p>
          <hr />
          <p>
            <PersonBadgeFill />
            <br />
          </p>
          <hr />
          <Button className="bg-transparent text-dark border border-secondary">
            Log out
          </Button>
        </Modal.Body>
      </Modal> */}
    </>
  );
}

export default Navigation;
