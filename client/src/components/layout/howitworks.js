import React from "react";

const Howitworks = () => {
  return (
    <div className="tp-how-it-works">
      <div className="tp-step">
        <h4>Step 1</h4>
        <h5>Deposit into your accout</h5>
        <p>
          The very first step is to pay money into your account, account with
          amount less than 100 would be blocked out of joining games, be rest
          assured that paying with us is very safe and secure
        </p>
      </div>

      <div className="tp-step">
        <h4>Step 2</h4>
        <h5>Sign up for game</h5>
        <p>
          After depositing into your account, the next step is to sign up for a
          game, then wait to recieve questions for answering
        </p>
      </div>

      <div className="tp-step">
        <h4>Step 3</h4>
        <h5>Got question?, be smart and fast</h5>
        <p>
          Questions are posted every{" "}
          <b>
            Sunday, at 7:30pm, dont just get them right, you need to be fast and
            fall among the top people, because only the <b>Topners</b> win
          </b>
        </p>
      </div>

      <div className="tp-step">
        <h4>Step 4</h4>
        <h5>I won , time to get paid</h5>
        <p>
          The best part, payments are made during the following week after
          previous game, please note that payments are made into the provided
          account number
        </p>
      </div>

      <div className="tp-step">
        <h4 style={{ color: "red" }}>Note</h4>
        <p>
          Questions are removed 10 minutes after they have been posted, in other
          words you have the first ten minutes after the question has been
          posted to answer them
        </p>
      </div>
    </div>
  );
};

export default Howitworks;
