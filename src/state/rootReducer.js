import { combineReducers } from "@reduxjs/toolkit";
import { api } from "./api/reducer";
import { auth } from "./hooks";

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth,
});
