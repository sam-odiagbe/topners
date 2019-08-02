import React from "react";

const Banks = ({ bankNames, userBank, _handleInputChange }) => {
  const render = bankNames
    ? bankNames.sort().map((bank, ind) => {
        return <option key={ind}>{bank}</option>;
      })
    : "";
  return (
    <select id="bank" value={userBank} onChange={_handleInputChange}>
      <option disabled>Select your bank</option>
      {render}
    </select>
  );
};

export default Banks;
