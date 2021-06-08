import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    fetchProducts: (products, action) => {
      for (let item of action.payload) products.push(item);
    },
  },
});

export const { fetchProducts } = slice.actions;
export default slice.reducer;

export const getProducts = () =>
  createSelector(
    (state) => state.entities.products,
    (products) => products
  );
