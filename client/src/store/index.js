import { combineReducers } from "redux";
import inputReducer from "./reducers/inputReducer";
import validationReducer from "./reducers/validationReducer";

const rootReducer = combineReducers({
  input: inputReducer,
  validation: validationReducer
});

export default rootReducer;
