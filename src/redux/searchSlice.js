import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchItems: [],
    searchResults: [],
    showResults: false,
  },
  reducers: {
    setSearchItem(state, action) {
      state.searchItems = action.payload;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    setShowResults(state, action) {
      state.showResults = action.payload;
    },
  },
});

export const { setSearchItem, setSearchResults, setShowResults } =
  searchSlice.actions;
export default searchSlice.reducer;
