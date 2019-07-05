import React, { Component } from "react";
import "./userstyle.css";

class Dashboard extends Component {
  constructor() {
    super();

    //
  }
  render() {
    let number = 5000;
    return (
      <div className="tp-main-container">
        <div className="tp-user-header">
          <h4>hi, sammyodiagbe</h4>
          <div>
            <h4>&#8358;{number.toFixed(1)}</h4>
            <button className="tp-top-up-account">Deposit</button>
          </div>
        </div>
        <div className="tp-question-container">
          <p className="tp-form-note">
            ! When you are signed up for a game, and question is available for
            answering , it will appear here
          </p>
        </div>
        <div className="tp-card-container">
          <div className="tp-card">
            <div className="tp-card-top">
              <h1>Bronze</h1>
            </div>
            <div className="tp-card-bottom">
              <div className="tp-entrance-fee">
                <h4>Entrance fee</h4>
                <h4>&#8358;100</h4>
              </div>
              <div className="tp-possible-win">
                <h4>Win</h4>
                <h4>upto 100k</h4>
              </div>
              <div className="tp-enter-context">
                <button className="tp-enter-context-btn">Enter bronze</button>
              </div>
            </div>
          </div>

          <div className="tp-card">
            <div className="tp-card-top tp-midy">
              <h1>Silver</h1>
            </div>
            <div className="tp-card-bottom">
              <div className="tp-entrance-fee">
                <h4>Entrance fee</h4>
                <h4>&#8358;100</h4>
              </div>

              <div className="tp-possible-win">
                <h4>Prize</h4>
                <h4>upto 150k</h4>
              </div>
              <div className="tp-enter-context">
                <button className="tp-enter-context-btn">Enter silver</button>
              </div>
            </div>
          </div>

          <div className="tp-card">
            <div className="tp-card-top tp-maxi">
              <h1>Gold</h1>
            </div>
            <div className="tp-card-bottom">
              <div className="tp-entrance-fee">
                <h4>Entrance fee</h4>
                <h4>&#8358;500</h4>
              </div>
              <div className="tp-possible-win">
                <h4>Win</h4>
                <h4>upto 250k</h4>
              </div>
              <div className="tp-enter-context">
                <button className="tp-enter-context-btn">Enter Gold</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
