import React, { useState } from 'react';
import "./WhiteLabelFAQDropdown.scss"
import { WhiteLabelFAQdata } from "../WhiteLabelFAQ/data"

const Dropdown = () => {
  const [openStates, setOpenStates] = useState<boolean[]>(
    Array(WhiteLabelFAQdata.length).fill(false)
  );

  const handleClick = (index: number) => {
    const updatedStates = [...openStates];
    updatedStates[index] = !updatedStates[index];
    setOpenStates(updatedStates);
  };

  return (
    <div className="faq-dropdown">
      {WhiteLabelFAQdata.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <div
            className={`faq-title ${openStates[index] ? 'open' : 'closed'}`}
            onClick={() => handleClick(index)}
          >
            {item.title}
          </div>

          <div className={`faq-description ${openStates[index] && 'open'}`}>
            {item.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;