import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Modal, Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { db, auth, logout } from "./firebase";

import { query, collection, getDocs, where } from "firebase/firestore";
import {
  MoonFill,
  SunFill,
  TreeFill,
  PersonFill,
  PersonBadgeFill,
  EnvelopeCheckFill,
  ShieldLockFill,
} from "react-bootstrap-icons";
import { FormCheck } from "react-bootstrap";

function Navigation({ onChange, ref, bg }) {
  const [show, setShow] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.log(err);
      }
    };

    if (loading) {
      return;
    } else if (!user) {
      getUserName();
      return navigate("/");
    }
  }, [loading, user, navigate]);

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
            <Link
              to={"/landing-page"}
              className="text-decoration-none text-success"
            >
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
                <Button
                  variant="transparent"
                  className="border border-secondary"
                  onClick={() => setShow(true)}
                >
                  Profile
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {show && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
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
              {name}
            </p>
            <hr />
            <p>
              <EnvelopeCheckFill />
              {user && user.email}
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
            <Button
              className="bg-transparent text-dark border border-secondary"
              onClick={logout}
            >
              Log out
            </Button>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default Navigation;
