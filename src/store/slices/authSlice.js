import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "auth";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-auth";
      state.user = {};
      state.errorMessage = payload;
    },
    onClearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, onClearErrorMessage } =
  authSlice.actions;
