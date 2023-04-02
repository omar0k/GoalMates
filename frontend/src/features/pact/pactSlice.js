import pactService from "./pactService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  pact: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const addToPact = createAsyncThunk(
  "pact/add",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await pactService.addToPact(userData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const removeFromPact = createAsyncThunk(
  "pact/remove",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPact = createAsyncThunk("pact/getPact", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await pactService.getPact(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const pactSlice = createSlice({
  name: "pact",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToPact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToPact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pact.push(action.payload);
      })
      .addCase(addToPact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(removeFromPact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromPact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload;
      })
      .addCase(removeFromPact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.pact = state.pact.filter(
          (member) => member._id !== action.payload.id
        );
      })
      .addCase(getPact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pact = action.payload;
      })
      .addCase(getPact.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = pactSlice.actions;
export default pactSlice.reducer;
