import { configureStore } from "@reduxjs/toolkit";
import authRedcuer from "../features/auth/authSlice";
import goalReducer from "../features/goals/goalSlice";
import verifyReducer from "../features/verify/verifySlice";
export const store = configureStore({
  reducer: {
    auth: authRedcuer,
    goals: goalReducer,
    verify: verifyReducer,
  },
});
