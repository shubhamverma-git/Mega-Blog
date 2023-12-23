import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // step 1: creating initial state
  status: false,
  userData: null,
};

const authSlice = createSlice({
  // step 2: creating slice
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
