import React from "react";
import { Tabs } from "react-bootstrap";

const DynamicTabs = ({ title, eventKey, children }) => {
  return (
    <Tab title={title} eventKey={eventKey}>
      {children}
    </Tab>
  );
};

export default DynamicTabs;
