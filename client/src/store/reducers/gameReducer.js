const initState = {
  question: {
    question: "Who is the president of Nigeria ?",
    options: [
      "Mohammadu Buhari",
      "Jayjay Okocha",
      "Desmond elliot",
      "none of the above"
    ]
  }
};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case "RESET-QUESTION":
      break;
    default:
      break;
  }
  return state;
};

export default gameReducer;
