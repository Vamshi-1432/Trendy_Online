import { createSlice } from "@reduxjs/toolkit";

export const DarkThemeSlice = createSlice({
  name: "dark",
  initialState: {
    darkTheme: false,
  },
  reducers: {
    setDarkTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { setDarkTheme } = DarkThemeSlice.actions;
export default DarkThemeSlice.reducer;
