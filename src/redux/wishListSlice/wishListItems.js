import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    showWishlist: false,
    wishlistItem: [],
  },
  reducers: {
    setShowWishlist(state) {
      state.showWishlist = !state.showWishlist;
    },
    setWishlistItem(state, action) {
      const itemExists = state.wishlistItem.find(
        (item) => item.id === action.payload.id
      );
      if (!itemExists) {
        state.wishlistItem.push(action.payload);
      }
    },
    removeWishlistItem(state, action) {
      state.wishlistItem = state.wishlistItem.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { setShowWishlist, setWishlistItem, removeWishlistItem } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
