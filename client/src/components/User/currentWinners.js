import React from "react";

const CurrentWinners = ({ currentWinners, possibleWinners }) => {
  return (
    <div className="tp-current-winners-container">
      <div className="tp-current-winners-num">
        <h1>{currentWinners.length}</h1>
      </div>
      <h4>of {possibleWinners} winner(s)</h4>
    </div>
  );
};

export default CurrentWinners;
