import { configureStore } from "@reduxjs/toolkit";
import authRedcuer from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    auth: authRedcuer,
  },
});
