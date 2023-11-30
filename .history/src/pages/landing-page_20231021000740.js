import React from "react";
import LandingPageTemplate from "../components/landing-page-card";
import { fakeData as data } from "../components/fakeData";
import LandingPageIntro from "../components/landing-page-intro";

const LandingPage = () => {
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
