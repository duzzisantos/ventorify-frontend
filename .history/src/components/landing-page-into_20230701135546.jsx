import React from "react";
import { Button } from "react-bootstrap";
const LandingPageIntro = () => {
  return (
    <div className="col-9 d-flex flex-row">
      <div className="d-flex flex-column">
        {[1, 2, 3, 4].map((element) => (
          <Button key={element}>{element}</Button>
        ))}
      </div>
      <div className="col-1 rounded-4 bg-success"></div>
      <div className="d-block  flex-column">
        {[1, 2, 3, 4].map((element) => (
          <Button key={element}>{element}</Button>
        ))}
      </div>
    </div>
  );
};

export default LandingPageIntro;
