import React from "react";
import { Tab } from "react-bootstrap";

const DynamicTabs = ({ title, eventKey, children }) => {
  return (
    <Tab title={title} eventKey={eventKey}>
      {children}
    </Tab>
  );
};

export default DynamicTabs;
