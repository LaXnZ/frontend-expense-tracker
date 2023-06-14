import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//actions for redirect
export const resetExpenseCreated = createAction("expense/created/reset");
export const resetExpenseUpdated = createAction("expense/updated/reset");

//add expenses action
export const createExpenseAction = createAsyncThunk(
  "expense/create",
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
      const { data } = await axios.post(`${baseURL}/expense`, payload, config);

      //dispatch action to reset expenseCreated
      dispatch(resetExpenseCreated());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all expenses action
export const fetchAllExpenseAction = createAsyncThunk(
  "expense/fetch",
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
        `${baseURL}/expense?page=${payload}`,
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

//update expense action
export const updateExpenseAction = createAsyncThunk(
  "expense/update",
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
        `${baseURL}/expense/${payload?.id}`,
        payload,
        config
      );

      //dispatch action to reset expenseUpdated
      dispatch(resetExpenseUpdated());

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//delete expense action
export const deleteExpenseAction = createAsyncThunk(
  "expense/delete",
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
        `${baseURL}/expense/${payload?.id}`,
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

//expense slices
const expensesSlices = createSlice({
  name: "expenses",
  initialState: {},
  extraReducers: (builder) => {
    //create expense
    builder.addCase(createExpenseAction.pending, (state, action) => {
      state.loading = true;
    });

    //reset action
    builder.addCase(resetExpenseCreated, (state, action) => {
      state.isExpenseCreated = true;
    });

    builder.addCase(createExpenseAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseCreated = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
      state.isExpenseCreated = false;
    });
    builder.addCase(createExpenseAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.msg;
      state.serverError = action?.error?.msg;
    });

    //fetch all expenses
    builder.addCase(fetchAllExpenseAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllExpenseAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expensesList = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllExpenseAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.msg;
      state.serverError = action?.error?.msg;
    });

    //update expense
    builder.addCase(updateExpenseAction.pending, (state, action) => {
      state.loading = true;
    });

    //reset action
    builder.addCase(resetExpenseUpdated, (state, action) => {
      state.isExpenseUpdated = true;
    });

    builder.addCase(updateExpenseAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseUpdated = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateExpenseAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.msg;
      state.serverError = action?.error?.msg;
    });

    //delete expense
    builder.addCase(deleteExpenseAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteExpenseAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseDeleted = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteExpenseAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.msg;
      state.serverError = action?.error?.msg;
    });
  },
});

export default expensesSlices.reducer;
