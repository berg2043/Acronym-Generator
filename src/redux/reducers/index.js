import { combineReducers } from "redux";
import acronyms from "./acronyms";
import username from "./username";
import favorites from "./favorites"

export default combineReducers({
  acronyms,
  username,
  favorites,
})