import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { fakeData as data } from "../components/fakeData";
import LandingPageTemplate from "../components/landing-page-card";
import { ToastContainer, toast } from "react-toastify";
import LandingPageIntro from "../components/landing-page-intro";

const LandingPage = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );

      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <div className="container col-md-10 text-secondary pt-5 pb-5">
      <h1 className="fw-bold">Welcome to Ventorify</h1>
      <div className="rows cols flex-wrap hstack gap-5 align-items-center justify-content-center p-4 pb-5">
        <LandingPageIntro />
        {data.map((item) => {
          const { title, description, id, image } = item;
          return (
            <LandingPageTemplate
              key={id}
              header={title}
              mainContent={description}
              image={image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
