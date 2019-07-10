import React from "react";

const Question = ({ question }) => {
  let options_ = question.options.map(value => {
    return (
      <label className="tp-radio-container">
        {value}
        <input type="radio" name="answer" />
        <span class="tp-checkmark" />
      </label>
    );
  });
  return (
    <React.Fragment>
      <h3 className="tp-question-head">{question.question}</h3>
      <form>
        <div>{options_}</div>
      </form>
    </React.Fragment>
  );
};

export default Question;
