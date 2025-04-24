import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userStatus: false,
  userData: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.userStatus = true;
      state.userData = action.payload.userData;
    },
    signOut: (state) => {
      state.userStatus = false;
      state.userData = null;
    },
  },
});

export const { signIn, signOut } = authReducer.actions;
export default authReducer.reducer;
