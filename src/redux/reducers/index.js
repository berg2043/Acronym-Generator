import { combineReducers } from "redux";
import acronyms from "./acronyms";
import username from "./username";
import favorites from "./favorites"

// Reducer generator
const createReducer = (string, type=0) => {
  return (state=type, action) => {
    switch(action.type){
      case string: 
        return action.payload;
      default:
        return state;
    }
  }
}

export default combineReducers({
  acronyms,
  username,
  favorites,
  count: createReducer("COUNT"),
})