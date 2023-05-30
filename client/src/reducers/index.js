import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import questionsReducer from "./questions";
import usersReducer from "./users";
import postReducer from "./post";
import sideBar from "./sideBar";
import chatbot from "./chatbot";

export default combineReducers({
  authReducer,
  currentUserReducer,
  questionsReducer,
  usersReducer,
  postReducer,
  sideBar,
  chatbot,
});
