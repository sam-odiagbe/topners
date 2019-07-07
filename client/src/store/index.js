import { combineReducers } from "redux";
import inputReducer from "./reducers/inputReducer";
import validationReducer from "./reducers/validationReducer";
import errorReducer from "./reducers/errorReducer";

const rootReducer = combineReducers({
  input: inputReducer,
  validation: validationReducer,
  error: errorReducer
});

export default rootReducer;
