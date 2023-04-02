import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import verifyService from "./verifyService";
const initialState = {
  verficiationError: false,
  verficiationSuccess: false,
  verificationLoading: false,
  message: "",
};
export const verifyEmail = createAsyncThunk(
  "auth/verify",
  async (userData, thunkAPI) => {
    try {
      return await verifyService.verifyEmail(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message | error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = "";
      state.verficiationError = false;
      state.verificationLoading = false;
      state.verficiationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.verificationLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.verficiationSuccess = true;
        state.verficiationError = false;
        state.verificationLoading = false;
        state.message = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verficiationError = true;
        state.verificationLoading = false;
        state.verficiationSuccess = false;
        state.message = action.payload;
      });
  },
});
export const { reset } = verifySlice.actions;
export default verifySlice.reducer;
