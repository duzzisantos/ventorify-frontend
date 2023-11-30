import React from "react";

const Footer = () => {
  return (
    <footer className="w-100 bg-light shadow-sm footer-font d-flex flex-row flex-wrap gap-3 py-3 justify-content-end">
      <div className="p-2 hstack gap-4">
        <a href="https://google.com">Accounting App</a>
        <a href="https://google.com">CRM App</a>
        <a href="https://google.com">Sales</a>
      </div>
      <div className="p-2 hstack gap-5">
        <a href="https://google.com">Partners</a>
        <a href="https://google.com">Legal</a>
        <a href="https://google.com">Terms of use</a>
        <span>Designed by Duzie Uche-Abba. </span>
        <span>All rights reserved {new Date(Date.now()).getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
