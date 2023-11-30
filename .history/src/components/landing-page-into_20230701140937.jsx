import React from "react";
const LandingPageIntro = () => {
  return (
    <div className="col-9 d-flex flex-row" style={{ height: "400px" }}>
      <div className="d-flex flex-column mt-2">
        {[1, 2, 3, 4].map((element) => (
          <div className="p-4 border" key={element} style={{ width: "350px" }}>
            {element}
          </div>
        ))}
      </div>
      <div className="px-2 rounded-4 bg-secondary"></div>
      <div className="d-flex flex-column mt-5">
        {[1, 2, 3, 4].map((element) => (
          <div className="p-4 border" key={element} style={{ width: "350px" }}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPageIntro;
