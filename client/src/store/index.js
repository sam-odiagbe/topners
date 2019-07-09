import { combineReducers } from "redux";
import inputReducer from "./reducers/inputReducer";
import validationReducer from "./reducers/validationReducer";
import errorReducer from "./reducers/errorReducer";
import authReducer from "./reducers/authReducer";
import componentReducer from "./reducers/componentsReducer";

const rootReducer = combineReducers({
  input: inputReducer,
  validation: validationReducer,
  error: errorReducer,
  auth: authReducer,
  components: componentReducer
});

export default rootReducer;
