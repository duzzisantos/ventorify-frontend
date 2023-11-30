import React from "react";
import { Button } from "react-bootstrap";
const LandingPageIntro = () => {
  return (
    <div className="col-9 d-flex flex-row">
      <div className="d-block">
        {[1, 2, 3, 4].map((element) => (
          <Button key={element}>{element}</Button>
        ))}
      </div>
      <div className="col-1 rounded-4"></div>
      <div className="d-block"></div>
    </div>
  );
};

export default LandingPageIntro;
