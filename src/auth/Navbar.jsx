import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Modal, Navbar, Container, Nav } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { db, auth, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import {
  TreeFill,
  PersonFill,
  EnvelopeCheckFill,
  ShieldLockFill,
  Power,
} from "react-bootstrap-icons";

function Navigation() {
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
      return navigate("/login");
    }
  }, [loading, user, navigate]);

  const loginDate = Number(user.reloadUserInfo.lastLoginAt);

  return (
    <>
      <Navbar
        expand="lg"
        className="col-md-12 mt-0 shadow-sm bg-light"
        fixed="top"
        style={{ zIndex: 1 }}
        id="nav-bar-element"
      >
        <Container fluid>
          <Navbar.Brand className="fs-3 pt-0">
            <Link to={"/home"} className="text-decoration-none text-success">
              <TreeFill />
              ventorify
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 col-12"
              style={{ maxHeight: "200px", color: "white" }}
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

              <div className="ms-auto">
                <Button
                  variant="transparent"
                  className="border border-secondary text-dark"
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
          backdrop="static"
          style={{ marginLeft: "0%", marginTop: "2.5%" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body
            className={`d-flex flex-column px-4 py-4 lh-lg `}
            style={{ fontSize: "14px" }}
          >
            {user.displayName && (
              <>
                {" "}
                <p>
                  <PersonFill /> {user.displayName ?? name}
                </p>
                <hr />
              </>
            )}

            <p>
              <EnvelopeCheckFill /> {user && user.email}
            </p>
            <hr />

            <p>
              <ShieldLockFill /> <b>Last login</b>:{" "}
              {new Date(loginDate).toDateString()} -{" "}
              {new Date(loginDate).toTimeString()}
              <br />
            </p>
            <hr />
            <Button
              className="bg-danger border-0"
              onClick={() => {
                logout();
                navigate("/");
              }}
              title="Log out"
            >
              Logout <Power />
            </Button>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default Navigation;
