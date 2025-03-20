import { createSlice } from "@reduxjs/toolkit";

const itemMenuSlice = createSlice({
  name: "itemMenu",
  initialState: {
    selectedItem: [],
  },
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { setSelectedItem } = itemMenuSlice.actions;
export default itemMenuSlice.reducer;
