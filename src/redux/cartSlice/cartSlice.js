import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    showCart: false,
  },
  reducers: {
    setAddCartItems(state, action) {
      const {
        id,
        name,
        description,
        author,
        price,
        originalPrice,
        discount,
        image,
        alt,
        quantity,
      } = action.payload;
      const indexProductId = state.items.findIndex((item) => item.id === id);
      if (indexProductId >= 0) {
        state.items[indexProductId].quantity += quantity;
      } else {
        state.items.push({
          id,
          name,
          description,
          author,
          price,
          originalPrice,
          discount,
          image,
          alt,
          quantity,
        });
      }
    },
    changeQuantity(state, action) {
      const { id, quantity } = action.payload;
      const indexProductId = state.items.findIndex((item) => item.id === id);
      if (indexProductId >= 0) {
        if (quantity > 0) {
          state.items[indexProductId].quantity = quantity;
        } else {
          state.items.splice(indexProductId, 1); // Remove item if quantity is 0
        }
      }
    },
    removeCartItem(state, action) {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const { setAddCartItems, changeQuantity, removeCartItem, setShowCart } =
  cartSlice.actions;
export default cartSlice.reducer;
