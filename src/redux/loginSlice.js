import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    enableLogin: false,
    validLoginUser: false,
  },
  reducers: {
    setEnableLogin: (state) => {
      state.enableLogin = !state.enableLogin;
    },
    setValidLoginUser: (state) => {
      state.validLoginUser = !state.validLoginUser;
    },
  },
});

export const { setEnableLogin, setValidLoginUser } = loginSlice.actions;
export default loginSlice.reducer;
