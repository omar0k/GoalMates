import { configureStore } from "@reduxjs/toolkit";
import authRedcuer from "../features/auth/authSlice";
import goalReducer from "../features/goals/goalSlice";
export const store = configureStore({
  reducer: {
    auth: authRedcuer,
    goals: goalReducer,
  },
});
