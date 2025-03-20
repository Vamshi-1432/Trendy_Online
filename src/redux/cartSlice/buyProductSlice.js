import { createSlice } from "@reduxjs/toolkit";

const buyProductSlice = createSlice({
  name: "buy",
  initialState: {
    enableBuy: false,
    shippingDetails: [],
    enableProceedPayment: false,
    paymentDetails: [],
    paymentMode: "",
  },
  reducers: {
    setEnableBuy(state) {
      state.enableBuy = !state.enableBuy;
    },
    setShippingDetails(state, action) {
      state.shippingDetails = action.payload;
    },
    setEnableProceedPayment(state) {
      state.enableProceedPayment = !state.enableProceedPayment;
    },
    setPaymentDetails(state, action) {
      state.paymentDetails = action.payload;
    },
    setPaymentMode(state, action) {
      state.paymentMode = action.payload;
    },
  },
});

export const {
  setEnableBuy,
  setShippingDetails,
  setEnableProceedPayment,
  setPaymentDetails,
  setPaymentMode,
} = buyProductSlice.actions;
export default buyProductSlice.reducer;
