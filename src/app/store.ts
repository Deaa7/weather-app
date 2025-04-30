import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "../features/slice";
export const store = configureStore({
  reducer: {
    state: stateReducer,
  },
});
