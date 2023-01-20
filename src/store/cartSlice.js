import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
  amount: 1,
  flag: false,
  total: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartButton: (state, action) => {
      const id = action.payload.id;
      state.flag = false;

      const newData = state.cartData.map((item) => {
        if (item.id === id) {
          state.flag = true;
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });

      if (state.flag === true) {
        state.cartData = newData;
      } else {
        state.cartData = [
          ...state.cartData,
          { amount: state.amount, ...action.payload },
        ];
      }
    },

    deleteIdButton: (state, action) => {
      state.cartData = state.cartData.filter((item) => {
        return item.id !== action.payload;
      });
    },

    decrementAmount: (state, action) => {
      const id = action.payload.id;
      state.cartData = state.cartData.map((item) => {
        if (item.amount > 1) {
          if (item.id === id) {
            return { ...item, amount: item.amount - 1 };
          }
        }
        return item;
      });
    },

    incrementAmount: (state, action) => {
      const id = action.payload.id;
      state.cartData = state.cartData.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
    },

    totalPrice: (state) => {
      state.total = state.cartData.reduce((total, curr) => {
        total = total + curr.amount * curr.price;
        return total;
      }, 0);
    },

    totalAmountCart: (state) => {
      state.totalAmount = state.cartData.reduce((total, curr) => {
        // console.log(curr);
        total = total + curr.amount;
        return total;
      }, 0);
    },

    deleteCartData: (state) => {
      state.cartData = [];
    },
  },
});

export const {
  addToCartButton,
  deleteIdButton,
  decrementAmount,
  incrementAmount,
  totalPrice,
  totalAmountCart,
  deleteCartData,
} = cartSlice.actions;
export default cartSlice.reducer;
