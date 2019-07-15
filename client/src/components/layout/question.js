import React from "react";

const Question = ({ question, submitAnswer, blockedout }) => {
  let options_ = question.option.map((value, ind) => {
    return (
      <label className="tp-radio-container" key={ind}>
        {value}
        <input
          type="radio"
          name="answer"
          onChange={submitAnswer}
          value={value}
        />
        <span className="tp-checkmark" />
      </label>
    );
  });
  return (
    <div className="tp-question">
      <h3 className="tp-question-head">{question.question}</h3>
      {!blockedout ? (
        <form>
          <div>{options_}</div>
        </form>
      ) : (
        <h2 style={{ color: "red" }}>Blocked out</h2>
      )}
    </div>
  );
};

export default Question;
