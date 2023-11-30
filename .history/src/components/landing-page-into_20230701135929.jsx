import React from "react";
import { Button } from "react-bootstrap";
const LandingPageIntro = () => {
  return (
    <div className="col-9 d-flex flex-row" style={{ height: "400px" }}>
      <div className="d-flex flex-column">
        {[1, 2, 3, 4].map((element) => (
          <div className="col-3" key={element}>
            {element}
          </div>
        ))}
      </div>
      <div className="px-2 rounded-4 bg-secondary"></div>
      <div className="d-flex flex-column">
        {[1, 2, 3, 4].map((element) => (
          <Button key={element}>{element}</Button>
        ))}
      </div>
    </div>
  );
};

export default LandingPageIntro;
