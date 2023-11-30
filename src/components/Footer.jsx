import React from "react";

const Footer = ({ ref, className }) => {
  return (
    <footer ref={ref} className={className}>
      <div className="p-2 hstack gap-5">
        <a href="https://google.com" target="_blank" rel="noreferrer noopener">
          Partners
        </a>
        <a href="https://google.com" target="_blank" rel="noreferrer noopener">
          Legal
        </a>
        <a href="https://google.com" target="_blank" rel="noreferrer noopener">
          Terms of use
        </a>
        <span>Designed by Duzie Uche-Abba. </span>
        <span>All rights reserved {new Date(Date.now()).getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
