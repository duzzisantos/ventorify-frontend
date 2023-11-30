import React from "react";
const LandingPageIntro = () => {
  const infoSet1 = [
    "Efficient inventory management",
    "Synced with Accounting",
    "Track performance",
    "Manage purchases",
  ];
  return (
    <div
      className="col-12 justify-content-center d-flex flex-row"
      style={{ height: "400px" }}
    >
      <div className="d-flex flex-column mt-2">
        {infoSet1.map((element) => (
          <div className="p-4 border" key={element} style={{ width: "350px" }}>
            {element}
          </div>
        ))}
      </div>
      <div className="px-2 rounded-4 bg-success"></div>
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
