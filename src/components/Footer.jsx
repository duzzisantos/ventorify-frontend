import React from "react";

const Footer = () => {
  return (
    <footer
      id="footer-element"
      className={`col-12 shadow-sm footer-font d-flex flex-row flex-wrap gap-3 py-3 justify-content-center text-secondary`}
    >
      <span>Designed by Duzie Uche-Abba. </span>
      <span>All rights reserved {new Date(Date.now()).getFullYear()}</span>
    </footer>
  );
};

export default Footer;
