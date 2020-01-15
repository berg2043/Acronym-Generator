import { combineReducers } from "redux";
import acronyms from "./acronyms";
import username from "./username";

export default combineReducers({
  acronyms,
  username,
})