import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Activity,
  EnvelopeCheckFill,
  PeopleFill,
  PersonFill,
  Book,
  BellFill,
} from "react-bootstrap-icons";
import axios from "axios";

const SideBar = ({ className, id, ref }) => {
  const [count, setCount] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/messages");
      setCount(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={className} id={id} ref={ref}>
        <div className="mx-3 my-4 lh-lg">
          <NavLink
            to={"/profile"}
            className="text-decoration-none text-secondary d-flex flex-column text-center"
          >
            <PersonFill className="mx-auto" /> Profile
          </NavLink>
        </div>
        <div className="mx-3 my-4 lh-lg">
          <NavLink
            to={"/operations"}
            className="text-decoration-none text-secondary d-flex flex-column text-center"
          >
            <Activity className="mx-auto" /> Operations
          </NavLink>
        </div>

        <div className="mx-3 my-4 lh-lg">
          <NavLink
            to={"/employee-performance"}
            className="text-decoration-none text-secondary d-flex flex-column text-center"
          >
            <PeopleFill className="mx-3 my-4 lh-lg" /> Employees
          </NavLink>
        </div>

        <div className="mx-3 my-4 lh-lg">
          <NavLink
            to={"/messages"}
            className="text-decoration-none text-secondary d-flex flex-column text-center"
          >
            <EnvelopeCheckFill className="mx-auto" /> Send
          </NavLink>
        </div>
        <div className="mx-3 my-4 lh-lg">
          <NavLink
            to={"/message-notification"}
            className="text-decoration-none text-secondary d-flex flex-column text-center"
          >
            <div>
              <BellFill className="mx-auto" />
              <sup
                className="bg-danger px-1 rounded-5 text-light"
                style={{ height: "20px", width: "20px", marginLeft: "-5%" }}
              >
                {count.length}
              </sup>
            </div>
            Outbox
          </NavLink>
        </div>
        <div className="mx-3 my-4 lh-lg">
          <NavLink
            to={"/team"}
            className="text-decoration-none text-secondary d-flex flex-column text-center"
          >
            <PeopleFill className="mx-auto" /> Team
          </NavLink>
        </div>
        <div className="mx-3 my-4 lh-lg">
          <NavLink
            to={"/"}
            className="text-decoration-none text-secondary d-flex flex-column text-center"
          >
            <Book className="mx-auto" /> Docs
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SideBar;
