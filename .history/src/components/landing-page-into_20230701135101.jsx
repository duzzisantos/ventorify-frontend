import React from "react";
import { Button } from "react-bootstrap";
const LandingPageIntro = () => {
  return (
    <div className="col-9 d-flex flex-row" style={{ height: "300px" }}>
      <div className="d-block">
        {[1, 2, 3, 4].map((element) => (
          <Button key={element}>{element}</Button>
        ))}
      </div>
      <div className="col-1 rounded-4 bg-success"></div>
      <div className="d-block">
        {[1, 2, 3, 4].map((element) => (
          <Button key={element}>{element}</Button>
        ))}
      </div>
    </div>
  );
};

export default LandingPageIntro;
