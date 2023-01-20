import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  apiData: [],
  status: "Idle",
  cloneApiData: [],
  flag: false,
};

const apiSlice = createSlice({
  name: "api",
  initialState: initialState,
  reducers: {
    searchButton: (state, action) => {
      const dd = action.payload;
      const newFilterData = state.apiData.filter((item) => {
        return item.category === dd;
      });
      state.apiData = newFilterData;
    },

    allButton: (state) => {
      state.cloneApiData = state.apiData;
    },

    getFiltereeData: (state, action) => {
      const dd = action.payload;
      state.apiData = state.cloneApiData.filter((item) => {
        return item.category === dd;
      });
    },

    flagChangeButton: (state, action) => {
      state.apiData = state.apiData.map((item) => {
        if (item.id === action.payload.id) {
          console.log(item.heartFlag);
          return { ...item, heartFlag: !item.heartFlag };
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiThunk.pending, (state) => {
        state.status = "Pending";
      })
      .addCase(apiThunk.fulfilled, (state, action) => {
        state.status = "Success";

        const dd = action.payload;
        const modified = dd.map((item) => {
          return { ...item, heartFlag: state.flag };
        });

        state.apiData = modified;
        state.cloneApiData = action.payload;
      })
      .addCase(apiThunk.rejected, (state) => {
        state.status = "Rejected";
      });
  },
});

export const apiThunk = createAsyncThunk("apiCall", async (state) => {
  const data = await axios
    .get("https://fakestoreapi.com/products")
    .then((resp) => resp.data)
    .catch((error) => console.log(error.message));
  return data;
});

export const { searchButton, allButton, getFiltereeData, flagChangeButton } =
  apiSlice.actions;
export default apiSlice.reducer;
