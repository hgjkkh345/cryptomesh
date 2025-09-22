import React from "react"
import Dropdown from "../WhiteLabelFAQDropdown/WhiteLabelFAQDropdown"
import "./WhiteLabelFAQ.scss"



export const WhiteLabelFAQ = () => {
  return (
    <div className="white-label-faq">
      <h1 className="white-label-faq-title">Frequently Asked Questions</h1>
      <Dropdown />
    </div>
  );
};


