import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookie } from "react-cookie";
import { fakeData as data } from "../components/fakeData";
import LandingPageTemplate from "../components/landing-page-card";
import { ToastContainer, toast } from "react-toastify";
import LandingPageIntro from "../components/landing-page-intro";

const LandingPage = () => {
  const navigate = useNavigate();
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
