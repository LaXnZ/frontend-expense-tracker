import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//action for redirect
export const resetIncomeCreated = createAction("income/created/reset");
export const resetIncomeUpdated = createAction("income/updated/reset");

//add incomes action
export const createIncomeAction = createAsyncThunk(
  "income/create",
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
      const { data } = await axios.post(`${baseURL}/income`, payload, config);

      //dispatch action to reset incomeCreated
      dispatch(resetIncomeCreated());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all incomes action
export const fetchAllIncomeAction = createAsyncThunk(
  "income/fetch",
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
      const { data } = await axios.get(
        `${baseURL}/income?page=${payload}`,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update income action
export const updateIncomeAction = createAsyncThunk(
  "income/update",
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
      const { data } = await axios.put(
        `${baseURL}/income/${payload?.id}`,
        payload,
        config
      );

      //dispatch action to reset incomeUpdated
      dispatch(resetIncomeUpdated());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//delete income action
export const deleteIncomeAction = createAsyncThunk(
  "income/delete",
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
      const { data } = await axios.delete(
        `${baseURL}/income/${payload?.id}`,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//income slices
const incomesSlices = createSlice({
  name: "incomes",
  initialState: {},
  extraReducers: (builder) => {
    //create income
    builder.addCase(createIncomeAction.pending, (state, action) => {
      state.loading = true;
    });

    //reset action
    builder.addCase(resetIncomeCreated, (state, action) => {
      state.isIncomeCreated = true;
    });

    builder.addCase(createIncomeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.incomeCreated = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
      state.isIncomeCreated = false;
    });
    builder.addCase(createIncomeAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.msg;
      state.serverError = action?.error?.msg;
    });

    //fetch all incomes
    builder.addCase(fetchAllIncomeAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllIncomeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.incomesList = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllIncomeAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.msg;
      state.serverError = action?.error?.msg;
    });

    //update income
    builder.addCase(updateIncomeAction.pending, (state, action) => {
      state.loading = true;
    });

    //reset action
    builder.addCase(resetIncomeUpdated, (state, action) => {
      state.isIncomeUpdated = true;
    });

    builder.addCase(updateIncomeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.incomeUpdated = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateIncomeAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.msg;
      state.serverError = action?.error?.msg;
    });

    //delete income
    builder.addCase(deleteIncomeAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteIncomeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.incomeDeleted = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteIncomeAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.msg;
      state.serverError = action?.error?.msg;
    });
  },
});

export default incomesSlices.reducer;
