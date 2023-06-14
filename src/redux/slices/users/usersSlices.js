import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//login action
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      //making http call
      const { data } = await axios.post(
        `${baseURL}/users/login`,
        payload,
        config
      );

      //save user into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//logout action
export const logoutUserAction = createAsyncThunk(
  "user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //remove user from local storage
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//register action
export const registerUserAction = createAsyncThunk(
  "user/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      //making http call
      const { data } = await axios.post(
        `${baseURL}/users/register`,
        payload,
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

//fetching profile
export const userProfileAction = createAsyncThunk(
  "user/profile",
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
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetching profile dashboard
export const userProfileDashboardAction = createAsyncThunk(
  "user/dashboard",
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
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//update profile
export const updateUserProfileAction = createAsyncThunk(
  "user/update",
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
        `${baseURL}/users/update`,
        {
          firstname: payload?.firstname,
          lastname: payload?.lastname,
          email: payload?.email,
        },
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

//slices

//get user from local storage and store it in our redux store
const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : undefined;

const userSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: (builder) => {
    //login
    //handle pending state
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppError = undefined;
      state.userServerError = undefined;
    });

    //handle success state
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.userLoading = false;
      state.userAppError = undefined;
      state.userServerError = undefined;
    });

    //handle rejected state
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppError = action?.payload?.msg;
      state.userServerError = action?.error?.msg;
    });

    //register
    //handle pending state
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.userLoading = true;
      state.userAppError = undefined;
      state.userServerError = undefined;
    });

    //handle success state
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.isRegistered = true;
      state.userLoading = false;
      state.userAppError = undefined;
      state.userServerError = undefined;
    });

    //handle rejected state
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.userLoading = false;
      state.userAppError = action?.payload?.msg;
      state.userServerError = action?.error?.msg;
    });

    //fetching profile
    //handle pending state
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    //handle success state
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    //handle rejected state
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.msg;
      state.serverError = action?.error?.msg;
    });

    //fetching profile dashboard
    //handle pending state
    builder.addCase(userProfileDashboardAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    //handle success state
    builder.addCase(userProfileDashboardAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    //handle rejected state
    builder.addCase(userProfileDashboardAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.msg;
      state.serverError = action?.error?.msg;
    });

    //update profile
    //handle pending state
    builder.addCase(updateUserProfileAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });

    //handle success state
    builder.addCase(updateUserProfileAction.fulfilled, (state, action) => {
      state.userUpdate = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });

    //handle rejected state
    builder.addCase(updateUserProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.msg;
      state.serverError = action?.error?.msg;
    });

    //logout
    //handle success state
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.userLoading = false;
    });
  },
});

export default userSlices.reducer;
