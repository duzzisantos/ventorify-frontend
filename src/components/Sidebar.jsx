import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { http } from "../api-calls/http";
import {
  Activity,
  EnvelopeCheckFill,
  PeopleFill,
  PersonFill,
  BellFill,
  Basket2Fill,
  List,
} from "react-bootstrap-icons";
import axios from "axios";

const SideBar = ({ showSideBar, setShowSidebar, accessToken }) => {
  const [count, setCount] = useState([]);

  const { isLocal, isProduction, localhost, webhost } = http;
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          isLocal
            ? `${localhost}/api/messages`
            : isProduction && `${webhost}/api/messages`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        setCount(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, [isLocal, isProduction, localhost, webhost, accessToken]);

  return (
    <div className="position-absolute mt-5 py-2 col-1">
      <div>
        <Button
          variant="transparent"
          className="border border-secondary"
          onClick={() => setShowSidebar(true)}
        >
          <List /> Menu
        </Button>
      </div>

      {showSideBar && (
        <Offcanvas
          show={showSideBar}
          onHide={() => setShowSidebar(false)}
          style={{ width: "200px" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Side menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="mx-3 lh-lg">
              <NavLink
                to={"/operations"}
                className="text-decoration-none text-secondary"
              >
                <Activity className="mx-auto" /> Operations
              </NavLink>
            </div>
            <div className="mx-3 my-4 lh-lg">
              <NavLink
                to={"/orders"}
                className="text-decoration-none text-secondary"
              >
                <Basket2Fill className="mx-auto" /> Orders
              </NavLink>
            </div>
            <div className="mx-3 my-4 lh-lg">
              <NavLink
                to={"/employee-performance"}
                className="text-decoration-none text-secondary"
              >
                <PeopleFill className="mx-auto" /> Performance
              </NavLink>
            </div>

            <div className="mx-3 my-4 lh-lg">
              <NavLink
                to={"/messages"}
                className="text-decoration-none text-secondary"
              >
                <EnvelopeCheckFill className="mx-auto" /> Send
              </NavLink>
            </div>
            <div className="mx-3 my-4 lh-lg">
              <NavLink
                to={"/message-notification"}
                className="text-decoration-none text-secondary"
              >
                <div>
                  <BellFill className="mx-auto" />
                  <sup
                    className="bg-danger px-1 rounded-5 text-light"
                    style={{
                      height: "20px",
                      width: "20px",
                      marginLeft: "-5%",
                    }}
                  >
                    {count.length}
                  </sup>{" "}
                  Outbox
                </div>
              </NavLink>
            </div>
            <div className="mx-3 my-4 lh-lg">
              <NavLink
                to={"/team"}
                className="text-decoration-none text-secondary flex-column text-center hide-name"
              >
                <PeopleFill className="mx-auto" /> Team
              </NavLink>
            </div>
            <div className="mx-3 my-4 lh-lg">
              <NavLink
                to={"/profile"}
                className="text-decoration-none text-secondary flex-column text-center hide-name"
              >
                <PersonFill className="mx-auto" /> Profile
              </NavLink>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </div>
  );
};

export default SideBar;
