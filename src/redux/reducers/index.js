import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tontineReducer from "./tontineReducer";

const allReducers = combineReducers({
  auth: authReducer,
  tontines: tontineReducer,
});

export default allReducers;
