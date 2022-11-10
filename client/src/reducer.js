import { combineReducers } from "redux";
import chatReducer from "./chatSlice";

export default combineReducers({
  chat: chatReducer,
});