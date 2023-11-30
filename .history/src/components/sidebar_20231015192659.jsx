import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ShoppingBasket from "./shopping-basket";
import {
  Activity,
  EnvelopeCheckFill,
  PeopleFill,
  PersonFill,
  Book,
  BellFill,
  CartFill,
} from "react-bootstrap-icons";
import axios from "axios";

const SideBar = ({ className, id, ref }) => {
  const [count, setCount] = useState([]);
  const [showCart, setShowCart] = useState(false);
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

  const handleShowCart = () => {
    setShowCart(!showCart);
  };

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
            Inbox
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

        <div className="mx-3 my-4 lh-lg">
          <Button
            className="text-secondary d-flex flex-column fs-6 text-center btn btn-sm bg-transparent border-0"
            onClick={handleShowCart}
          >
            <CartFill className="mx-auto" /> Current Order
          </Button>
        </div>
      </div>
      {showCart && <ShoppingBasket />}
    </>
  );
};

export default SideBar;
