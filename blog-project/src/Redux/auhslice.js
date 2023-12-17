import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // these are actions inside a reducer
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logOut: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});
export const {login,logOut}= authSlice.actions;
export default authSlice.reducer;

// cannot have multiple default export