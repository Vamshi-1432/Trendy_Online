import { configureStore } from "@reduxjs/toolkit";
import DarkReducer from "./DarkThemeSlice";
import LoginReducer from "./loginSlice";
import cartReducer from "./cartSlice/cartSlice";
import buyReducer from "./cartSlice/buyProductSlice";
import addressReducer from "./cartSlice/addressSlice";
import wishlistReducer from "./wishListSlice/wishListItems";
import searchReducer from "./searchSlice";
import itemMenuReducer from "./item-menu-slice/itemMenuSlice";

export const ReduxStore = configureStore({
  reducer: {
    dark: DarkReducer,
    login: LoginReducer,
    cart: cartReducer,
    buy: buyReducer,
    address: addressReducer,
    wishlist: wishlistReducer,
    search: searchReducer,
    items: itemMenuReducer,
  },
});
