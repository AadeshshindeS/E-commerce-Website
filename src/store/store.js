import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    apiStore: apiSlice,
    cartStore: cartSlice,
  },
});

export default store;
