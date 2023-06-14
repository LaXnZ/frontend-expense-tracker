import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//fetch account info action
export const fetchAccountStatsAction = createAsyncThunk(
  "account/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      //making http call
      const { data } = await axios.get(`${baseURL}/account-stats`, config);

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//account stat slices
const accountStatSlices = createSlice({
  name: "account",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccountStatsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAccountStatsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.accountDetails = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAccountStatsAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.msg;
      state.serverError = action?.error?.msg;
    });
  },
});

export default accountStatSlices.reducer;
