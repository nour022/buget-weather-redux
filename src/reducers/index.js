import { combineReducers } from "@reduxjs/toolkit";
import weatherReducers from "./weatherReducers.js";
import budgetReducers from "./budgetReducers.js";
import languageReducers from "./languageReducers.js";

export default combineReducers({
  weather: weatherReducers,
  budget: budgetReducers,
  language: languageReducers,
});
